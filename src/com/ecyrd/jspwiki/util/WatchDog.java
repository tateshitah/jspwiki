/*
  JSPWiki - a JSP-based WikiWiki clone.

  Copyright (C) 2005 Janne Jalkanen (Janne.Jalkanen@iki.fi)

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
package com.ecyrd.jspwiki.util;

import java.lang.ref.WeakReference;
import java.util.*;

import org.apache.log4j.Logger;

import com.ecyrd.jspwiki.WikiEngine;

/**
 *  WatchDog is a general system watchdog.  You can attach any Watchable
 *  or a Thread object to it, and it will notify you if a timeout has been
 *  exceeded.
 *  <p>
 *  The notification of the timeouts is done from a separate WatchDog thread,
 *  of which there is one per watched thread.  This Thread is named 'WatchDog for
 *  XXX', where XXX is your Thread name.
 *  <p>
 *  The suggested method of obtaining a WatchDog is via the static factory
 *  method, since it will return you the correct watchdog for the current
 *  thread.  However, we do not prevent you from creating your own watchdogs
 *  either.
 *  <p>
 *  If you create a WatchDog for a Thread, the WatchDog will figure out when
 *  the Thread is dead, and will stop itself accordingly.  However, this object
 *  is not automatically released, so you might want to check it out after a while.
 *
 *  @author Janne Jalkanen
 *  @since  2.4.92
 */
public final class WatchDog
{
    private Watchable m_watchable;
    private Stack     m_stateStack = new Stack();
    private boolean   m_enabled    = true;
    private WikiEngine m_engine;

    private static Logger log = Logger.getLogger(WatchDog.class.getName());

    private static HashMap              c_kennel = new HashMap();
    private static WikiBackgroundThread c_watcherThread;

    /**
     *  Returns the current watchdog for the current thread. This
     *  is the preferred method of getting you a Watchdog, since it
     *  keeps an internal list of Watchdogs for you so that there
     *  won't be more than one watchdog per thread.
     *
     *  @param engine The WikiEngine to which the Watchdog should
     *                be bonded to.
     *  @return A usable WatchDog object.
     */
    public static WatchDog getCurrentWatchDog( WikiEngine engine )
    {
        Thread t = Thread.currentThread();
        WatchDog wd = null;

        WeakReference w = (WeakReference)c_kennel.get( new Integer(t.hashCode()) );

        if( w != null ) wd = (WatchDog)w.get();

        if( w == null || wd == null )
        {
            wd = new WatchDog( engine, t );
            w = new WeakReference(wd);

            synchronized( c_kennel )
            {
                c_kennel.put( new Integer(t.hashCode()), w );
            }
        }

        return wd;
    }

    /**
     *  Creates a new WatchDog for a Watchable.
     *
     *  @param engine  The WikiEngine.
     *  @param watch   A Watchable object.
     */
    public WatchDog(WikiEngine engine, Watchable watch)
    {
        m_engine    = engine;
        m_watchable = watch;

        synchronized(this.getClass())
        {
            if( c_watcherThread == null )
            {
                c_watcherThread = new WatchDogThread( engine );

                c_watcherThread.start();
            }
        }
    }

    /**
     *  Creates a new WatchDog for a Thread.  The Thread is wrapped
     *  in a Watchable wrapper for this purpose.
     *
     *  @param engine The WikiEngine
     *  @param thread A Thread for watching.
     */
    public WatchDog(WikiEngine engine, Thread thread)
    {
        this( engine, new ThreadWrapper(thread) );
    }

    /**
     *  Hopefully finalizes this properly.  This is rather untested
     *  for now...
     */
    private static void scrub()
    {
        synchronized( c_kennel )
        {
            for( Iterator i = c_kennel.entrySet().iterator(); i.hasNext(); )
            {
                Map.Entry e = (Map.Entry) i.next();

                WeakReference w = (WeakReference) e.getValue();

                //
                //  Remove expired as well
                //
                if( w.get() == null )
                {
                    c_kennel.remove( e.getKey() );
                    scrub();
                    break;
                }
            }
        }
    }

    /**
     *  Can be used to enable the WatchDog.  Will cause a new
     *  Thread to be created, if none was existing previously.
     *
     */
    public void enable()
    {
        synchronized(this.getClass())
        {
            if( !m_enabled )
            {
                m_enabled = true;
                c_watcherThread = new WatchDogThread( m_engine );
                c_watcherThread.start();
            }
        }
    }

    /**
     *  Is used to disable a WatchDog.  The watchdog thread is
     *  shut down and resources released.
     *
     */
    public void disable()
    {
        synchronized(this.getClass())
        {
            if( m_enabled )
            {
                m_enabled = false;
                c_watcherThread.shutdown();
                c_watcherThread = null;
            }
        }
    }

    /**
     *  Enters a watched state with no expectation of the expected completion time.
     *  In practice this method is used when you have no idea, but would like to figure
     *  out, e.g. via debugging, where exactly your Watchable is.
     *
     *  @param state A free-form string description of your state.
     */
    public void enterState( String state )
    {
        enterState( state, Integer.MAX_VALUE );
    }

