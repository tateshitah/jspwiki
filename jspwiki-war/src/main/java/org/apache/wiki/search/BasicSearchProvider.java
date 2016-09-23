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
package org.apache.wiki.search;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Properties;
import java.util.StringTokenizer;
import java.util.TreeSet;

import org.apache.log4j.Logger;
<<<<<<< HEAD
=======
import org.apache.wiki.WikiContext;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
import org.apache.wiki.WikiEngine;
import org.apache.wiki.WikiPage;
import org.apache.wiki.api.exceptions.NoRequiredPropertyException;
import org.apache.wiki.api.exceptions.ProviderException;
import org.apache.wiki.attachment.Attachment;
<<<<<<< HEAD
=======
import org.apache.wiki.auth.AuthorizationManager;
import org.apache.wiki.auth.permissions.PagePermission;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
import org.apache.wiki.providers.WikiPageProvider;

/**
 *  Interface for the search providers that handle searching the Wiki
 *
 *  @since 2.2.21.
 */
public class BasicSearchProvider implements SearchProvider
{
    private static final Logger log = Logger.getLogger(BasicSearchProvider.class);

    private WikiEngine m_engine;

    /**
     *  {@inheritDoc}
     */
    public void initialize(WikiEngine engine, Properties props)
            throws NoRequiredPropertyException, IOException
    {
        m_engine = engine;
    }

    /**
     *  {@inheritDoc}
     */
    public void pageRemoved(WikiPage page) {}

    /**
     *  {@inheritDoc}
     */
    public void reindexPage(WikiPage page) {}

    /**
     *  Parses a query into something that we can use.
     *  
     *  @param query A query string.
     *  @return A parsed array.
     */
    public  QueryItem[] parseQuery(String query)
    {
        StringTokenizer st = new StringTokenizer( query, " \t," );

        QueryItem[] items = new QueryItem[st.countTokens()];
        int word = 0;

        log.debug("Expecting "+items.length+" items");

        //
        //  Parse incoming search string
        //

        while( st.hasMoreTokens() )
        {
            log.debug("Item "+word);
            String token = st.nextToken().toLowerCase();

            items[word] = new QueryItem();

            switch( token.charAt(0) )
            {
              case '+':
                items[word].type = QueryItem.REQUIRED;
                token = token.substring(1);
                log.debug("Required word: "+token);
                break;

              case '-':
                items[word].type = QueryItem.FORBIDDEN;
                token = token.substring(1);
                log.debug("Forbidden word: "+token);
                break;

              default:
                items[word].type = QueryItem.REQUESTED;
                log.debug("Requested word: "+token);
                break;
            }

            items[word++].word = token;
        }

        return items;
    }

    private String attachmentNames(WikiPage page, String separator)
    {
        if(m_engine.getAttachmentManager().hasAttachments(page))
        {
            Collection attachments;
            try
            {
                attachments = m_engine.getAttachmentManager().listAttachments(page);
            }
            catch (ProviderException e)
            {
                log.error("Unable to get attachments for page", e);
                return "";
            }

<<<<<<< HEAD
            StringBuffer attachmentNames = new StringBuffer();
=======
            StringBuilder attachmentNames = new StringBuilder();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            for( Iterator it = attachments.iterator(); it.hasNext(); )
            {
                Attachment att = (Attachment) it.next();
                attachmentNames.append(att.getName());
                if(it.hasNext())
                    attachmentNames.append(separator);
            }
            return attachmentNames.toString();
        }

        return "";
    }

<<<<<<< HEAD
    private Collection findPages( QueryItem[] query )
=======
    private Collection findPages( QueryItem[] query, WikiContext wikiContext )
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    {
        TreeSet<SearchResult> res = new TreeSet<SearchResult>( new SearchResultComparator() );
        SearchMatcher matcher = new SearchMatcher( m_engine, query );

        Collection allPages = null;
<<<<<<< HEAD
        try
        {
            allPages = m_engine.getPageManager().getAllPages();
        }
        catch( ProviderException pe )
        {
=======
        try {
            allPages = m_engine.getPageManager().getAllPages();
        } catch( ProviderException pe ) {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            log.error( "Unable to retrieve page list", pe );
            return null;
        }

<<<<<<< HEAD
        Iterator it = allPages.iterator();
        while( it.hasNext() )
        {
            try
            {
                WikiPage page = (WikiPage) it.next();
                if (page != null)
                {
                    String pageName = page.getName();
                    String pageContent = m_engine.getPageManager().getPageText(pageName, WikiPageProvider.LATEST_VERSION) +
                                         attachmentNames(page, " ");
                    SearchResult comparison = matcher.matchPageContent( pageName, pageContent );

                    if( comparison != null )
                    {
                        res.add( comparison );
                    }
                }
            }
            catch( ProviderException pe )
            {
                log.error( "Unable to retrieve page from cache", pe );
            }
            catch( IOException ioe )
            {
=======
        AuthorizationManager mgr = m_engine.getAuthorizationManager();

        Iterator it = allPages.iterator();
        while( it.hasNext() ) {
            try {
                WikiPage page = (WikiPage) it.next();
                if (page != null) {
                	
                    PagePermission pp = new PagePermission( page, PagePermission.VIEW_ACTION );
                    if( wikiContext==null || mgr.checkPermission( wikiContext.getWikiSession(), pp ) ) {
	                    String pageName = page.getName();
	                    String pageContent = m_engine.getPageManager().getPageText(pageName, WikiPageProvider.LATEST_VERSION) +
	                                         attachmentNames(page, " ");
	                    SearchResult comparison = matcher.matchPageContent( pageName, pageContent );
	
	                    if( comparison != null ) {
	                        res.add( comparison );
	                    }
	                }
	            }
            } catch( ProviderException pe ) {
                log.error( "Unable to retrieve page from cache", pe );
            } catch( IOException ioe ) {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                log.error( "Failed to search page", ioe );
            }
        }

        return res;
    }

    /**
     *  {@inheritDoc}
     */
<<<<<<< HEAD
    public Collection findPages(String query)
    {
        return findPages(parseQuery(query));
=======
    public Collection findPages(String query, WikiContext wikiContext) {
        return findPages(parseQuery(query), wikiContext);
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    }

    /**
     *  {@inheritDoc}
     */
<<<<<<< HEAD
    public String getProviderInfo()
    {
=======
    public String getProviderInfo() {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        return "BasicSearchProvider";
    }

}
