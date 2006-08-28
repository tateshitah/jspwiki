/*
    JSPWiki - a JSP-based WikiWiki clone.

    Copyright (C) 2001-2006 Janne Jalkanen (Janne.Jalkanen@iki.fi)

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

package com.ecyrd.jspwiki.event;


/**
  * WikiPageEvent indicates a change in the state or processing of a WikiPage.
  * There are basically two types of page events:
  * <dl>
  *   <dt><b>Phase Boundary Events</b></dt>
  *   <dd>Those considered as "beginning-of-phase", and those as "end-of-phase"
  *       events (as designated by <tt>*_BEGIN</tt> and <tt>*_END</tt>), as
  *       generated by the WikiEngine. The phases include pre-save, post-save,
  *       pre-translate, and post-translate.
  *   </dd>
  *   <dt><b>In-Phase Events</b></dt>
  *   <dd>In-phase events are generated as specific events from the
  *       PageEventFilter (or elsewhere), on a per-listener basis. There may
  *       be many such events during a particular phase.
  *   </dd>
  * </dl>
  * <p>
  * E.g., a typical event sequence for the pre-translate phase would be:
  * </p>
  * <ol>
  *  <li>PRE_TRANSLATE_BEGIN</li>
  *  <li>PRE_TRANSLATE</li>
  *  <li>PRE_TRANSLATE</li>
  *  <li>...</li>
  *  <li>PRE_TRANSLATE_END</li>
  * </ol>
  *
  * <h2>Notes</h2>
  *
  * <h3>Page Requested and Delivered Events</h3>
  * <p>
  * These two events are fired once per page request, at the beginning
  * and after delivery of the page (respectively). They are generated
  * by the {@link com.ecyrd.jspwiki.ui.WikiServletFilter}.
  * </p>
  *
  * <h3>Page Lock and Unlock Events</h3>
  * <p>
  * Page lock and unlock events occur only once during an editing session,
  * so there are no begin and end events. They are generated
  * by the {@link com.ecyrd.jspwiki.PageManager}.
  * </p>
  *
  * <h3>WikiPageEvents</h3>
  * <p>
  * Other WikiPageEvents include both <i>phase boundary</i> and <i>in-phase</i>
  * events for saving, pre- and post-translating content. These are very noisy 
  * event types, but are not fired unless a listener is available. They are
  * generated by the {@link com.ecyrd.jspwiki.filters.FilterManager}, 
  * {@link com.ecyrd.jspwiki.event.PageEventFilter}, and potentially other 
  * implementing classes.
  * </p>
  *
  * <h3>Firing Order and Phase Boundaries</h3>
  * <p>
  * Note that due to the asynchronous nature of event processing, any threads
  * spawned by such events will not necessarily have completed during their
  * specific phase; we can assume only that no more events of that phase will
  * be fired after its <tt>*_END</tt> event has been fired.
  * </p>
  *
  * @author  Murray Altheim
  * @version $Id: WikiPageEvent.java,v 1.1.2.1 2006-08-28 21:47:36 jalkanen Exp $
  * @see     com.ecyrd.jspwiki.event.WikiEvent
  * @since   2.4.20
  */
public class WikiPageEvent extends WikiEvent
{
    // PAGE LOCKING EVENTS ...

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    /** Indicates a page lock event. This is based on events
      * generated by {@link com.ecyrd.jspwiki.PageManager}. */
    public static final int PAGE_LOCK            = 10;

    /** Indicates a page unlock event. This is based on events
      * generated by {@link com.ecyrd.jspwiki.PageManager}. */
    public static final int PAGE_UNLOCK          = 11;

    // PRE_TRANSLATE .........

    /** Indicates the beginning of all wiki pre-translate page events. This is based
      * on events generated by {@link com.ecyrd.jspwiki.filters.FilterManager}. */
    public static final int PRE_TRANSLATE_BEGIN  = 12;

    /** Indicates a wiki pre-translate page event. This is based on events
      * generated by {@link com.ecyrd.jspwiki.event.PageEventFilter}. */
    public static final int PRE_TRANSLATE        = 13;

    /** Indicates the end of all wiki pre-translate page events. This is based
      * on events generated by {@link com.ecyrd.jspwiki.filters.FilterManager}. */
    public static final int PRE_TRANSLATE_END    = 14;

    // POST_TRANSLATE ........

    /** Indicates the beginning of all wiki post-translate page events. This is based
      * on events generated by {@link com.ecyrd.jspwiki.filters.FilterManager}. */
    public static final int POST_TRANSLATE_BEGIN = 15;

    /** Indicates a wiki post-translate page event. This is based on events
      * generated by {@link com.ecyrd.jspwiki.event.PageEventFilter}. */
    public static final int POST_TRANSLATE       = 16;

    /** Indicates the end of all wiki post-translate page events. This is based
      * on events generated by {@link com.ecyrd.jspwiki.filters.FilterManager}. */
    public static final int POST_TRANSLATE_END   = 17;

    // PRE_SAVE ..............

    /** Indicates the beginning of all wiki pre-save page events. This is based
      * on events generated by {@link com.ecyrd.jspwiki.filters.FilterManager}. */
    public static final int PRE_SAVE_BEGIN       = 18;

    /** Indicates a wiki pre-save page event. This is based on events
      * generated by {@link com.ecyrd.jspwiki.event.PageEventFilter}. */
    public static final int PRE_SAVE             = 19;

