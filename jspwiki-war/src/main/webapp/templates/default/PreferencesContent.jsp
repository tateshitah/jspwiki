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
<%@ page import="org.apache.wiki.*" %>
<%@ page import="org.apache.wiki.ui.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page import="javax.servlet.jsp.jstl.fmt.*" %>
<fmt:setLocale value="${prefs.Language}" />
<fmt:setBundle basename="templates.default"/>
<<<<<<< HEAD
<% 
  WikiContext context = WikiContext.findContext( pageContext ); 
=======
<%
  WikiContext context = WikiContext.findContext( pageContext );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
  TemplateManager.addResourceRequest( context, TemplateManager.RESOURCE_SCRIPT, "scripts/jspwiki-prefs.js" );
%>

<wiki:TabbedSection defaultTab="${param.tab}">

  <wiki:Tab id="prefs" title='<%=LocaleSupport.getLocalizedMessage(pageContext, "prefs.tab.prefs")%>' accesskey="p" >
     <wiki:Include page="PreferencesTab.jsp" />
  </wiki:Tab>

  <wiki:UserCheck status="authenticated">
  <wiki:Permission permission="editProfile">
  <wiki:Tab id="profile" title='<%=LocaleSupport.getLocalizedMessage(pageContext, "prefs.tab.profile")%>' accesskey="o" >
     <wiki:Include page="ProfileTab.jsp" />
  </wiki:Tab>
  </wiki:Permission>
  </wiki:UserCheck>
<<<<<<< HEAD
  
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
  <wiki:Permission permission="createGroups"> <!-- FIXME check right permissions -->
  <wiki:Tab id="group" title='<%=LocaleSupport.getLocalizedMessage(pageContext, "group.tab")%>' accesskey="g" >
    <wiki:Include page="GroupTab.jsp" />
  </wiki:Tab>
  </wiki:Permission>

</wiki:TabbedSection>