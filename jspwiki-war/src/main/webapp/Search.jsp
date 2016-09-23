<%--
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
--%>

<%@ page import="org.apache.log4j.*" %>
<%@ page import="org.apache.wiki.*" %>
<%@ page import="org.apache.wiki.auth.*" %>
<%@ page import="org.apache.wiki.auth.permissions.*" %>
<%@ page import="org.apache.wiki.preferences.Preferences" %>
<%@ page import="org.apache.wiki.util.TextUtil" %>
<%@ page import="org.apache.wiki.search.*" %>
<%@ page import="java.util.*" %>
<%@ page errorPage="/Error.jsp" %>
<%@ taglib uri="http://jspwiki.apache.org/tags" prefix="wiki" %>

<<<<<<< HEAD
<%! 
=======
<%!
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    Logger log = Logger.getLogger("JSPWikiSearch");
%>

<%
    WikiEngine wiki = WikiEngine.getInstance( getServletConfig() );
    // Create wiki context and check for authorization
    WikiContext wikiContext = wiki.createContext( request, WikiContext.FIND );
    if(!wiki.getAuthorizationManager().hasAccess( wikiContext, response )) return;
    String pagereq = wikiContext.getName();

    // Get the search results
    Collection list = null;
    String query = request.getParameter( "query");
    String go    = request.getParameter("go");
<<<<<<< HEAD
    
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    if( query != null )
    {
        log.info("Searching for string "+query);

        try
        {
<<<<<<< HEAD
            list = wiki.findPages( query );

            //
            //  Filter down to only those that we actually have a permission to view
            //
            AuthorizationManager mgr = wiki.getAuthorizationManager();
        
            ArrayList filteredList = new ArrayList();
            
            for( Iterator i = list.iterator(); i.hasNext(); )
            {
                SearchResult r = (SearchResult)i.next();
            
                WikiPage p = r.getPage();
            
                PagePermission pp = new PagePermission( p, PagePermission.VIEW_ACTION );

                try
                {            
                    if( mgr.checkPermission( wikiContext.getWikiSession(), pp ) )
                    {
                        filteredList.add( r );
                    }
                }
                catch( Exception e ) { log.error( "Searching for page "+p, e ); }
            }
        
            pageContext.setAttribute( "searchresults",
                                      filteredList,
=======
            list = wiki.findPages( query, wikiContext );

            pageContext.setAttribute( "searchresults",
                                      list,
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                                      PageContext.REQUEST_SCOPE );
        }
        catch( Exception e )
        {
            wikiContext.getWikiSession().addMessage( e.getMessage() );
        }
<<<<<<< HEAD
        
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        query = TextUtil.replaceEntities( query );

        pageContext.setAttribute( "query",
                                  query,
                                  PageContext.REQUEST_SCOPE );
<<<<<<< HEAD
        
        //
        //  Did the user click on "go"?
        //           
=======

        //
        //  Did the user click on "go"?
        //
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        if( go != null )
        {
            if( list != null && list.size() > 0 )
            {
                SearchResult sr = (SearchResult) list.iterator().next();
<<<<<<< HEAD
                
                WikiPage wikiPage = sr.getPage();
                
                String url = wikiContext.getViewURL( wikiPage.getName() );
                
                response.sendRedirect( url );
                
                return;
            }
        }                              
=======

                WikiPage wikiPage = sr.getPage();

                String url = wikiContext.getViewURL( wikiPage.getName() );

                response.sendRedirect( url );

                return;
            }
        }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    }

    // Set the content type and include the response content
    response.setContentType("text/html; charset="+wiki.getContentEncoding() );
    String contentPage = wiki.getTemplateManager().findJSP( pageContext,
                                                            wikiContext.getTemplate(),
                                                            "ViewTemplate.jsp" );
%><wiki:Include page="<%=contentPage%>" /><%
    log.debug("SEARCH COMPLETE");
%>
