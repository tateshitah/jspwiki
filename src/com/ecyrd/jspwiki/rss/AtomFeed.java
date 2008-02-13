/*
    JSPWiki - a JSP-based WikiWiki clone.

    Copyright (C) 2001-2007 Janne Jalkanen (Janne.Jalkanen@iki.fi)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation; either version 2.1 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */
package com.ecyrd.jspwiki.rss;

import java.io.IOException;
import java.io.StringWriter;
import java.util.*;

import javax.servlet.ServletContext;

import org.apache.commons.lang.time.DateFormatUtils;
import org.jdom.Element;
import org.jdom.Namespace;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import com.ecyrd.jspwiki.Release;
import com.ecyrd.jspwiki.WikiContext;
import com.ecyrd.jspwiki.WikiEngine;
import com.ecyrd.jspwiki.WikiPage;
import com.ecyrd.jspwiki.action.AttachActionBean;
import com.ecyrd.jspwiki.action.RSSActionBean;
import com.ecyrd.jspwiki.attachment.Attachment;
import com.ecyrd.jspwiki.providers.ProviderException;

/**
 *  Provides an Atom 1.0 standard feed, with enclosures.
 *
 * @author jalkanen
 *
 */
public class AtomFeed extends Feed
{
    private Namespace m_atomNameSpace = Namespace.getNamespace("http://www.w3.org/2005/Atom");

    public static final String RFC3339FORMAT = "yyyy-MM-dd'T'HH:mm:ssZZ";

    public AtomFeed( WikiContext c )
    {
        super(c);
    }

    /**
     *   This is a bit complicated right now, as there is no proper metadata
     *   store in JSPWiki.
     *
     *   @return
     */
    private String getFeedID()
    {
        return m_wikiContext.getEngine().getBaseURL(); // FIXME: This is not a feed id
    }

    private String getEntryID( Entry e )
    {
        return e.getURL(); // FIXME: Not really a feed id!
    }

    private Collection getItems()
    {
        ArrayList list = new ArrayList();

        WikiEngine engine = m_wikiContext.getEngine();
        ServletContext servletContext = null;

        if( m_wikiContext.getHttpRequest() != null )
            servletContext = m_wikiContext.getHttpRequest().getSession().getServletContext();

        for( Iterator i = m_entries.iterator(); i.hasNext(); )
        {
            Entry e = (Entry)i.next();

            WikiPage p = e.getPage();

            Element entryEl = getElement("entry");

            //
            //  Mandatory elements
            //

            entryEl.addContent( getElement("id").setText( getEntryID(e)) );
            entryEl.addContent( getElement("title").setAttribute("type","html").setText( e.getTitle() ));
            entryEl.addContent( getElement("updated").setText( DateFormatUtils.formatUTC(p.getLastModified(),
                                                                                         RFC3339FORMAT )));
            //
            //  Optional elements
            //

            entryEl.addContent( getElement("author").addContent( getElement("name").setText( e.getAuthor() )));
            entryEl.addContent( getElement("link").setAttribute("rel","alternate").setAttribute("href",e.getURL()));
            entryEl.addContent( getElement("content").setAttribute("type","html").setText( e.getContent() ));

            //
            //  Check for enclosures
            //

            if( engine.getAttachmentManager().hasAttachments(p) && servletContext != null )
            {
                try
                {
                    Collection c = engine.getAttachmentManager().listAttachments(p);

                    for( Iterator a = c.iterator(); a.hasNext(); )
                    {
                        Attachment att = (Attachment) a.next();

                        Element attEl = getElement("link");
                        attEl.setAttribute( "rel","enclosure" );
                        attEl.setAttribute( "href", m_wikiContext.getContext().getURL(AttachActionBean.class, att.getName(), null, true ) );
                        attEl.setAttribute( "length", Long.toString(att.getSize()) );
                        attEl.setAttribute( "type", getMimeType( servletContext, att.getFileName() ) );

                        entryEl.addContent( attEl );
                    }
                }
                catch( ProviderException ex )
                {
                    // FIXME: log.info("Can't get attachment data",ex);
                }
            }


            list.add( entryEl );
        }

        return list;
    }

    public String getString()
    {
        Element root = getElement("feed");
        WikiEngine engine = m_wikiContext.getEngine();

        Date lastModified = new Date(0L);

        for( Iterator i = m_entries.iterator(); i.hasNext(); )
        {
            Entry e = (Entry)i.next();

            if( e.getPage().getLastModified().after(lastModified) )
                lastModified = e.getPage().getLastModified();
        }

        //
        //  Mandatory parts
        //
        root.addContent( getElement("title").setText( getChannelTitle() ) );
        root.addContent( getElement("id").setText(getFeedID()) );
        root.addContent( getElement("updated").setText(DateFormatUtils.formatUTC( lastModified,
                                                                                  RFC3339FORMAT ) ));

        //
        //  Optional
        //
        // root.addContent( getElement("author").addContent(getElement("name").setText(format())))
        root.addContent( getElement("link").setAttribute("href",engine.getBaseURL()));
        root.addContent( getElement("generator").setText("JSPWiki "+Release.VERSTR));
        
        Map<String,String> rssParams = new HashMap<String,String>();
        rssParams.put("mode", m_mode);
        rssParams.put("type", "atom");
        String rssFeedURL  = m_wikiContext.getContext().getURL(RSSActionBean.class, 
                                           "page="+engine.encodeName(m_wikiContext.getPage().getName()),
                                           rssParams,
                                           true );
        Element self = getElement("link").setAttribute("rel","self");
        self.setAttribute("href",rssFeedURL);
        root.addContent(self);

        //
        //  Items
        //

        root.addContent( getItems() );

        //
        //  aaand output
        //
        XMLOutputter output = new XMLOutputter();

        output.setFormat( Format.getPrettyFormat() );

        try
        {
            StringWriter res = new StringWriter();
            output.output( root, res );

            return res.toString();
        }
        catch( IOException e )
        {
            return null;
        }
    }

    private final Element getElement( String name )
    {
        return new Element( name, m_atomNameSpace );
    }
}
