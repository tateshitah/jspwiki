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
package org.apache.wiki.tags;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

<<<<<<< HEAD
=======
import org.apache.wiki.WikiContext;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
import org.apache.wiki.api.engine.AdminBeanManager;
import org.apache.wiki.ui.admin.AdminBean;

/**
 *  Provides an iterator for all AdminBeans of a given type.
 *
 */
public class AdminBeanIteratorTag extends IteratorTag {
	
    private static final long serialVersionUID = 1L;

    private int m_type;

    /**
     *  Set the type of the bean.
     *  
     *  @param type Type to set
     */
    public void setType( String type ) {
<<<<<<< HEAD
=======
    	if (m_wikiContext == null) {
    		m_wikiContext = WikiContext.findContext(pageContext);
    	}
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        m_type = m_wikiContext.getEngine().getAdminBeanManager().getTypeFromString( type );
    }

    /**
     *  {@inheritDoc}
     */
    @Override
    public void resetIterator() {
        AdminBeanManager mgr = m_wikiContext.getEngine().getAdminBeanManager();
        Collection< AdminBean > beans = mgr.getAllBeans();
        ArrayList< AdminBean > typedBeans = new ArrayList< AdminBean >();
        for( Iterator< AdminBean > i = beans.iterator(); i.hasNext(); ) {
            AdminBean ab = i.next();
            if( ab.getType() == m_type ) {
                typedBeans.add( ab );
            }
        }

        setList( typedBeans );
    }

}
