/*
    JSPWiki - a JSP-based WikiWiki clone.

    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); fyou may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/
/*
Moo-extend: String-extensions
    Array:  rendAr(), max(), min()
*/


/*
Array.slick()
    Convert array of css-selectors into one or a set of DOM Elements.
    Mini template engine to generate DOM elements from clean, elegant css selectors,
    by utilising the Mootools Slick engine.
    Extensions:
    - "attach" or bind any of the generated DOM elements to a js object properties

Credit: https://github.com/Mr5o1/rendAr by Levi Wheatcroft (leviwheatcroft.com)

Requires:
    - core/Element
    - core/Elements
    - core/Array

<<<<<<< HEAD
Example 
>   new Element('div',{ attach:this });      //this.element now refers to div
>   new Element('div',{ attach:[this] });    //this.element now refers to div
>   new Element('div',{ attach:[this,'myproperty'] }); //this.myproperty now refers to div

Example rendAr()
>   ['div',{attach:[this,'myproperty'] }].slick();
>   ['ul', ['li[text=One]','li[text=Two]','li[text=Three]']].slick();
=======
Example
>   new Element("div",{ attach:this });      //this.element now refers to div
>   new Element("div",{ attach:[this] });    //this.element now refers to div
>   new Element("div",{ attach:[this,"myproperty"] }); //this.myproperty now refers to div

Example rendAr()
>   ["div",{attach:[this,"myproperty"] }].slick();
>   ["ul", ["li[text=One]","li[text=Two]","li[text=Three]"]].slick();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

*/
Element.Properties.attach = {

    set: function( object ){
<<<<<<< HEAD
        if(!object[0]) object = [object];
        object[0][ object[1] || 'element' ] = this;
=======
        if(!object[0]){ object = [object]; }
        object[0][ object[1] || "element" ] = this;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    }

};

Array.implement({

    slick: function() {

<<<<<<< HEAD
        var elements = [],type;

        this.each( function(item){
            if(item != null){ 
            type = typeOf(item);
            if ( type == 'elements' ) elements.append(item);
            else if ( item.grab /*isElement*/ ) elements.push(item);
            else if ( item.big  /*isString*/ ) elements.push(item.slick());
            else if ( type == 'object' ) elements.getLast().set(item);
            else if ( item.pop /*isArray*/ ) elements.getLast().adopt(item.slick());
=======
        var elements = [], type;

        this.each( function(item){
            if(item != null){
                type = typeOf(item);
                if ( type == "elements" ){ elements.append(item); }
                else if ( item.grab /*isElement*/ ){ elements.push(item); }
                else if ( item.big  /*isString*/ ){ elements.push(item.slick()); }
                else if ( type == "object" ){ elements.getLast().set(item); }
                else if ( item.pop /*isArray*/ ){ elements.getLast().adopt(item.slick()); }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            }
        });

        return elements[1] ? new Elements(elements) : elements[0];
    },

    /*
    Function: scale
<<<<<<< HEAD
    
    Example
        [0,50,100].scale() == [0,0.5,1]
        [0,50,100].scale(2) == [0,1,2]
        
    */
    scale: function( scale ) {

        var result = [],
            i, len = this.length,
            min = this.min(),
            rmax = this.max() - min;

        if( rmax == 0 ){ rmax = min; min = 0; }

        for( i=0; i<len; i++) result[i] = (scale||1) * (this[i] - min) / rmax;
=======

    Example
        [0,50,100].scale() == [0,0.5,1]
        [0,50,100].scale(2) == [0,1,2]
        [0.5].scale() == [0.5]
        [0.5].scale(0, 2) == [0.25]

    */
    scale: function( minv, maxv ) {


        var i, result = [],
            len = this.length,
            min = isNaN( minv ) ? ( len > 1 ? this.min() : 0 ) : minv ;
            distance = ( isNaN( maxv ) ?  this.max() : maxv ) - min ;

        if( distance == 0 ){ distance = min; min = 0; }

        for( i = 0; i < len; i++){ result[i] = ( this[i] - min ) / distance; }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        return result;
    },

    max: function(){ return Math.max.apply(null, this); },

    min: function(){ return Math.min.apply(null, this); }

});
