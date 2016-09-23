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
--%>

<%@ taglib uri="http://jspwiki.apache.org/tags" prefix="wiki" %>
<%@ page import="org.apache.wiki.*" %>
<%@ page import="org.apache.wiki.util.TextUtil" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page import="javax.servlet.jsp.jstl.fmt.*" %><%--CHECK why is this needed --%>
<fmt:setLocale value="${prefs.Language}" />
<fmt:setBundle basename="templates.default"/>
<%
	WikiContext c = WikiContext.findContext( pageContext );
   	WikiPage p = c.getPage();
	String pagename = p.getName();
    int thisVersion = p.getVersion();

	/* check possible permalink (blogentry) pages */
	String blogcommentpage="";
	String mainblogpage="";
	if( pagename.indexOf("_blogentry_") != -1 )
	{
		blogcommentpage = TextUtil.replaceString( pagename, "blogentry", "comments" );
		mainblogpage = pagename.substring(0, pagename.indexOf("_blogentry_"));
	}
%>
=======
    under the License.
--%>

<%@ page import="org.apache.wiki.*" %>
<%@ page import="org.apache.wiki.util.TextUtil" %>
<%@ taglib uri="http://jspwiki.apache.org/tags" prefix="wiki" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%--
<%@ page import="javax.servlet.jsp.jstl.fmt.*" %><%--CHECK why is this needed --%>

<fmt:setLocale value="${prefs.Language}" />
<fmt:setBundle basename="templates.default"/>


<c:choose>
<c:when test="${param.tab == 'attach'}">
  <wiki:Include page="AttachmentTab.jsp"/>
</c:when>
<c:otherwise>
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

<%-- If the page is an older version, then offer a note and a possibility
     to restore this version as the latest one. --%>
<wiki:CheckVersion mode="notlatest">
<<<<<<< HEAD
  <form action="<wiki:Link format='url' jsp='Wiki.jsp'/>" 
        method="get"  accept-charset='UTF-8'>

    <input type="hidden" name="page" value="<wiki:Variable var='pagename' />" />     
=======
  <%
    WikiContext c = WikiContext.findContext( pageContext );
  %>
  <c:set var="thisVersion" value="<%= c.getPage().getVersion() %>" />
  <c:set var="latestVersion" value="<%= c.getEngine().getPage( c.getPage().getName(), WikiProvider.LATEST_VERSION ).getVersion() %>" />

  <form action="<wiki:Link format='url' jsp='Wiki.jsp'/>"
        method="get"  accept-charset='UTF-8'>

    <input type="hidden" name="page" value="${param.page}" />
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    <div class="error center">
      <label>
      <fmt:message key="view.oldversion">
        <fmt:param>
          <%--<wiki:PageVersion/>--%>
          <select id="version" name="version" onchange="this.form.submit();" >
<<<<<<< HEAD
<% 
   int latestVersion = c.getEngine().getPage( pagename, WikiProvider.LATEST_VERSION ).getVersion();

   if( thisVersion == WikiProvider.LATEST_VERSION ) thisVersion = latestVersion; //should not happen
     for( int i = 1; i <= latestVersion; i++) 
     {
%> 
          <option value="<%= i %>" <%= ((i==thisVersion) ? "selected='selected'" : "") %> ><%= i %></option>
<%
     }    
%>
          </select>
        </fmt:param>
      </fmt:message>  
      </label>
      <div>
      <a class="btn btn-primary" href="<wiki:Link format='url'/>">
        <fmt:message key="view.backtocurrent"/>
      </a>
      <a class="btn btn-danger" href="<wiki:Link format='url' context='edit' version='<%= Integer.toString(thisVersion) %>'/>">
        <fmt:message key="view.restore"/>
      </a>
      </div>
    </div>

  </form>
</wiki:CheckVersion>

<%-- Inserts no text if there is no page. --%>
<wiki:InsertPage />


