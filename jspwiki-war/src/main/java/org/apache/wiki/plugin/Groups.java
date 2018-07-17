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
package org.apache.wiki.plugin;

import java.security.Principal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;

import org.apache.wiki.WikiContext;
import org.apache.wiki.WikiEngine;
import org.apache.wiki.api.exceptions.PluginException;
import org.apache.wiki.api.plugin.WikiPlugin;
import org.apache.wiki.auth.PrincipalComparator;
import org.apache.wiki.auth.authorize.GroupManager;

/**
 *  <p>Prints the groups managed by this wiki, separated by commas.
 *  <br>The groups are sorted in ascending order, and are hyperlinked to the page that displays the group's members.
 *  </p>
 *  <p>Parameters : </p>
 *  NONE
 *  
 *  
 *  @since 2.4.19
 */
public class Groups
    implements WikiPlugin
{
    private static final Comparator<Principal> COMPARATOR = new PrincipalComparator();
    
    /**
     *  {@inheritDoc}
     */
    public String execute( WikiContext context, Map<String, String> params )
        throws PluginException
    {
        // Retrieve groups, and sort by name
        WikiEngine engine = context.getEngine();
        GroupManager groupMgr = engine.getGroupManager();
        Principal[] groups = groupMgr.getRoles();
        Arrays.sort( groups, COMPARATOR );

        StringBuilder s = new StringBuilder();
        
        for ( int i = 0; i < groups.length; i++ )
        {
            String name = groups[i].getName();
            
            // Make URL
            String url = engine.getURLConstructor().makeURL( WikiContext.VIEW_GROUP, name, false, null );
            
            // Create hyperlink
            s.append( "<a href=\"" );
            s.append( url );
            s.append( "\">" );
            s.append( name );
            s.append( "</a>" );
            
            // If not the last one, add a comma and space
            if ( i < ( groups.length - 1 ) )
            {
                s.append( ',' );
                s.append( ' ' );
            }
        }
        return s.toString();
    }
}