    /** Indicates the end of all wiki pre-save page events. This is based
      * on events generated by {@link com.ecyrd.jspwiki.filters.FilterManager}. */
    public static final int PRE_SAVE_END         = 20;

    // POST_SAVE .............

    /** Indicates the beginning of all wiki post-save page events. This is based
      * on events generated by {@link com.ecyrd.jspwiki.filters.FilterManager}. */
    public static final int POST_SAVE_BEGIN      = 21;

    /** Indicates a wiki post-save page event. This is based on events
      * generated by {@link com.ecyrd.jspwiki.event.PageEventFilter}. */
    public static final int POST_SAVE            = 22;

    /** Indicates the end of all wiki post-save page events. This is based
      * on events generated by {@link com.ecyrd.jspwiki.filters.FilterManager}. */
    public static final int POST_SAVE_END        = 23;

    // PAGE REQUESTS .........

    /** Indicates a wiki page request event (the start of a request). This is based
      * on events generated by {@link com.ecyrd.jspwiki.ui.WikiServletFilter}. */
    public static final int PAGE_REQUESTED       = 24;

    /** Indicates a wiki page delivery event (the end of a request). This is based
      * on events generated by {@link com.ecyrd.jspwiki.ui.WikiServletFilter}. */
    public static final int PAGE_DELIVERED       = 25;

    private String m_pagename     = null;

    // ............


    /**
      * Constructs an instance of this event.
      * @param source    the Object that is the source of the event.
      * @param type      the type of the event (see the enumerated int values defined
      *                  in {@link com.ecyrd.jspwiki.event.WikiEvent}).
      * @param pagename  the WikiPage being acted upon.
      */
    public WikiPageEvent( Object source, int type, String pagename )
    {
        super( source, type );
        m_pagename = pagename;
    }


   /**
     * Sets the type of this event.
     *
     * @param type      the type of this WikiPageEvent.
     */
    protected void setType( int type )
    {
        if ( isValidType(type) )
        {
            super.setType(type);
        }
        else
        {
            super.setType(ERROR);
        }
    }


   /**
     * Returns the Wiki page name associated with this event.
     * This may be null if unavailable.
     *
     * @return     the Wiki page name associated with this WikiEvent, or null.
     */
    public String getPageName()
    {
        return m_pagename;
    }


   /**
     * Returns true if the int value is a WikiPageEvent type.
     */
    public static boolean isValidType( int type )
    {
        return ( type >= PAGE_LOCK && type <= PAGE_DELIVERED );
    }


    /**
     * Returns a textual representation of the event type.
     * @return a String representation of the type
     */
    public final String eventName()
    {
        switch ( getType() )
        {
            case PAGE_LOCK:            return "PAGE_LOCK";
            case PAGE_UNLOCK:          return "PAGE_UNLOCK";

            case PRE_TRANSLATE_BEGIN:  return "PRE_TRANSLATE_BEGIN";
            case PRE_TRANSLATE:        return "PRE_TRANSLATE";
            case PRE_TRANSLATE_END:    return "PRE_TRANSLATE_END";

            case POST_TRANSLATE_BEGIN: return "POST_TRANSLATE_BEGIN";
            case POST_TRANSLATE:       return "POST_TRANSLATE";
            case POST_TRANSLATE_END:   return "POST_TRANSLATE_END";

            case PRE_SAVE_BEGIN:       return "PRE_SAVE_BEGIN";
            case PRE_SAVE:             return "PRE_SAVE";
            case PRE_SAVE_END:         return "PRE_SAVE_END";

            case POST_SAVE_BEGIN:      return "POST_SAVE_BEGIN";
            case POST_SAVE:            return "POST_SAVE";
            case POST_SAVE_END:        return "POST_SAVE_END";

            case PAGE_REQUESTED:       return "PAGE_REQUESTED";
            case PAGE_DELIVERED:       return "PAGE_DELIVERED";     

            default:                   return super.eventName();
        }
    }


   /** Returns a human-readable description of the event type.
     * @return a String description of the type
     */
    public final String getTypeDescription()
    {
        switch ( getType() )
        {
            case PAGE_LOCK:            return "page lock event";
            case PAGE_UNLOCK:          return "page unlock event";

            case PRE_TRANSLATE_BEGIN:  return "begin page pre-translate events";
            case PRE_TRANSLATE:        return "page pre-translate event";
            case PRE_TRANSLATE_END:    return "end of page pre-translate events";

            case POST_TRANSLATE_BEGIN: return "begin page post-translate events";
            case POST_TRANSLATE:       return "page post-translate event";
            case POST_TRANSLATE_END:   return "end of page post-translate events";

            case PRE_SAVE_BEGIN:       return "begin page pre-save events";
            case PRE_SAVE:             return "page pre-save event";
            case PRE_SAVE_END:         return "end of page pre-save events";

            case POST_SAVE_BEGIN:      return "begin page post-save events";
            case POST_SAVE:            return "page post-save event";
            case POST_SAVE_END:        return "end of page post-save events";

            case PAGE_REQUESTED:        return "page requested event";
            case PAGE_DELIVERED:        return "page delivered event";     

            default:                   return super.getTypeDescription();
        }
    }

} // end class com.ecyrd.jspwiki.event.WikiPageEvent
