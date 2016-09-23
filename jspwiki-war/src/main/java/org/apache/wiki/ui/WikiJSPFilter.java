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
package org.apache.wiki.ui;

import java.io.ByteArrayOutputStream;
<<<<<<< HEAD
import java.io.CharArrayWriter;
=======
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.NDC;
import org.apache.wiki.WatchDog;
import org.apache.wiki.WikiContext;
import org.apache.wiki.WikiEngine;
import org.apache.wiki.event.WikiEventManager;
import org.apache.wiki.event.WikiPageEvent;
import org.apache.wiki.url.DefaultURLConstructor;
import org.apache.wiki.util.TextUtil;
<<<<<<< HEAD
import org.apache.wiki.util.UtilJ2eeCompat;
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

/**
 * This filter goes through the generated page response prior and
 * places requested resources at the appropriate inclusion markers.
 * This is done to let dynamic content (e.g. plugins, editors) 
 * include custom resources, even after the HTML head section is
 * in fact built. This filter is typically the last filter to execute,
 * and it <em>must</em> run after servlet or JSP code that performs
 * redirections or sends error codes (such as access control methods).
 * <p>
 * Inclusion markers are placed by the IncludeResourcesTag; the
<<<<<<< HEAD
 * defult content templates (see .../templates/default/commonheader.jsp)
=======
 * default content templates (see .../templates/default/commonheader.jsp)
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
 * are configured to do this. As an example, a JavaScript resource marker
 * is added like this:
 * <pre>
 * &lt;wiki:IncludeResources type="script"/&gt;
 * </pre>
 * Any code that requires special resources must register a resource
 * request with the TemplateManager. For example:
 * <pre>
 * &lt;wiki:RequestResource type="script" path="scripts/custom.js" /&gt;
 * </pre>
 * or programmatically,
 * <pre>
 * TemplateManager.addResourceRequest( context, TemplateManager.RESOURCE_SCRIPT, "scripts/customresource.js" );
 * </pre>
 * 
 * @see TemplateManager
 * @see org.apache.wiki.tags.RequestResourceTag
 */
public class WikiJSPFilter extends WikiServletFilter
{
<<<<<<< HEAD
    private Boolean m_useOutputStream;
    private String m_wiki_encoding;
=======
    private String m_wiki_encoding;
    private boolean useEncoding;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    /** {@inheritDoc} */
    public void init( FilterConfig config ) throws ServletException
    {
        super.init( config );
        m_wiki_encoding = m_engine.getWikiProperties().getProperty(WikiEngine.PROP_ENCODING);
<<<<<<< HEAD
        ServletContext context = config.getServletContext();
        m_useOutputStream = UtilJ2eeCompat.useOutputStream( context.getServerInfo() );
=======
        
        useEncoding =  !(new Boolean(m_engine.getWikiProperties().getProperty(WikiEngine.PROP_NO_FILTER_ENCODING, "false").trim()).booleanValue());
        
        ServletContext context = config.getServletContext();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    }

    public void doFilter( ServletRequest  request, ServletResponse response, FilterChain chain )
        throws ServletException, IOException
    {
        WatchDog w = m_engine.getCurrentWatchDog();
        try
        {
            NDC.push( m_engine.getApplicationName()+":"+((HttpServletRequest)request).getRequestURI() );

            w.enterState("Filtering for URL "+((HttpServletRequest)request).getRequestURI(), 90 );
            HttpServletResponseWrapper responseWrapper;
         
<<<<<<< HEAD
            if( m_useOutputStream )
            {
                log.debug( "Using ByteArrayResponseWrapper" );
                responseWrapper = new ByteArrayResponseWrapper( (HttpServletResponse)response, m_wiki_encoding );
            }
            else
            {
                log.debug( "Using MyServletResponseWrapper" );
                responseWrapper = new MyServletResponseWrapper( (HttpServletResponse)response, m_wiki_encoding );
            }
=======
            responseWrapper = new MyServletResponseWrapper( (HttpServletResponse)response, m_wiki_encoding, useEncoding);
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        
            // fire PAGE_REQUESTED event
            String pagename = DefaultURLConstructor.parsePageFromURL(
                    (HttpServletRequest)request, response.getCharacterEncoding() );
            fireEvent( WikiPageEvent.PAGE_REQUESTED, pagename );

            super.doFilter( request, responseWrapper, chain );

            // The response is now complete. Lets replace the markers now.
        
            // WikiContext is only available after doFilter! (That is after
            //   interpreting the jsp)

            try
            {
                w.enterState( "Delivering response", 30 );
                WikiContext wikiContext = getWikiContext( request );
                String r = filter( wikiContext, responseWrapper );
                
<<<<<<< HEAD
                if (m_useOutputStream) 
=======
                if (useEncoding) 
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                {
                    OutputStreamWriter out = new OutputStreamWriter(response.getOutputStream(), 
                                                                    response.getCharacterEncoding());
                    out.write(r);
                    out.flush();
                    out.close();
                }
                else 
                {
                    response.getWriter().write(r);
                }
            
                // Clean up the UI messages and loggers
                if( wikiContext != null )
                {
                    wikiContext.getWikiSession().clearMessages();
                }

                // fire PAGE_DELIVERED event
                fireEvent( WikiPageEvent.PAGE_DELIVERED, pagename );

            }
            finally
            {
                w.exitState();
            }
        }
        finally
        {
            w.exitState();
            NDC.pop();
            NDC.remove();
        }
    }

