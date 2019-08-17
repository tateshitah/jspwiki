/*
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
 */
package org.apache.wiki.pages;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.log4j.Logger;
import org.apache.wiki.WikiBackgroundThread;
import org.apache.wiki.WikiEngine;
import org.apache.wiki.WikiPage;
import org.apache.wiki.WikiProvider;
import org.apache.wiki.api.exceptions.NoRequiredPropertyException;
import org.apache.wiki.api.exceptions.ProviderException;
import org.apache.wiki.api.exceptions.WikiException;
import org.apache.wiki.auth.WikiPrincipal;
import org.apache.wiki.auth.WikiSecurityException;
import org.apache.wiki.auth.acl.Acl;
import org.apache.wiki.auth.acl.AclEntry;
import org.apache.wiki.auth.acl.AclEntryImpl;
import org.apache.wiki.auth.user.UserProfile;
import org.apache.wiki.event.WikiEvent;
import org.apache.wiki.event.WikiEventManager;
import org.apache.wiki.event.WikiPageEvent;
import org.apache.wiki.event.WikiSecurityEvent;
import org.apache.wiki.modules.ModuleManager;
import org.apache.wiki.modules.WikiModuleInfo;
import org.apache.wiki.providers.RepositoryModifiedException;
import org.apache.wiki.providers.WikiPageProvider;
import org.apache.wiki.util.ClassUtil;
import org.apache.wiki.util.TextUtil;

import java.io.IOException;
import java.security.Permission;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;


/**
 * Manages the WikiPages.  This class functions as an unified interface towards
 * the page providers.  It handles initialization and management of the providers,
 * and provides utility methods for accessing the contents.
 * <p/>
 * Saving a page is a two-stage Task; first the pre-save operations and then the
 * actual save.  See the descriptions of the tasks for further information.
 *
 * @since 2.0
 */
// FIXME: This class currently only functions just as an extra layer over providers,
//        complicating things.  We need to move more provider-specific functionality
//        from WikiEngine (which is too big now) into this class.
public class DefaultPageManager extends ModuleManager implements PageManager {

    private static final Logger LOG = Logger.getLogger(DefaultPageManager.class);

    private WikiPageProvider m_provider;

    protected ConcurrentHashMap<String, PageLock> m_pageLocks = new ConcurrentHashMap<>();

    private WikiEngine m_engine;

    private int m_expiryTime = 60;

    private LockReaper m_reaper = null;

    private PageSorter pageSorter = new PageSorter();