<%-- Inserts blogcomment if appropriate 
<% if( !blogpage.equals("") ) { %>
--%>

<% if( ! mainblogpage.equals("") ) { %>
<wiki:PageExists page="<%= mainblogpage%>">

  <% if( ! blogcommentpage.equals("") ) { %>
  <wiki:PageExists page="<%= blogcommentpage%>">
	<div class="weblogcommentstitle"><fmt:message key="blog.commenttitle"/></div>
    <div class="weblogcomments"><wiki:InsertPage page="<%= blogcommentpage%>" /></div>
  </wiki:PageExists>
  <% }; %>
  <div class="information">	
	<wiki:Link page="<%= mainblogpage %>"><fmt:message key="blog.backtomain"/></wiki:Link>&nbsp; &nbsp;
	<wiki:Link context="comment" page="<%= blogcommentpage%>" ><fmt:message key="blog.addcomments"/></wiki:Link>
  </div>

</wiki:PageExists>
<% }; %>

<wiki:NoSuchPage>
  <%-- FIXME: Should also note when a wrong version has been fetched. --%>
  <div class="information" >
  <fmt:message key="common.nopage">
    <fmt:param><wiki:EditLink><fmt:message key="common.createit"/></wiki:EditLink></fmt:param>
  </fmt:message>
  </div>
</wiki:NoSuchPage>
=======
          <c:forEach begin="1" end="${latestVersion == -1 ? thisVersion : latestVersion }" var="version">
            <option value="${version}" ${(thisVersion==version) ? 'selected="selected"':''} >${version}</option>
          </c:forEach>
          </select>
        </fmt:param>
      </fmt:message>
      </label>
      <div>
      <wiki:Link cssClass="btn btn-primary">
        <fmt:message key="view.backtocurrent"/>
      </wiki:Link>
      <wiki:Link cssClass="btn btn-danger" context="edit" version="${thisVersion}">
        <fmt:message key="view.restore"/>
      </wiki:Link>
      </div>
    </div>
  </form>
</wiki:CheckVersion>


<%--
ISWEBLOG= <%= WikiContext.findContext( pageContext ).getPage().getAttribute( /*ATTR_ISWEBLOG*/ "weblogplugin.isweblog" ) %>
--%>
<%--  IF BLOCOMMENT PAGE:  insert back buttons to mainblog and blogentry permalink --%>
<c:set var="mainblogpage" value="${fn:substringBefore(param.page,'_comments_')}" />
<c:if test="${not empty mainblogpage}">
<wiki:PageExists page="${mainblogpage}">
  <p></p>
  <c:set var="blogentrypage" value="${fn:replace(param.page,'_comments_','_blogentry_')}" />
  <div class="pull-right">
      <wiki:Link cssClass="btn btn-xs btn-default"  page="${mainblogpage}" >
         <fmt:message key="blog.backtomain"><fmt:param>${mainblogpage}</fmt:param></fmt:message>
      </wiki:Link>
      <wiki:Link cssClass="btn btn-xs btn-primary" page="${blogentrypage}" >
        <fmt:message key="blog.permalink" />
      </wiki:Link>
  </div>
  <div class="weblogcommentstitle">
    <fmt:message key="blog.commenttitle"/>
  </div>
</wiki:PageExists>
</c:if>

<%-- Inserts no text if there is no page. --%>
<wiki:InsertPage />

<%-- IF BLOGENTRY PAGE: insert blogcomment if appropriate. --%>
<c:set var="mainblogpage" value="${fn:substringBefore(param.page,'_blogentry_')}" />
<c:if test="${not empty mainblogpage}">
<wiki:PageExists page="${mainblogpage}">
  <p></p>
  <c:set var="blogcommentpage" value="${fn:replace(param.page,'_blogentry_','_comments_')}" />
  <div class="pull-right">
      <wiki:Link cssClass="btn btn-xs btn-default"  page="${mainblogpage}" >
         <fmt:message key="blog.backtomain"><fmt:param>${mainblogpage}</fmt:param></fmt:message>
      </wiki:Link>
      <wiki:Link cssClass="btn btn-xs btn-default"  context="comment" page="${blogcommentpage}" >
        <span class="icon-plus"></span> <fmt:message key="blog.addcomments"/>
      </wiki:Link>
  </div>
  <c:if test="${not empty blogcommentpage}">
  <wiki:PageExists page="${blogcommentpage}">
    <div class="weblogcommentstitle">
      <fmt:message key="blog.commenttitle"/>
    </div>
    <div class="weblogcomments"><wiki:InsertPage page="${blogcommentpage}" /></div>
  </wiki:PageExists>
  </c:if>
</wiki:PageExists>
</c:if>

<wiki:NoSuchPage>
  <%-- FIXME: Should also note when a wrong version has been fetched. --%>
  <div class="error" >
  <fmt:message key="common.nopage">
    <fmt:param><wiki:Link cssClass="createpage" context="edit"><fmt:message key="common.createit"/></wiki:Link></fmt:param>
  </fmt:message>
  </div>
</wiki:NoSuchPage>

</c:otherwise>
</c:choose>
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
