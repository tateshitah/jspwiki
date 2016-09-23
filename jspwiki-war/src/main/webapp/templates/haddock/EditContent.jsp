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

<%@ taglib uri="http://jspwiki.apache.org/tags" prefix="wiki"  %>
<%@ page import="org.apache.wiki.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="javax.servlet.jsp.jstl.fmt.*" %>
<fmt:setLocale value="${prefs.Language}" />
<fmt:setBundle basename="templates.default"/>

<%--
  WikiContext c = WikiContext.findContext( pageContext );
--%>
<<<<<<< HEAD
  
=======

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
<%-- Main Content Section --%>
<%-- This has been source ordered to come first in the markup (and on small devices)
     but to be to the right of the nav on larger screens --%>
<div class="page-content">
<<<<<<< HEAD
  
  <wiki:CheckLock mode="locked" id="lock">
    <div class="error">
=======

  <wiki:CheckLock mode="locked" id="lock">
    <div class="alert alert-danger">
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
      <fmt:message key="edit.locked">
        <fmt:param><c:out value="${lock.locker}"/></fmt:param>
        <fmt:param><c:out value="${lock.timeLeft}"/></fmt:param>
      </fmt:message>
    </div>
  </wiki:CheckLock>
<<<<<<< HEAD
  
  <wiki:CheckVersion mode="notlatest">
    <div class="warning">
=======

  <wiki:CheckVersion mode="notlatest">
    <div class="alert alert-danger">
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
      <fmt:message key="edit.restoring">
        <fmt:param><wiki:PageVersion/></fmt:param>
      </fmt:message>
    </div>
  </wiki:CheckVersion>
<<<<<<< HEAD
    
  <wiki:Editor />
        
</div> 
=======

  <wiki:Editor />

</div>
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