    /**
     * Goes through all types and writes the appropriate response.
     * 
     * @param wikiContext The usual processing context
     * @param response The source string
     * @return The modified string with all the insertions in place.
     */
    private String filter(WikiContext wikiContext, HttpServletResponse response )
    {
        String string = response.toString();

        if( wikiContext != null )
        {
            String[] resourceTypes = TemplateManager.getResourceTypes( wikiContext );

            for( int i = 0; i < resourceTypes.length; i++ )
            {
                string = insertResources( wikiContext, string, resourceTypes[i] );
            }
        
            //
            //  Add HTTP header Resource Requests
            //
            String[] headers = TemplateManager.getResourceRequests( wikiContext,
                                                                    TemplateManager.RESOURCE_HTTPHEADER );
        
            for( int i = 0; i < headers.length; i++ )
            {
                String key = headers[i];
                String value = "";
                int split = headers[i].indexOf(':');
                if( split > 0 && split < headers[i].length()-1 )
                {
                    key = headers[i].substring( 0, split );
                    value = headers[i].substring( split+1 );
                }
            
                response.addHeader( key.trim(), value.trim() );
            }
        }

        return string;
    }

    /**
     *  Inserts whatever resources
     *  were requested by any plugins or other components for this particular
     *  type.
     *  
     *  @param wikiContext The usual processing context
     *  @param string The source string
     *  @param type Type identifier for insertion
     *  @return The filtered string.
     */
    private String insertResources(WikiContext wikiContext, String string, String type )
    {
        if( wikiContext == null )
        {
            return string;
        }

        String marker = TemplateManager.getMarker( wikiContext, type );
        int idx = string.indexOf( marker );
        
        if( idx == -1 )
        {
            return string;
        }
        
        log.debug("...Inserting...");
        
        String[] resources = TemplateManager.getResourceRequests( wikiContext, type );
        
<<<<<<< HEAD
        StringBuffer concat = new StringBuffer( resources.length * 40 );
=======
        StringBuilder concat = new StringBuilder( resources.length * 40 );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        
        for( int i = 0; i < resources.length; i++  )
        {
            log.debug("...:::"+resources[i]);
            concat.append( resources[i] );
        }

        string = TextUtil.replaceString( string, 
                                         idx, 
                                         idx+marker.length(), 
                                         concat.toString() );
        
        return string;
    }
    
