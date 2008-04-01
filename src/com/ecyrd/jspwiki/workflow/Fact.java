/* 
    JSPWiki - a JSP-based WikiWiki clone.

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
package com.ecyrd.jspwiki.workflow;

/**
 * Represents a contextual artifact, which can be any Object, useful for making
 * a Decision. Facts are key-value pairs, where the key is a String (message
 * key) and the value is an arbitrary Object. Generally, the supplied object's
 * {@link #toString()} method should return a human-readable String. Facts are
 * immutable objects.
 * 
 * @author Andrew Jaquith
 * @since 2.5
 */
public final class Fact
{
    private final String m_key;

    private final Object m_obj;

    /**
     * Constructs a new Fact with a supplied message key and value.
     * 
     * @param messageKey
     *            the "name" of this fact, which should be an i18n message key
     * @param value
     *            the object to associate with the name
     */
    public Fact(String messageKey, Object value)
    {
        if ( messageKey == null || value == null )
        {
            throw new IllegalArgumentException( "Fact message key or value parameters must not be null." );
        }
        m_key = messageKey;
        m_obj = value;
    }

    /**
     * Returns this Fact's name, as represented an i18n message key.
     * @return the message key
     */
    public String getMessageKey()
    {
        return m_key;
    }

    /**
     * Returns this Fact's value.
     * @return the value object
     */
    public Object getValue()
    {
        return m_obj;
    }
    
    /**
     * Two Facts are considered equal if their message keys and value objects are equal.
     * @param obj the object to test
     * @return <code>true</code> if logically equal, <code>false</code> if not
     */
    public boolean equals( Object obj )
    {
        if ( !( obj instanceof Fact ) ) 
        {
            return false;
        }
        
        Fact f = (Fact)obj;
        return m_key.equals( f.m_key) && m_obj.equals( f.m_obj );
    }
    
    /**
     * {@inheritDoc}
     */
    public int hashCode()
    {
        return m_key.hashCode() + 41 * m_obj.hashCode();
    }

    /**
     * Returns a String representation of this Fact.
     * @return the representation
     */
    public String toString()
    {
        return "[Fact:" + m_obj.toString() + "]";
    }
}
