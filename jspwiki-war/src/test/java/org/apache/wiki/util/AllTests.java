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
package org.apache.wiki.util;

<<<<<<< HEAD
import org.apache.wiki.PropertyReaderTest;

=======
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

<<<<<<< HEAD
=======
import org.apache.wiki.PropertyReaderTest;

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

public class AllTests extends TestCase {

    public AllTests( String s ) {
        super( s );
    }

    public static Test suite() {
        TestSuite suite = new TestSuite("Utility suite tests");

<<<<<<< HEAD
=======
        suite.addTest( ByteUtilsTest.suite() );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        suite.addTest( ClassUtilTest.suite() );
        suite.addTest( CommentedPropertiesTest.suite() );
        suite.addTest( CryptoUtilTest.suite() );
        suite.addTest( FileUtilTest.suite() );
        suite.addTest( org.apache.wiki.util.comparators.AllTests.suite() );
        suite.addTest( MailUtilTest.suite() );
        suite.addTest( PriorityListTest.suite() );
        suite.addTest( PropertyReaderTest.suite() );
        suite.addTest( SerializerTest.suite() );
        suite.addTest( TextUtilTest.suite() );
        suite.addTest( TimedCounterListTest.suite() );
<<<<<<< HEAD
        suite.addTest( UtilJ2eeCompatTest.suite() );
=======
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        suite.addTest( XmlUtilTest.suite() );
        
        return suite;
    }
}
