<<<<<<< HEAD
/* 
=======
/*
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
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
<<<<<<< HEAD
    under the License.  
=======
    under the License.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
 */
package org.apache.wiki.preferences;

import java.text.DateFormat;
<<<<<<< HEAD
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
=======
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.MissingResourceException;
import java.util.Properties;
import java.util.ResourceBundle;
import java.util.TimeZone;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.PageContext;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.wiki.InternalWikiException;
import org.apache.wiki.WikiContext;
import org.apache.wiki.i18n.InternationalizationManager;
import org.apache.wiki.util.HttpUtil;
import org.apache.wiki.util.PropertyReader;
import org.apache.wiki.util.TextUtil;
<<<<<<< HEAD
import org.json.JSONObject;

/**
 *  Represents an object which is used to store user preferences.
 *  
=======

import com.google.gson.Gson;

/**
 *  Represents an object which is used to store user preferences.
 *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
 */
public class Preferences
    extends HashMap<String,String>
{
    private static final long serialVersionUID = 1L;
<<<<<<< HEAD
    
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    /**
     *  The name under which a Preferences object is stored in the HttpSession.
     *  Its value is {@value}.
     */
    public static final String SESSIONPREFS = "prefs";
<<<<<<< HEAD
     
    private static Logger log = Logger.getLogger( Preferences.class );
    
=======

    private static Logger log = Logger.getLogger( Preferences.class );

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    /**
     *  This is an utility method which is called to make sure that the
     *  JSP pages do have proper access to any user preferences.  It should be
     *  called from the commonheader.jsp.
     *  <p>
     *  This method reads user cookie preferences and mixes them up with any
     *  default preferences (and in the future, any user-specific preferences)
     *  and puts them all in the session, so that they do not have to be rewritten
     *  again.
     *  <p>
     *  This method will remember if the user has already changed his prefs.
<<<<<<< HEAD
     *  
=======
     *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
     *  @param pageContext The JSP PageContext.
     */
    public static void setupPreferences( PageContext pageContext )
    {
<<<<<<< HEAD
        HttpSession session = pageContext.getSession();

        if( session.getAttribute( SESSIONPREFS ) == null )
        {
            reloadPreferences( pageContext );
        }
    }
    
    /**
     *  Reloads the preferences from the PageContext into the WikiContext.
     *  
=======
        //HttpSession session = pageContext.getSession();

        //if( session.getAttribute( SESSIONPREFS ) == null )
        //{
            reloadPreferences( pageContext );
        //}
    }

    /**
     *  Reloads the preferences from the PageContext into the WikiContext.
     *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
     *  @param pageContext The page context.
     */
    // FIXME: The way that date preferences are chosen is currently a bit wacky: it all
    //        gets saved to the cookie based on the browser state with which the user
    //        happened to first arrive to the site with.  This, unfortunately, means that
    //        even if the user changes e.g. language preferences (like in a web cafe),
    //        the old preferences still remain in a site cookie.
    public static void reloadPreferences( PageContext pageContext )
    {
        Preferences prefs = new Preferences();
        Properties props = PropertyReader.loadWebAppProps( pageContext.getServletContext() );
        WikiContext ctx = WikiContext.findContext( pageContext );
<<<<<<< HEAD
        
        prefs.put("SkinName", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.skinname", "PlainVanilla" ) );
        prefs.put("DateFormat", 
                  TextUtil.getStringProperty( props, 
                                              "jspwiki.defaultprefs.template.dateformat", 
                                              ctx.getEngine().getInternationalizationManager().get( InternationalizationManager.CORE_BUNDLE, 
                                                                                                    getLocale( ctx ), 
                                                                                                    "common.datetimeformat" ) ) );

        prefs.put("TimeZone", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.timezone", 
                                                          java.util.TimeZone.getDefault().getID() ) );

        prefs.put("Orientation", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.orientation", "fav-left" ) );
        
=======

        prefs.put("SkinName", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.skinname", "PlainVanilla" ) );
        prefs.put("DateFormat",
                  TextUtil.getStringProperty( props,
                                              "jspwiki.defaultprefs.template.dateformat",
                                              ctx.getEngine().getInternationalizationManager().get( InternationalizationManager.CORE_BUNDLE,
                                                                                                    getLocale( ctx ),
                                                                                                    "common.datetimeformat" ) ) );

        prefs.put("TimeZone", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.timezone",
                                                          java.util.TimeZone.getDefault().getID() ) );

        prefs.put("Orientation", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.orientation", "fav-left" ) );
        prefs.put("Sidebar", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.sidebar", "active" ) );

        prefs.put("Layout", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.layout", "fluid" ) );

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        prefs.put("Language", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.language",
                                                          getLocale( ctx ).toString() ) );

        prefs.put("SectionEditing", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.sectionediting",
<<<<<<< HEAD
                                                          "" ) );
=======
                                                          "true" ) );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        // FIXME: "editor" property does not get registered, may be related with http://bugs.jspwiki.org/show_bug.cgi?id=117
        // disabling it until knowing why it's happening
        // FIXME: editormanager reads jspwiki.editor -- which of both properties should continue
        prefs.put("editor", TextUtil.getStringProperty( props, "jspwiki.defaultprefs.template.editor", "plain" ) );
<<<<<<< HEAD
                
        parseJSONPreferences( (HttpServletRequest) pageContext.getRequest(), prefs );

        pageContext.getSession().setAttribute( SESSIONPREFS, prefs );        
    }

 
    /**
     *  Parses new-style preferences stored as JSON objects and stores them
     *  in the session.  Everything in the cookie is stored.
     *  
     *  @param request
     *  @param prefs The default hashmap of preferences
     *  
     */
    private static void parseJSONPreferences( HttpServletRequest request, Preferences prefs )
    {
        //FIXME: urlDecodeUTF8 should better go in HttpUtil ??
        String prefVal = TextUtil.urlDecodeUTF8( HttpUtil.retrieveCookieValue( request, "JSPWikiUserPrefs" ) );
        
        if( prefVal != null )
        {
            try
            {
                JSONObject jo = new JSONObject( prefVal );
    
                for( Iterator i = jo.keys(); i.hasNext(); )
                {
                    String key = TextUtil.replaceEntities( (String)i.next() );
                    prefs.put(key, jo.getString(key) );
                }
            }
            catch( ParseException e )
            {
            }
=======

        parseJSONPreferences( (HttpServletRequest) pageContext.getRequest(), prefs );

        pageContext.getSession().setAttribute( SESSIONPREFS, prefs );
    }


    /**
     *  Parses new-style preferences stored as JSON objects and stores them
     *  in the session.  Everything in the cookie is stored.
     *
     *  @param request
     *  @param prefs The default hashmap of preferences
     *
     */
	private static void parseJSONPreferences( HttpServletRequest request, Preferences prefs )
    {
        //FIXME: urlDecodeUTF8 should better go in HttpUtil ??
        String prefVal = TextUtil.urlDecodeUTF8( HttpUtil.retrieveCookieValue( request, "JSPWikiUserPrefs" ) );

        if( prefVal != null )
        {
            Gson gson=new Gson();
            Map<String,String> map = new HashMap<String,String>();
            // Convert prefVal JSON to a generic hashmap
            map = (Map<String,String>) gson.fromJson(prefVal, map.getClass());

            for (String key : map.keySet()) {
                key = TextUtil.replaceEntities( key );
                // Sometimes this is not a String as it comes from the Cookie set by Javascript
                Object value = map.get(key);
                if (value != null) {
                	prefs.put(key, value.toString() );
                }
            }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        }
    }

    /**
     *  Returns a preference value programmatically.
     *  FIXME
<<<<<<< HEAD
     *  
=======
     *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
     *  @param wikiContext
     *  @param name
     *  @return the preference value
     */
    public static String getPreference( WikiContext wikiContext, String name )
    {
        HttpServletRequest request = wikiContext.getHttpRequest();
        if ( request == null ) return null;
<<<<<<< HEAD
        
        Preferences prefs = (Preferences)request.getSession().getAttribute( SESSIONPREFS );
        
        if( prefs != null )
            return prefs.get( name );
        
=======

        Preferences prefs = (Preferences)request.getSession().getAttribute( SESSIONPREFS );

        if( prefs != null )
            return prefs.get( name );

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        return null;
    }
    /**
     *  Returns a preference value programmatically.
     *  FIXME
<<<<<<< HEAD
     *  
=======
     *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
     *  @param pageContext
     *  @param name
     *  @return the preference value
     */
    public static String getPreference( PageContext pageContext, String name )
    {
        Preferences prefs = (Preferences)pageContext.getSession().getAttribute( SESSIONPREFS );
<<<<<<< HEAD
        
        if( prefs != null )
            return prefs.get( name );
        
        return null;
    }

    
    /**
     * Get Locale according to user-preference settings or the user browser locale
     * 
=======

        if( prefs != null )
            return prefs.get( name );

        return null;
    }


    /**
     * Get Locale according to user-preference settings or the user browser locale
     *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
     * @param context The context to examine.
     * @return a Locale object.
     * @since 2.8
     */
    public static Locale getLocale( WikiContext context )
    {
        Locale loc = null;
<<<<<<< HEAD
        
        String langSetting = getPreference( context, "Language" );
        
=======

        String langSetting = getPreference( context, "Language" );

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        //
        // parse language and construct valid Locale object
        //
        if( langSetting != null )
        {
            String language = "";
            String country  = "";
            String variant  = "";
<<<<<<< HEAD
            
            String[] res = StringUtils.split( langSetting, "-_" );
            
            if( res.length > 2 ) variant = res[2];
            if( res.length > 1 ) country = res[1];
            
            if( res.length > 0 )
            {
                language = res[0];
            
                loc = new Locale( language, country, variant );
            }
        }
        
        // otherwise try to find out the browser's preferred language setting, or use the JVM's default
        if( loc == null )
        {    
=======

            String[] res = StringUtils.split( langSetting, "-_" );

            if( res.length > 2 ) variant = res[2];
            if( res.length > 1 ) country = res[1];

            if( res.length > 0 )
            {
                language = res[0];

                loc = new Locale( language, country, variant );
            }
        }

        // otherwise try to find out the browser's preferred language setting, or use the JVM's default
        if( loc == null )
        {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            HttpServletRequest request = context.getHttpRequest();
            loc = ( request != null ) ? request.getLocale() : Locale.getDefault();
        }

        //log.info( "using locale "+loc.toString() );
        return loc;
    }
<<<<<<< HEAD
    
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    /**
     *  Locates the i18n ResourceBundle given.  This method interprets
     *  the request locale, and uses that to figure out which language the
     *  user wants.
     *  @see org.apache.wiki.i18n.InternationalizationManager
     *  @param context {@link WikiContext} holding the user's locale
     *  @param bundle  The name of the bundle you are looking for.
     *  @return A localized string (or from the default language, if not found)
     *  @throws MissingResourceException If the bundle cannot be found
     */
<<<<<<< HEAD
    public static ResourceBundle getBundle( WikiContext context, String bundle ) 
        throws MissingResourceException 
=======
    public static ResourceBundle getBundle( WikiContext context, String bundle )
        throws MissingResourceException
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    {
        Locale loc = getLocale( context );
        InternationalizationManager i18n = context.getEngine().getInternationalizationManager();
        return i18n.getBundle( bundle, loc );
    }

    /**
     *  Get SimpleTimeFormat according to user browser locale and preferred time
     *  formats. If not found, it will revert to whichever format is set for the
     *  default
<<<<<<< HEAD
     * 
=======
     *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
     *  @param context WikiContext to use for rendering.
     *  @param tf Which version of the dateformat you are looking for?
     *  @return A SimpleTimeFormat object which you can use to render
     *  @since 2.8
     */
    public static SimpleDateFormat getDateFormat( WikiContext context, TimeFormat tf )
    {
        InternationalizationManager imgr = context.getEngine().getInternationalizationManager();
        Locale clientLocale = getLocale( context );
        String prefTimeZone = getPreference( context, "TimeZone" );
        String prefDateFormat;
<<<<<<< HEAD
        
        log.debug("Checking for preferences...");
        
=======

        log.debug("Checking for preferences...");

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        switch( tf )
        {
            case DATETIME:
                prefDateFormat = getPreference( context, "DateFormat" );
                log.debug("Preferences fmt = "+prefDateFormat);
<<<<<<< HEAD
                if( prefDateFormat == null ) 
                {
                    prefDateFormat = imgr.get( InternationalizationManager.CORE_BUNDLE, 
                                               clientLocale, 
=======
                if( prefDateFormat == null )
                {
                    prefDateFormat = imgr.get( InternationalizationManager.CORE_BUNDLE,
                                               clientLocale,
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                                               "common.datetimeformat" );
                    log.debug("Using locale-format = "+prefDateFormat);
                }
                break;
<<<<<<< HEAD
                
            case TIME:
                prefDateFormat = imgr.get( "common.timeformat" );
                break;
                
            case DATE:
                prefDateFormat = imgr.get( "common.dateformat" );
                break;
                
            default:
                throw new InternalWikiException( "Got a TimeFormat for which we have no value!" );
        }
        
=======

            case TIME:
                prefDateFormat = imgr.get( "common.timeformat" );
                break;

            case DATE:
                prefDateFormat = imgr.get( "common.dateformat" );
                break;

            default:
                throw new InternalWikiException( "Got a TimeFormat for which we have no value!" );
        }

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        try
        {
            SimpleDateFormat fmt = new SimpleDateFormat( prefDateFormat, clientLocale );

            if( prefTimeZone != null )
            {
                TimeZone tz = TimeZone.getTimeZone( prefTimeZone );
                // TimeZone tz = TimeZone.getDefault();
                // tz.setRawOffset(Integer.parseInt(prefTimeZone));

                fmt.setTimeZone( tz );
            }

            return fmt;
        }
        catch( Exception e )
        {
            return null;
        }
    }

    /**
     *  A simple helper function to render a date based on the user preferences.
     *  This is useful for example for all plugins.
<<<<<<< HEAD
     *  
=======
     *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
     *  @param context  The context which is used to get the preferences
     *  @param date     The date to render.
     *  @param tf       In which format the date should be rendered.
     *  @return A ready-rendered date.
     *  @since 2.8
     */
    public static String renderDate( WikiContext context, Date date, TimeFormat tf )
    {
        DateFormat df = getDateFormat( context, tf );
<<<<<<< HEAD
        
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        return df.format( date );
    }

    /**
     *  Is used to choose between the different date formats that JSPWiki supports.
     *  <ul>
     *   <li>TIME: A time format, without  date</li>
     *   <li>DATE: A date format, without a time</li>
     *   <li>DATETIME: A date format, with a time</li>
     *  </ul>
<<<<<<< HEAD
     *  
=======
     *
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
     *  @since 2.8
     */
    public enum TimeFormat
    {
        /** A time format, no date. */
        TIME,
<<<<<<< HEAD
        
        /** A date format, no time. */
        DATE,
        
=======

        /** A date format, no time. */
        DATE,

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        /** A date+time format. */
        DATETIME
    }
}
