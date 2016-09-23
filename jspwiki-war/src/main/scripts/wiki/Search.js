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
<<<<<<< HEAD
=======
/*eslint-env browser*/
/*global Class, Options, Events, Wiki, GraphBar  */
/*exported Wiki.Search, SearchBox */
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
/*
Class: Wiki.Search
    ...

<<<<<<< HEAD
Depends:
    Graphbar

=======
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
DOM Structure:
    (start code)
    (end)

Example:
    (start code)
    new wiki.Search( form, {
        url: wiki.XHRSearch,
<<<<<<< HEAD
        onComplete: function(){ this.wiki.set('PrevQuery', form.query); }
=======
        onComplete: function(){ this.wiki.set("PrevQuery", form.query); }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    });
    (end)

*/
Wiki.Search = new Class({

<<<<<<< HEAD
    Binds: ['action','setQuery','setStart'],
    Implements: [Events, Options],

    initialize:function(form,options){

        var self = this, s;

        self.setOptions(options);
        self.form = form;
        form.getElements('input[name=scope]').addEvent('click', self.setQuery);
        form.details.addEvent('click', self.action);

        self.result = form.getNext().addEvent('click:relay(.pagination a)', self.setStart);

        self.query = form.query.observe( function(){
            form.start.value='0';   // reset the start page before re-running new ajax searches
            self.action();
        });

        // hash may contain a query pagination parameter: (-1=all,0,1,2...)
        if( location.hash ){
            s = decodeURIComponent(location.hash.slice(1)).match(/(.*):(-?\d+)$/);
            if(s && s[2] /*s.length==3*/ ){
                //console.log(s);
                query.value = s[1];
                form.start.value = s[2];
                self.setQuery();
            }
        }
    },

    scopeRE : /^(?:author:|name:|contents:|attachment:)/,
    setQuery: function( ){

        this.query.value =
            this.form.getElement("input[name=scope]:checked").value +
            this.query.get('value').replace(this.scopeRE, '');
=======
    Binds: ["action", "setQuery", "setStart"],
    Implements: [Events, Options],

    initialize: function(form, options){

        var self = this, s, hash = location.hash;

        self.setOptions( options );
        self.form = form;
        form.getElements( "input[name=scope]").addEvent("click", self.setQuery );
        form.details.addEvent( "click", self.action );

        self.result = form.getNext().addEvent("click:relay(.pagination a)", self.setStart);

        self.query = form.query.observe( function(){

            form.start.value = "0";   // reset the start page before running new ajax searches
            self.action();

        });

        // hash may contain a query pagination parameter: (-1 =all, 0, 1, 2 ...)
        if( hash ){

            s = decodeURIComponent( hash.slice(1) ).match(/(.*):(-?\d+)$/);

            if( s && s[2] /*s.length==3*/ ){
                //console.log(s);
                self.query.value = s[1];
                form.start.value = s[2];
                self.setQuery();
            }

        }
    },

    scopeRE: /^(?:author:|name:|contents:|attachment:)/,
    setQuery: function( ){

        this.query.value =
            this.form.getElement( "input[name=scope]:checked" ).value +
            this.query.get( "value" ).replace( this.scopeRE, "" );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        this.action();

    },

    setScope: function( query ){

<<<<<<< HEAD
        var scope = query.match( this.scopeRE ) ||"";
        scope = this.form.getElement("input[name=scope][value="+scope+"]");
        if( scope ){ scope.checked=true; }

    },

    setStart: function(event){    
        event.stop();
        //this.form.start.value = event.target.get('data-start');
        this.action();
    },    
=======
        var scope = query.match( this.scopeRE ) || "";
        scope = this.form.getElement( "input[name=scope][value=" + scope + "]" );
        if( scope ){ scope.checked = true; }

    },

    setStart: function(event){

        event.stop();
        //this.form.start.value = event.target.get( "data-start" );
        this.action();

    },
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    action: function(){

        var self = this,
            form = self.form,
            query = self.query.value,
            result = self.result;

<<<<<<< HEAD
        if( !query || (query.trim()=='') ){
=======
        if( !query || ( query.trim() == "" ) ){
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            return result.empty();
        }

        self.setScope( query );

        new Request.HTML({
            url: self.options.xhrURL,
            data: form,
<<<<<<< HEAD
            //method: 'post',  //is default
            update: result,
            onComplete: function(){
                spin.hide();
                new GraphBar( result.getElement('.graphBars' ));
                self.fireEvent('onComplete');
            }
        }).send();

        location.hash = '#'+ query+':'+form.start.value;  // push the query into the url history
=======
            //method: "post",  //is default
            update: result,
            onComplete: function(){

                new GraphBar( result.getElement( ".graphBars" ));
                self.fireEvent( "onComplete" );

            }
        }).send();

        location.hash = "#" + query + ":" + form.start.value;  // push the query into the url history
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    }

});

/*
<<<<<<< HEAD
FIXME : hack the old runfullsearch() 
    <a title="Show items from 21 to 40" 
        onclick="$('start').value=20; SearchBox.runfullsearch();">2</a>
    
Better:
    <a title="Show items from 21 to 40" data-start="20" >2</a>
*/
var SearchBox = { runfullsearch : function(){} }
=======
FIXME : hack the old runfullsearch()
    <a title="Show items from 21 to 40"
        onclick="$("start").value=20; SearchBox.runfullsearch();">2</a>

Better:
    <a title="Show items from 21 to 40" data-start="20" >2</a>
*/
var SearchBox = { runfullsearch: function(){} };
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