    /**
     * Creates a new PageManager.
     *
     * @param engine WikiEngine instance
     * @param props  Properties to use for initialization
     * @throws WikiException If anything goes wrong, you get this.
     */
    public DefaultPageManager(WikiEngine engine, Properties props) throws WikiException {
        super(engine);
        String classname;
        m_engine = engine;
        boolean useCache = "true".equals(props.getProperty(PROP_USECACHE));

        m_expiryTime = TextUtil.parseIntParameter(props.getProperty(PROP_LOCKEXPIRY), 60);

        //
        //  If user wants to use a cache, then we'll use the CachingProvider.
        //
        if (useCache) {
            classname = "org.apache.wiki.providers.CachingProvider";
        } else {
            classname = m_engine.getRequiredProperty(props, PROP_PAGEPROVIDER);
        }

        pageSorter.initialize( props );

        try {
            LOG.debug("Page provider class: '" + classname + "'");
            Class<?> providerclass = ClassUtil.findClass("org.apache.wiki.providers", classname);
            m_provider = (WikiPageProvider) providerclass.newInstance();

            LOG.debug("Initializing page provider class " + m_provider);
            m_provider.initialize(m_engine, props);
        } catch (ClassNotFoundException e) {
            LOG.error("Unable to locate provider class '" + classname + "' (" + e.getMessage() + ")", e);
            throw new WikiException("No provider class. (" + e.getMessage() + ")", e);
        } catch (InstantiationException e) {
            LOG.error("Unable to create provider class '" + classname + "' (" + e.getMessage() + ")", e);
            throw new WikiException("Faulty provider class. (" + e.getMessage() + ")", e);
        } catch (IllegalAccessException e) {
            LOG.error("Illegal access to provider class '" + classname + "' (" + e.getMessage() + ")", e);
            throw new WikiException("Illegal provider class. (" + e.getMessage() + ")", e);
        } catch (NoRequiredPropertyException e) {
            LOG.error("Provider did not found a property it was looking for: " + e.getMessage(), e);
            throw e;  // Same exception works.
        } catch (IOException e) {
            LOG.error("An I/O exception occurred while trying to create a new page provider: " + classname, e);
            throw new WikiException("Unable to start page provider: " + e.getMessage(), e);
        }

    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getProvider()
     */
    @Override
    public WikiPageProvider getProvider() {
        return m_provider;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getAllPages()
     */
    @Override
    public Collection< WikiPage > getAllPages() throws ProviderException {
        return m_provider.getAllPages();
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getPageText(java.lang.String, int)
     */
    @Override
    public String getPageText(String pageName, int version) throws ProviderException {
        if (pageName == null || pageName.length() == 0) {
            throw new ProviderException("Illegal page name");
        }
        String text = null;

        try {
            text = m_provider.getPageText(pageName, version);
        } catch (RepositoryModifiedException e) {
            //
            //  This only occurs with the latest version.
            //
            LOG.info("Repository has been modified externally while fetching page " + pageName);

            //
            //  Empty the references and yay, it shall be recalculated
            //
            //WikiPage p = new WikiPage( pageName );
            WikiPage p = m_provider.getPageInfo(pageName, version);

            m_engine.updateReferences(p);

            if (p != null) {
                m_engine.getSearchManager().reindexPage(p);
                text = m_provider.getPageText(pageName, version);
            } else {
                //
                //  Make sure that it no longer exists in internal data structures either.
                //
                WikiPage dummy = new WikiPage(m_engine, pageName);
                m_engine.getSearchManager().pageRemoved(dummy);
                m_engine.getReferenceManager().pageRemoved(dummy);
            }
        }

        return text;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getEngine()
     */
    @Override
    public WikiEngine getEngine() {
        return m_engine;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#putPageText(org.apache.wiki.WikiPage, java.lang.String)
     */
    @Override
    public void putPageText(WikiPage page, String content) throws ProviderException {
        if (page == null || page.getName() == null || page.getName().length() == 0) {
            throw new ProviderException("Illegal page name");
        }

        m_provider.putPageText(page, content);
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#lockPage(org.apache.wiki.WikiPage, java.lang.String)
     */
    @Override
    public PageLock lockPage(WikiPage page, String user) {
        if (m_reaper == null) {
            //
            //  Start the lock reaper lazily.  We don't want to start it in
            //  the constructor, because starting threads in constructors
            //  is a bad idea when it comes to inheritance.  Besides,
            //  laziness is a virtue.
            //
            m_reaper = new LockReaper(m_engine);
            m_reaper.start();
        }

        fireEvent(WikiPageEvent.PAGE_LOCK, page.getName()); // prior to or after actual lock?
        PageLock lock = m_pageLocks.get(page.getName());

        if (lock == null) {
            //
            //  Lock is available, so make a lock.
            //
            Date d = new Date();
            lock = new PageLock(page, user, d, new Date(d.getTime() + m_expiryTime * 60 * 1000L));
            m_pageLocks.put(page.getName(), lock);
            LOG.debug("Locked page " + page.getName() + " for " + user);
        } else {
            LOG.debug("Page " + page.getName() + " already locked by " + lock.getLocker());
            lock = null; // Nothing to return
        }

        return lock;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#unlockPage(org.apache.wiki.pages.PageLock)
     */
    @Override
    public void unlockPage(PageLock lock) {
        if (lock == null) {
            return;
        }

        m_pageLocks.remove(lock.getPage());
        LOG.debug("Unlocked page " + lock.getPage());

        fireEvent(WikiPageEvent.PAGE_UNLOCK, lock.getPage());
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getCurrentLock(org.apache.wiki.WikiPage)
     */
    @Override
    public PageLock getCurrentLock(WikiPage page) {
        return m_pageLocks.get(page.getName());
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getActiveLocks()
     */
    @Override
    public List<PageLock> getActiveLocks() {
        ArrayList<PageLock> result = new ArrayList<>();

        for (PageLock lock : m_pageLocks.values()) {
            result.add(lock);
        }

        return result;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getPageInfo(java.lang.String, int)
     */
    @Override
    public WikiPage getPageInfo(String pageName, int version) throws ProviderException {
        if (pageName == null || pageName.length() == 0) {
            throw new ProviderException("Illegal page name '" + pageName + "'");
        }

        WikiPage page = null;

        try {
            page = m_provider.getPageInfo(pageName, version);
        } catch (RepositoryModifiedException e) {
            //
            //  This only occurs with the latest version.
            //
            LOG.info("Repository has been modified externally while fetching info for " + pageName);
            page = m_provider.getPageInfo(pageName, version);
            if (page != null) {
                m_engine.updateReferences(page);
            } else {
                m_engine.getReferenceManager().pageRemoved(new WikiPage(m_engine, pageName));
            }
        }

        //
        //  Should update the metadata.
        //
        /*
        if( page != null && !page.hasMetadata() )
        {
            WikiContext ctx = new WikiContext(m_engine,page);
            m_engine.textToHTML( ctx, getPageText(pageName,version) );
        }
        */
        return page;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getVersionHistory(java.lang.String)
     */
    @Override
    public List< WikiPage > getVersionHistory(String pageName) throws ProviderException {
        if (pageExists(pageName)) {
            return m_provider.getVersionHistory(pageName);
        }

        return null;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getProviderDescription()
     */
    @Override
    public String getProviderDescription() {
        return m_provider.getProviderInfo();
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getTotalPageCount()
     */
    @Override
    public int getTotalPageCount() {
        try {
            return m_provider.getAllPages().size();
        } catch (ProviderException e) {
            LOG.error("Unable to count pages: ", e);
            return -1;
        }
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#pageExists(java.lang.String)
     */
    @Override
    public boolean pageExists(String pageName) throws ProviderException {
        if (pageName == null || pageName.length() == 0) {
            throw new ProviderException("Illegal page name");
        }

        return m_provider.pageExists(pageName);
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#pageExists(java.lang.String, int)
     */
    @Override
    public boolean pageExists(String pageName, int version) throws ProviderException {
        if (pageName == null || pageName.length() == 0) {
            throw new ProviderException("Illegal page name");
        }

        if (version == WikiProvider.LATEST_VERSION) {
            return pageExists(pageName);
        }

        return m_provider.pageExists(pageName, version);
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#deleteVersion(org.apache.wiki.WikiPage)
     */
    @Override
    public void deleteVersion(WikiPage page) throws ProviderException {
        m_provider.deleteVersion(page.getName(), page.getVersion());

        // FIXME: If this was the latest, reindex Lucene
        // FIXME: Update RefMgr
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#deletePage(org.apache.wiki.WikiPage)
     */
    @Override
    public void deletePage(WikiPage page) throws ProviderException {
        fireEvent(WikiPageEvent.PAGE_DELETE_REQUEST, page.getName());
        m_provider.deletePage(page.getName());
        fireEvent(WikiPageEvent.PAGE_DELETED, page.getName());
    }

    /**
     * This is a simple reaper thread that runs roughly every minute
     * or so (it's not really that important, as long as it runs),
     * and removes all locks that have expired.
     */
    private class LockReaper extends WikiBackgroundThread {
        /**
         * Create a LockReaper for a given engine.
         *
         * @param engine WikiEngine to own this thread.
         */
        public LockReaper(WikiEngine engine) {
            super(engine, 60);
            setName("JSPWiki Lock Reaper");
        }

        @Override
        public void backgroundTask() throws Exception {
            Collection<PageLock> entries = m_pageLocks.values();
            for (Iterator<PageLock> i = entries.iterator(); i.hasNext(); ) {
                PageLock p = i.next();

                if ( p.isExpired() ) {
                    i.remove();

                    LOG.debug("Reaped lock: " + p.getPage() +
                              " by " + p.getLocker() +
                              ", acquired " + p.getAcquisitionTime() +
                              ", and expired " + p.getExpiryTime());
                }
            }
        }
    }

    // events processing .......................................................

    /**
     * Fires a WikiPageEvent of the provided type and page name
     * to all registered listeners.
     *
     * @param type     the event type to be fired
     * @param pagename the wiki page name as a String
     * @see org.apache.wiki.event.WikiPageEvent
     */
    protected final void fireEvent(int type, String pagename) {
        if (WikiEventManager.isListening(this)) {
            WikiEventManager.fireEvent(this, new WikiPageEvent(m_engine, type, pagename));
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Collection< WikiModuleInfo > modules() {
        return new ArrayList<>();
    }

    /**
     * Returns null!
     *  {@inheritDoc}
     */
    @Override
    public WikiModuleInfo getModuleInfo(String moduleName) {
    	return null;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#actionPerformed(org.apache.wiki.event.WikiEvent)
     */
    @Override
    public void actionPerformed(WikiEvent event) {
        if (!(event instanceof WikiSecurityEvent)) {
            return;
        }

        WikiSecurityEvent se = (WikiSecurityEvent) event;
        if (se.getType() == WikiSecurityEvent.PROFILE_NAME_CHANGED) {
            UserProfile[] profiles = (UserProfile[]) se.getTarget();
            Principal[] oldPrincipals = new Principal[]
                    {new WikiPrincipal(profiles[0].getLoginName()),
                            new WikiPrincipal(profiles[0].getFullname()),
                            new WikiPrincipal(profiles[0].getWikiName())};
            Principal newPrincipal = new WikiPrincipal(profiles[1].getFullname());

            // Examine each page ACL
            try {
                int pagesChanged = 0;
                Collection< WikiPage > pages = getAllPages();
                for (Iterator< WikiPage > it = pages.iterator(); it.hasNext(); ) {
                    WikiPage page = it.next();
                    boolean aclChanged = changeAcl(page, oldPrincipals, newPrincipal);
                    if (aclChanged) {
                        // If the Acl needed changing, change it now
                        try {
                            m_engine.getAclManager().setPermissions(page, page.getAcl());
                        } catch (WikiSecurityException e) {
                            LOG.error("Could not change page ACL for page " + page.getName() + ": " + e.getMessage(), e);
                        }
                        pagesChanged++;
                    }
                }
                LOG.info("Profile name change for '" + newPrincipal.toString() +
                        "' caused " + pagesChanged + " page ACLs to change also.");
            } catch (ProviderException e) {
                // Oooo! This is really bad...
                LOG.error("Could not change user name in Page ACLs because of Provider error:" + e.getMessage(), e);
            }
        }
    }

    /**
     * For a single wiki page, replaces all Acl entries matching a supplied array of Principals
     * with a new Principal.
     *
     * @param page          the wiki page whose Acl is to be modified
     * @param oldPrincipals an array of Principals to replace; all AclEntry objects whose
     *                      {@link AclEntry#getPrincipal()} method returns one of these Principals will be replaced
     * @param newPrincipal  the Principal that should receive the old Principals' permissions
     * @return <code>true</code> if the Acl was actually changed; <code>false</code> otherwise
     */
    protected boolean changeAcl(WikiPage page, Principal[] oldPrincipals, Principal newPrincipal) {
        Acl acl = page.getAcl();
        boolean pageChanged = false;
        if (acl != null) {
            Enumeration<AclEntry> entries = acl.entries();
            Collection<AclEntry> entriesToAdd = new ArrayList<>();
            Collection<AclEntry> entriesToRemove = new ArrayList<>();
            while (entries.hasMoreElements()) {
                AclEntry entry = entries.nextElement();
                if (ArrayUtils.contains(oldPrincipals, entry.getPrincipal())) {
                    // Create new entry
                    AclEntry newEntry = new AclEntryImpl();
                    newEntry.setPrincipal(newPrincipal);
                    Enumeration<Permission> permissions = entry.permissions();
                    while (permissions.hasMoreElements()) {
                        Permission permission = permissions.nextElement();
                        newEntry.addPermission(permission);
                    }
                    pageChanged = true;
                    entriesToRemove.add(entry);
                    entriesToAdd.add(newEntry);
                }
            }
            for (Iterator<AclEntry> ix = entriesToRemove.iterator(); ix.hasNext(); ) {
                AclEntry entry = ix.next();
                acl.removeEntry(entry);
            }
            for (Iterator<AclEntry> ix = entriesToAdd.iterator(); ix.hasNext(); ) {
                AclEntry entry = ix.next();
                acl.addEntry(entry);
            }
        }
        return pageChanged;
    }

    /* (non-Javadoc)
     * @see org.apache.wiki.pages.PageManager#getPageSorter()
     */
    @Override
    public PageSorter getPageSorter() {
        return pageSorter;
    }

}
