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

<%@ taglib uri="http://jspwiki.apache.org/tags" prefix="wiki" %>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="org.apache.log4j.*" %>
<%@ page import="org.apache.wiki.*" %>
<%@ page import="org.apache.wiki.auth.*" %>
<%@ page import="org.apache.wiki.auth.permissions.*" %>
<%@ page import="org.apache.wiki.preferences.Preferences" %>
<%@ page import="org.apache.wiki.search.SearchResult" %>
<%@ page import="org.apache.wiki.ui.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.Collection" %>
<%@ page import="org.apache.commons.lang.*" %>
<%@ page import="java.net.URLEncoder" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page import="javax.servlet.jsp.jstl.fmt.*" %>
<fmt:setLocale value="${prefs.Language}" />
<fmt:setBundle basename="templates.default"/>
<<<<<<< HEAD
<%! 
=======
<%!
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
  public void jspInit()
  {
    wiki = WikiEngine.getInstance( getServletConfig() );
  }
  Logger log = Logger.getLogger("JSPWikiSearch");
  WikiEngine wiki;
%>
<%
  /* ********************* actual start ********************* */
  /* FIXME: too much hackin on this level -- should better happen in toplevel jsp's */
  /* Create wiki context and check for authorization */
  WikiContext wikiContext = wiki.createContext( request, WikiContext.FIND );
  if(!wiki.getAuthorizationManager().hasAccess( wikiContext, response )) return;
<<<<<<< HEAD
 
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
  String query = request.getParameter( "query");

  if( (query != null) && ( !query.trim().equals("") ) )
  {
    try
<<<<<<< HEAD
    { 
      Collection list = wiki.findPages( query );

      //  Filter down to only those that we actually have a permission to view
      AuthorizationManager mgr = wiki.getAuthorizationManager();
  
      ArrayList items = new ArrayList();
      
      for( Iterator i = list.iterator(); i.hasNext(); )
      {
        SearchResult r = (SearchResult)i.next();
    
        WikiPage p = r.getPage();
    
        PagePermission pp = new PagePermission( p, PagePermission.VIEW_ACTION );

        try
        {            
=======
    {
      Collection list = wiki.findPages( query, wikiContext );

      //  Filter down to only those that we actually have a permission to view
      AuthorizationManager mgr = wiki.getAuthorizationManager();

      ArrayList items = new ArrayList();

      for( Iterator i = list.iterator(); i.hasNext(); )
      {
        SearchResult r = (SearchResult)i.next();

        WikiPage p = r.getPage();

        PagePermission pp = new PagePermission( p, PagePermission.VIEW_ACTION );

        try
        {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
          if( mgr.checkPermission( wikiContext.getWikiSession(), pp ) )
          {
            items.add( r );
          }
        }
        catch( Exception e ) { log.error( "Searching for page "+p, e ); }
      }
<<<<<<< HEAD
      
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
      pageContext.setAttribute( "searchresults", items, PageContext.REQUEST_SCOPE );
    }
    catch( Exception e )
    {
       wikiContext.getWikiSession().addMessage( e.getMessage() );
    }
  }
%>
<%
  int startitem = 0; // first item to show
  int maxitems = 20; // number of items to show in result

  String parm_start    = request.getParameter( "start");
  if( parm_start != null ) startitem = Integer.parseInt( parm_start ) ;

  Collection list = (Collection)pageContext.getAttribute( "searchresults", PageContext.REQUEST_SCOPE );
  if( startitem == -1 ) maxitems = list.size(); //show all
%>

<wiki:SearchResults>

  <h4><fmt:message key="find.heading.results"><fmt:param><c:out value="${param.query}"/></fmt:param></fmt:message></h4>

  <p>
  <fmt:message key="find.externalsearch"/>
<<<<<<< HEAD
    <a class="external" 
        href="http://www.google.com/search?q=<c:out value='${param.query}'/>"
        title="Google Search '<c:out value='${param.query}'/>'"
       target="_blank">Google</a><img class="outlink" src="images/out.png" alt="" />
    |     
    <a class="external" 
        href="http://en.wikipedia.org/wiki/Special:Search?search=<c:out value='${param.query}'/>" 
=======
    <a class="external"
        href="http://www.google.com/search?q=<c:out value='${param.query}'/>"
        title="Google Search '<c:out value='${param.query}'/>'"
       target="_blank">Google</a><img class="outlink" src="images/out.png" alt="" />
    |
    <a class="external"
        href="http://en.wikipedia.org/wiki/Special:Search?search=<c:out value='${param.query}'/>"
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        title="Wikipedia Search '<c:out value='${param.query}'/>'"
       target="_blank">Wikipedia</a><img class="outlink" src="images/out.png" alt="" />
  </p>

<<<<<<< HEAD
  <wiki:SetPagination start="${param.start}" total="<%=list.size()%>" pagesize="20" maxlinks="9" 
                     fmtkey="info.pagination"
                    onclick="$('start').value=%s; SearchBox.runfullsearch();" />
  
    <div class="graphBars">
    <div class="zebra-table">
    <table class="wikitable" >
=======
  <wiki:SetPagination start="${param.start}" total="<%=list.size()%>" pagesize="20" maxlinks="9"
                     fmtkey="info.pagination"
                    onclick="$('start').value=%s; SearchBox.runfullsearch();" />

    <div class="graphBars">
    <div class="zebra-table">
    <table class="wikitable  table-striped" >
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

      <tr>
         <th align="left"><fmt:message key="find.results.page"/></th>
         <th align="left"><fmt:message key="find.results.score"/></th>
      </tr>

      <wiki:SearchResultIterator id="searchref" start="${param.start}" maxItems="<%=maxitems%>">
      <tr>
        <td><wiki:LinkTo><wiki:PageName/></wiki:LinkTo></td>
        <td><span class="gBar"><%= searchref.getScore() %></span></td>
      </tr>

	  <c:if test="${param.details == 'on'}">
<%
        String[] contexts = searchref.getContexts();
<<<<<<< HEAD
        if( (contexts != null) && (contexts.length > 0) ) 
        {
%>  
      <tr class="odd" >
        <td colspan="2" >
          <div class="fragment">
<%
          for (int i = 0; i < contexts.length; i++) 
=======
        if( (contexts != null) && (contexts.length > 0) )
        {
%>
      <tr class="odd" >
        <td class="fragment" colspan="2">
<%
          for (int i = 0; i < contexts.length; i++)
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
          {
%>
            <%= (i > 0 ) ? "<span class='fragment_ellipsis'> ... </span>" : ""  %>
            <%= contexts[i]  %>
<%
          }
%>
<<<<<<< HEAD
           </div>
         </td>
       </tr>
<% 
=======
         </td>
       </tr>
<%
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        }
%>
	  </c:if><%-- details --%>
      </wiki:SearchResultIterator>

<<<<<<< HEAD
      <wiki:IfNoSearchResults>
        <tr>
          <td class="nosearchresult" colspan="2"><fmt:message key="find.noresults"/></td>
        </tr>
      </wiki:IfNoSearchResults>

      </table>
=======
      </table>

      <wiki:IfNoSearchResults>
        <p class="warning"><fmt:message key="find.noresults"/></p>
      </wiki:IfNoSearchResults>


>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    </div>
    </div>
    ${pagination}

   </wiki:SearchResults>