    /**
     *  Enters a watched state which has an expected completion time.  This is the
     *  main method for using the WatchDog.  For example:
     *
     *  <code>
     *     WatchDog w = m_engine.getCurrentWatchDog();
     *     w.enterState("Processing Foobar", 60);
     *     foobar();
     *     w.exitState();
     *  </code>
     *
     *  If the call to foobar() takes more than 60 seconds, you will receive an
     *  ERROR in the log stream.
     *
     *  @param state A free-form string description of the state
     *  @param expectedCompletionTime The timeout in seconds.
     */
    public void enterState( String state, int expectedCompletionTime )
    {
        if( log.isDebugEnabled() )
            log.debug( m_watchable.getName()+": Entering state "+state+", expected completion in "+expectedCompletionTime+" s");

        synchronized( m_stateStack )
        {
            State st = new State( state, expectedCompletionTime );

            m_stateStack.push( st );
        }
    }

    /**
     *  Exits a state entered with enterState().  This method does not check
     *  that the state is correct, it'll just pop out whatever is on the top
     *  of the state stack.
     *
     */
    public void exitState()
    {
        exitState(null);
    }

    /**
     *  Exits a particular state entered with enterState().  The state is
     *  checked against the current state, and if they do not match, an error
     *  is flagged.
     *
     *  @param state The state you wish to exit.
     */
    public void exitState( String state )
    {
        try
        {
            synchronized( m_stateStack )
            {
                State st = (State)m_stateStack.peek();

                if( state == null || st.getState().equals(state) )
                {
                    m_stateStack.pop();

                    if( log.isDebugEnabled() )
                        log.debug(m_watchable.getName()+": Exiting state "+st.getState());
                }
                else
                {
                    // FIXME: should actually go and fix things for that
                    log.error("exitState() called before enterState()");
                }
            }
        }
        catch( EmptyStackException e )
        {
            log.error("Stack is empty!", e);
        }

    }

    private void check()
    {
        if( log.isDebugEnabled() ) log.debug("Checking watchdog '"+m_watchable.getName()+"'");

        synchronized( m_stateStack )
        {
            try
            {
                WatchDog.State st = (WatchDog.State)m_stateStack.peek();

                long now = System.currentTimeMillis();

                if( now > st.getExpiryTime() )
                {
                    log.info("Watchable '"+m_watchable.getName()+
                             "' exceeded timeout in state '"+
                             st.getState()+
                             "' by "+
                             (now-st.getExpiryTime())/1000+" seconds");

                    m_watchable.timeoutExceeded( st.getState() );
                }
            }
            catch( EmptyStackException e )
            {
                // FIXME: Do something?
            }
        }
    }

    /**
     *  Strictly for debugging/informative purposes.
     *  
     *  @return Random ramblings.
     */
    public String toString()
    {
        synchronized( m_stateStack )
        {
            String state = "Idle";

            try
            {
                State st = (State) m_stateStack.peek();
                state = st.getState();
            }
            catch( EmptyStackException e ) {}
            return "WatchDog state="+state;
        }
    }

    /**
     *  This is the chief watchdog thread.
     *
     *  @author jalkanen
     *
     */
    private static class WatchDogThread extends WikiBackgroundThread
    {
        /** How often the watchdog thread should wake up (in seconds) */
        private static final int CHECK_INTERVAL = 30;

        public WatchDogThread( WikiEngine engine )
        {
            super(engine, CHECK_INTERVAL);
            setName("WatchDog for '"+engine.getApplicationName()+"'");
        }

        public void startupTask()
        {
        }

        public void shutdownTask()
        {
            WatchDog.scrub();
        }

        /**
         *  Checks if the watchable is alive, and if it is, checks if
         *  the stack is finished.
         *
         *  If the watchable has been deleted in the mean time, will
         *  simply shut down itself.
         */
        public void backgroundTask() throws Exception
        {
            synchronized( c_kennel )
            {
                for( Iterator i = c_kennel.entrySet().iterator(); i.hasNext(); )
                {
                    Map.Entry entry = (Map.Entry) i.next();

                    WeakReference wr = (WeakReference) entry.getValue();

                    WatchDog w = (WatchDog) wr.get();

                    if( w != null )
                    {
                        if( w.m_watchable != null && w.m_watchable.isAlive() )
                        {
                            w.check();
                        }
                        else
                        {
                            c_kennel.remove( entry.getKey() );
                            break;
                        }
                    }
                } // for
            } // synchronized

            WatchDog.scrub();
        }
    }

    /**
     *  A class which just stores the state in our State stack.
     *
     *  @author Janne Jalkanen
     */
    private static class State
    {
        protected String m_state;
        protected long   m_enterTime;
        protected long   m_expiryTime;

        protected State( String state, int expiry )
        {
            m_state      = state;
            m_enterTime  = System.currentTimeMillis();
            m_expiryTime = m_enterTime + (expiry * 1000L);
        }

        protected String getState()
        {
            return m_state;
        }

        protected long getExpiryTime()
        {
            return m_expiryTime;
        }
    }

    /**
     *  This class wraps a Thread so that it can become Watchable.
     *
     *  @author Janne Jalkanen
     *
     */
    private static class ThreadWrapper implements Watchable
    {
        private Thread m_thread;

        public ThreadWrapper( Thread thread )
        {
            m_thread = thread;
        }

        public void timeoutExceeded( String state )
        {
            // TODO: Figure out something sane to do here.
        }

        public String getName()
        {
            return m_thread.getName();
        }

        public boolean isAlive()
        {
            return m_thread.isAlive();
        }
    }
}