    /**
     *  Simple response wrapper that just allows us to gobble through the entire
     *  response before it's output.
     */
    private static class MyServletResponseWrapper
        extends HttpServletResponseWrapper
    {
<<<<<<< HEAD
        private CharArrayWriter m_output;
        private MyServletOutputStream m_servletOut;
        private PrintWriter m_writer;
      
=======
        ByteArrayOutputStream m_output;
        private MyServletOutputStream m_servletOut;
        private PrintWriter m_writer;
        private HttpServletResponse m_response;
        private boolean useEncoding;
        
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        /** 
         *  How large the initial buffer should be.  This should be tuned to achieve
         *  a balance in speed and memory consumption.
         */
<<<<<<< HEAD
        private static final int INIT_BUFFER_SIZE = 4096;
        
        public MyServletResponseWrapper( HttpServletResponse r, final String wiki_encoding )
                throws UnsupportedEncodingException {
            super(r);
            m_output = new CharArrayWriter( INIT_BUFFER_SIZE );
            m_servletOut = new MyServletOutputStream(m_output);
            m_writer = new PrintWriter(new OutputStreamWriter(m_servletOut, wiki_encoding), true);
=======
        private static final int INIT_BUFFER_SIZE = 0x8000;
   
        
        public MyServletResponseWrapper( HttpServletResponse r, final String wiki_encoding, boolean useEncoding)
                throws UnsupportedEncodingException {
            super(r);
            m_output = new ByteArrayOutputStream(INIT_BUFFER_SIZE);
            m_servletOut = new MyServletOutputStream(m_output);
            m_writer = new PrintWriter(new OutputStreamWriter(m_servletOut, wiki_encoding), true);
            this.useEncoding = useEncoding;
            
            m_response = r;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        }

        /**
         *  Returns a writer for output; this wraps the internal buffer
         *  into a PrintWriter.
         */
        public PrintWriter getWriter()
        {
            return m_writer;
        }

        public ServletOutputStream getOutputStream()
        {
            return m_servletOut;
        }
        
        public void flushBuffer() throws IOException
        {
            m_writer.flush();
            super.flushBuffer();
        }

        class MyServletOutputStream extends ServletOutputStream
        {
<<<<<<< HEAD
            CharArrayWriter m_buffer;

            public MyServletOutputStream(CharArrayWriter aCharArrayWriter)
            {
                super();
                m_buffer = aCharArrayWriter;
=======
            ByteArrayOutputStream m_buffer;

            public MyServletOutputStream(ByteArrayOutputStream byteArrayOutputStream)
            {
                super();
                m_buffer = byteArrayOutputStream;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            }

            @Override
            public void write(int aInt) throws IOException
            {
                m_buffer.write( aInt );
            }
        }
        
        /**
         *  Returns whatever was written so far into the Writer.
         */
        public String toString()
        {
            try
<<<<<<< HEAD
            {
                flushBuffer();
            }
            catch( IOException e )
            {
                log.error( MyServletResponseWrapper.class + " toString() flushBuffer() Failed", e );
                return StringUtils.EMPTY;
            }
            
            return m_output.toString();
        }
    }

    /**
     *  Response wrapper for application servers which do not work with CharArrayWriter
     *  Currently only OC4J
     */
    private static class ByteArrayResponseWrapper
        extends HttpServletResponseWrapper
    {
        private HttpServletResponse m_response;
        
        private ByteArrayOutputStream m_output;
        private MyServletOutputStream m_servletOut;
        private PrintWriter m_writer;
      
        /** 
         *  How large the initial buffer should be.  This should be tuned to achieve
         *  a balance in speed and memory consumption.
         */
        private static final int INIT_BUFFER_SIZE = 4096;
        
        public ByteArrayResponseWrapper( HttpServletResponse r, final String wiki_encoding )
                throws UnsupportedEncodingException {
            super(r);
            m_output = new ByteArrayOutputStream( INIT_BUFFER_SIZE );
            m_servletOut = new MyServletOutputStream(m_output);
            m_writer = new PrintWriter(new OutputStreamWriter(m_servletOut, wiki_encoding), true);
            m_response = r;
        }
        
        /**
         *  Returns a writer for output; this wraps the internal buffer
         *  into a PrintWriter.
         */
        public PrintWriter getWriter()
        {
            return m_writer;
        }

        public ServletOutputStream getOutputStream()
        {
            return m_servletOut;
        }
        
        public void flushBuffer() throws IOException
        {
            m_writer.flush();
            super.flushBuffer();
        }

        class MyServletOutputStream extends ServletOutputStream
        {
            private OutputStream m_stream;

            public MyServletOutputStream( OutputStream aOutput )
            {
                super();
                m_stream = aOutput;
            }

            @Override
            public void write(int aInt) throws IOException
            {
                m_stream.write( aInt );
            }
        }
        
        /**
         *  Returns whatever was written so far into the Writer.
         */
        public String toString()
        {
            try
            {
                flushBuffer();
                return m_output.toString( m_response.getCharacterEncoding() );
            }
            catch( UnsupportedEncodingException e )
            {
                log.error( ByteArrayResponseWrapper.class + " Unsupported Encoding", e );
                return StringUtils.EMPTY;
            }
            catch( IOException e )
            {
                log.error( ByteArrayResponseWrapper.class + " toString() Flush Failed", e );
                return StringUtils.EMPTY;
            }
        }
    }

=======
			{
				flushBuffer();
			} catch (IOException e)
			{
                log.error( e );
                return StringUtils.EMPTY;
			}

            try
			{
				if (useEncoding)
				{
					return m_output.toString(m_response.getCharacterEncoding());
				}

				return m_output.toString();
			}                
            catch( UnsupportedEncodingException e )
            {
                log.error( e );
                return StringUtils.EMPTY;
             }
        }
    }


>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    // events processing .......................................................


    /**
     *  Fires a WikiPageEvent of the provided type and page name
     *  to all registered listeners of the current WikiEngine.
     *
     * @see org.apache.wiki.event.WikiPageEvent
     * @param type       the event type to be fired
     * @param pagename   the wiki page name as a String
     */
    protected final void fireEvent( int type, String pagename )
    {
        if ( WikiEventManager.isListening(m_engine) )
        {
            WikiEventManager.fireEvent(m_engine,new WikiPageEvent(m_engine,type,pagename));
        }
    }

}
