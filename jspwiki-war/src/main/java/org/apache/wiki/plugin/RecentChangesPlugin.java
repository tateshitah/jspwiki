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
package org.apache.wiki.plugin;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.Map;

<<<<<<< HEAD
=======
import org.apache.commons.lang.StringUtils;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
import org.apache.log4j.Logger;
import org.apache.wiki.WikiContext;
import org.apache.wiki.WikiEngine;
import org.apache.wiki.WikiPage;
import org.apache.wiki.api.exceptions.PluginException;
import org.apache.wiki.api.plugin.WikiPlugin;
import org.apache.wiki.attachment.Attachment;
import org.apache.wiki.i18n.InternationalizationManager;
import org.apache.wiki.preferences.Preferences;
import org.apache.wiki.preferences.Preferences.TimeFormat;
import org.apache.wiki.util.TextUtil;
import org.apache.wiki.util.XHTML;
import org.apache.wiki.util.XhtmlUtil;
import org.jdom2.Element;

<<<<<<< HEAD
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
/**
 *  Returns the Recent Changes in the wiki being a date-sorted list of page names.
 *
 *  <p>Parameters: </p>
 *  <ul>
 *  <li><b>since</b> - show changes from the last n days, for example since=5 shows only the pages that were changed in the last five days</li>
 *  <li><b>format</b> - (full|compact) : if "full", then display a long version with all possible info. If "compact", then be as compact as possible.</li>
 *  <li><b>timeFormat</b> - the time format to use, the default is "HH:mm:ss"</li>
 *  <li><b>dateFormat</b> - the date format to use, the default is "dd.MM.yyyy"</li>
 *  </ul>
 */
public class RecentChangesPlugin extends AbstractReferralPlugin implements WikiPlugin {
	
<<<<<<< HEAD
    private static final Logger log = Logger.getLogger(RecentChangesPlugin.class);
=======
    private static final Logger log = Logger.getLogger( RecentChangesPlugin.class );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    
    /** Parameter name for the separator format.  Value is <tt>{@value}</tt>. */
    public static final String PARAM_FORMAT      = "format";
    /** Parameter name for the separator timeFormat.  Value is <tt>{@value}</tt>. */
    public static final String PARAM_TIME_FORMAT = "timeFormat";
    /** Parameter name for the separator dateFormat.  Value is <tt>{@value}</tt>. */
    public static final String PARAM_DATE_FORMAT = "dateFormat";

    /** How many days we show by default. */
    private static final int   DEFAULT_DAYS = 100*365;
    public static final String DEFAULT_TIME_FORMAT ="HH:mm:ss";
    public static final String DEFAULT_DATE_FORMAT ="dd.MM.yyyy";


