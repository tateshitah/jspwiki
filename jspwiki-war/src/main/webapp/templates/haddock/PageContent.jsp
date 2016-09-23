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
<%@ page import="org.apache.wiki.attachment.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page import="javax.servlet.jsp.jstl.fmt.*" %>
<fmt:setLocale value="${prefs.Language}" />
<fmt:setBundle basename="templates.default"/>
<%
  WikiContext c = WikiContext.findContext( pageContext );
%>
<%-- Main Content Section --%>
<%-- This has been source ordered to come first in the markup (and on small devices)
     but to be to the right of the nav on larger screens --%>
<<<<<<< HEAD
<div class="page-content">

  <wiki:Include page="PageTab.jsp"/>
  
  <wiki:PageType type="attachment">
    <div class="information">
      <fmt:message key="info.backtoparentpage" >
	    <fmt:param><wiki:Link page="<wiki:ParentPageName/>" ><wiki:ParentPageName/></wiki:Link></fmt:param>
      </fmt:message>
    </div>
    <div><%-- insert the actual attachement, image, etc... --%>
      <wiki:Translate>[<%= WikiContext.findContext( pageContext ).getPage().getName() %>]</wiki:Translate>
    </div>
  </wiki:PageType>  
    
</div> 
=======
<div class="page-content <wiki:Variable var='page-styles' default='' />">

  <wiki:Include page="PageTab.jsp"/>

  <wiki:PageType type="attachment">
    <div><%-- insert the actual attachement, image, etc... --%>
      <wiki:Translate>[<%= WikiContext.findContext( pageContext ).getPage().getName() %>]</wiki:Translate>
    </div>
  </wiki:PageType>

</div>
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