    /**
     * {@inheritDoc}
     */
    @SuppressWarnings("unchecked")
<<<<<<< HEAD
    public String execute( WikiContext context, Map<String, String> params )
        throws PluginException
    {
=======
    public String execute( WikiContext context, Map<String, String> params ) throws PluginException {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        int since = TextUtil.parseIntParameter( params.get( "since" ), DEFAULT_DAYS );
        String   spacing  = "4";
        boolean  showAuthor = true;
        boolean  showChangenote = true;
        String   tablewidth = "4";
        
        WikiEngine engine = context.getEngine();

        //
        //  Which format we want to see?
        //
<<<<<<< HEAD
        if( "compact".equals( params.get(PARAM_FORMAT) ) )
        {
=======
        if( "compact".equals( params.get(PARAM_FORMAT) ) ) {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            spacing  = "0";
            showAuthor = false;
            showChangenote = false;
            tablewidth = "2";
        }

        Calendar sincedate = new GregorianCalendar();
        sincedate.add( Calendar.DAY_OF_MONTH, -since );

        log.debug("Calculating recent changes from "+sincedate.getTime());

        // FIXME: Should really have a since date on the getRecentChanges method.
<<<<<<< HEAD
        Collection<WikiPage> changes = engine.getRecentChanges();
        super.initialize( context, params );
        changes = super.filterCollection(changes);
        
        if ( changes != null )
        {
            Date olddate   = new Date(0);
=======
        Collection< WikiPage > changes = engine.getRecentChanges();
        super.initialize( context, params );
        changes = super.filterCollection(changes);
        
        if ( changes != null ) {
            Date olddate = new Date( 0 );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

            DateFormat fmt = getDateFormat( context, params );
            DateFormat tfmt = getTimeFormat( context, params );

<<<<<<< HEAD
            Element rt = XhtmlUtil.element(XHTML.table);
            rt.setAttribute(XHTML.ATTR_class,"recentchanges");
            rt.setAttribute(XHTML.ATTR_cellpadding,spacing);
        
            for( Iterator<WikiPage> i = changes.iterator(); i.hasNext(); )
            {
                WikiPage pageref = (WikiPage) i.next();

                Date lastmod = pageref.getLastModified();

                if( lastmod.before( sincedate.getTime() ) )
                {
                    break;
                }
                
                if( !isSameDay( lastmod, olddate ) )
                {
                    Element row = XhtmlUtil.element(XHTML.tr);
                    Element col = XhtmlUtil.element(XHTML.td);
                    col.setAttribute(XHTML.ATTR_colspan,tablewidth);
                    col.setAttribute(XHTML.ATTR_class,"date");                    
                    col.addContent(XhtmlUtil.element(XHTML.b,fmt.format(lastmod)));
                    
                    rt.addContent(row);
                    row.addContent(col);                    
=======
            Element rt = XhtmlUtil.element( XHTML.table );
            rt.setAttribute( XHTML.ATTR_class, "recentchanges" );
            rt.setAttribute( XHTML.ATTR_cellpadding, spacing );
        
            for( Iterator< WikiPage > i = changes.iterator(); i.hasNext(); ) {
                WikiPage pageref = i.next();
                Date lastmod = pageref.getLastModified();

                if( lastmod.before( sincedate.getTime() ) ) {
                    break;
                }
                
                if( !isSameDay( lastmod, olddate ) ) {
                    Element row = XhtmlUtil.element( XHTML.tr );
                    Element col = XhtmlUtil.element( XHTML.td );
                    col.setAttribute( XHTML.ATTR_colspan, tablewidth );
                    col.setAttribute( XHTML.ATTR_class, "date" );
                    col.addContent( XhtmlUtil.element( XHTML.b, fmt.format( lastmod ) ) );

                    rt.addContent( row );
                    row.addContent( col );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                    olddate = lastmod;
                }

                String href = context.getURL( pageref instanceof Attachment ? WikiContext.ATTACH : WikiContext.VIEW, 
                                              pageref.getName() ) ;
<<<<<<< HEAD
                
                Element link = XhtmlUtil.link(href,engine.beautifyTitle(pageref.getName()));
                
                Element row = XhtmlUtil.element(XHTML.tr);
                Element col = XhtmlUtil.element(XHTML.td);
                col.setAttribute(XHTML.ATTR_width,"30%");
                col.addContent(link);
=======

                Element link = XhtmlUtil.link( href, engine.beautifyTitle( pageref.getName() ) );

                Element row = XhtmlUtil.element( XHTML.tr );
                Element col = XhtmlUtil.element( XHTML.td );
                col.setAttribute( XHTML.ATTR_width, "30%" );
                col.addContent( link );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                
                //
                //  Add the direct link to the attachment info.
                //
<<<<<<< HEAD
                if( pageref instanceof Attachment )
                {
                    link = XhtmlUtil.link(context.getURL(WikiContext.INFO,pageref.getName()),null);
                    link.setAttribute(XHTML.ATTR_class,"infolink");
                    
                    Element img = XhtmlUtil.img(context.getURL(WikiContext.NONE,"images/attachment_small.png"),null);
                    link.addContent(img);
                    
                    col.addContent(link);
                }

                
                row.addContent(col);
                rt.addContent(row);
                
                if( pageref instanceof Attachment )
                {
                    Element td = XhtmlUtil.element(XHTML.td,tfmt.format(lastmod));
                    td.setAttribute(XHTML.ATTR_class,"lastchange");
                    row.addContent(td);
                }
                else
                {
                    Element infocol = XhtmlUtil.element(XHTML.td);
                    infocol.setAttribute(XHTML.ATTR_class,"lastchange");
                    infocol.addContent(XhtmlUtil.link(context.getURL(WikiContext.DIFF, pageref.getName(), "r1=-1"),tfmt.format(lastmod)));
                    row.addContent(infocol);
=======
                if( pageref instanceof Attachment ) {
                    link = XhtmlUtil.link( context.getURL( WikiContext.INFO, pageref.getName() ), null );
                    link.setAttribute( XHTML.ATTR_class, "infolink" );

                    Element img = XhtmlUtil.img( context.getURL( WikiContext.NONE, "images/attachment_small.png" ), null );
                    link.addContent( img );

                    col.addContent( link );
                }

                row.addContent( col );
                rt.addContent( row );
                
                if( pageref instanceof Attachment ) {
                    Element td = XhtmlUtil.element( XHTML.td, tfmt.format( lastmod ) );
                    td.setAttribute( XHTML.ATTR_class, "lastchange" );
                    row.addContent( td );
                } else {
                    Element infocol = XhtmlUtil.element( XHTML.td );
                    infocol.setAttribute( XHTML.ATTR_class, "lastchange" );
                    infocol.addContent( XhtmlUtil.link( context.getURL( WikiContext.DIFF, pageref.getName(), "r1=-1" ), tfmt.format( lastmod ) ) );
                    row.addContent( infocol );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                }

                //
                //  Display author information.
                //

<<<<<<< HEAD
                if( showAuthor )
                {
                    String author = pageref.getAuthor();

                    Element authorinfo = XhtmlUtil.element(XHTML.td);
                    authorinfo.setAttribute(XHTML.ATTR_class,"author");
                    
                    if( author != null )
                    {
                        if( engine.pageExists(author) )
                        {
                            authorinfo.addContent(XhtmlUtil.link(context.getURL(WikiContext.VIEW, author),author));
                        }
                        else
                        {
                            authorinfo.addContent(author);
                        }
                    }
                    else
                    {
=======
                if( showAuthor ) {
                    String author = pageref.getAuthor();

                    Element authorinfo = XhtmlUtil.element( XHTML.td );
                    authorinfo.setAttribute( XHTML.ATTR_class, "author" );
                    
                    if( author != null ) {
                        if( engine.pageExists( author ) ) {
                            authorinfo.addContent( XhtmlUtil.link( context.getURL( WikiContext.VIEW, author ), author ) );
                        } else {
                            authorinfo.addContent( author );
                        }
                    } else {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                        authorinfo.addContent( Preferences.getBundle( context, InternationalizationManager.CORE_BUNDLE )
                                                          .getString( "common.unknownauthor" ) );
                    }

<<<<<<< HEAD
                    row.addContent(authorinfo);
                }

                // Change note
                if( showChangenote )
                {
                    String changenote = (String)pageref.getAttribute(WikiPage.CHANGENOTE);
                    Element td_changenote = XhtmlUtil.element(XHTML.td,changenote);
                    td_changenote.setAttribute(XHTML.ATTR_class,"changenote");
                    row.addContent(td_changenote);
=======
                    row.addContent( authorinfo );
                }

                // Change note
                if( showChangenote ) {
                    String changenote = ( String )pageref.getAttribute( WikiPage.CHANGENOTE );
                    Element td_changenote = XhtmlUtil.element( XHTML.td, changenote );
                    td_changenote.setAttribute( XHTML.ATTR_class, "changenote" );
                    row.addContent( td_changenote );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                }
                
                //  Revert note
/*                
                if( context.hasAdminPermissions() )
                {
                    row.addElement( new td("Revert") );
                }
 */
            }
<<<<<<< HEAD
            return XhtmlUtil.serialize(rt,true);
        }        
=======
            return XhtmlUtil.serialize( rt, XhtmlUtil.EXPAND_EMPTY_NODES );
        }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        return "";
    }

    
<<<<<<< HEAD
    private boolean isSameDay( Date a, Date b )
    {
        Calendar aa = Calendar.getInstance(); aa.setTime(a);
        Calendar bb = Calendar.getInstance(); bb.setTime(b);

        return aa.get( Calendar.YEAR ) == bb.get( Calendar.YEAR ) 
                && aa.get( Calendar.DAY_OF_YEAR ) == bb.get( Calendar.DAY_OF_YEAR );
=======
    private boolean isSameDay( Date a, Date b ) {
        Calendar aa = Calendar.getInstance(); aa.setTime( a );
        Calendar bb = Calendar.getInstance(); bb.setTime( b );

        return aa.get( Calendar.YEAR ) == bb.get( Calendar.YEAR ) 
            && aa.get( Calendar.DAY_OF_YEAR ) == bb.get( Calendar.DAY_OF_YEAR );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    }
    

    // TODO: Ideally the default behavior should be to return the default format for the default
    // locale, but that is at odds with the 1st version of this plugin. We seek to preserve the
    // behaviour of that first version, so to get the default format, the user must explicitly do
    // something like: dateFormat='' timeformat='' which is a odd, but probably okay.
<<<<<<< HEAD
    private DateFormat getTimeFormat( WikiContext context, Map<String, String> params )
    {
        String formatString = get(params, DEFAULT_TIME_FORMAT, PARAM_TIME_FORMAT);

        if ("".equals(formatString.trim()))
            return Preferences.getDateFormat( context, TimeFormat.TIME );

        return new SimpleDateFormat(formatString);
    }



    private DateFormat getDateFormat( WikiContext context, Map<String, String> params )
    {
        String formatString = get(params, DEFAULT_DATE_FORMAT, PARAM_DATE_FORMAT);

        if( formatString.trim().equals("") )
        {
=======
    private DateFormat getTimeFormat( WikiContext context, Map<String, String> params ) {
        String formatString = get( params, DEFAULT_TIME_FORMAT, PARAM_TIME_FORMAT );

        if( StringUtils.isBlank( formatString ) ) {
            return Preferences.getDateFormat( context, TimeFormat.TIME );
        }

        return new SimpleDateFormat( formatString );
    }

    private DateFormat getDateFormat( WikiContext context, Map< String, String > params ) {
        String formatString = get( params, DEFAULT_DATE_FORMAT, PARAM_DATE_FORMAT );
        
        if( StringUtils.isBlank( formatString ) ) {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            return Preferences.getDateFormat( context, TimeFormat.DATE );
        }

        return new SimpleDateFormat( formatString );
    }
<<<<<<< HEAD


    private String get( Map<String, String> params, String defaultValue, String paramName )
    {
        String value = params.get(paramName);
        return value == null ? defaultValue : value;
    }

=======
    
    private String get( Map< String, String > params, String defaultValue, String paramName ) {
        String value = params.get( paramName );
        return value == null ? defaultValue : value;
    }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    
}