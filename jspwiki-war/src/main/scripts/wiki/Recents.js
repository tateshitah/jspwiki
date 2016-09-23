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
Class: Wiki.RecentSearches
 * FIXME: remember 10 most recent search topics (cookie based)
 * Extended with quick links for view, edit and clone (ref. idea of Ron Howard - Nov 05)
 * Refactored for mootools, April 07

Uses:
    #recentClear
    #recentSearches
Depends:
    wiki

DOM-structure:
(start code)
    <div id="recentSearches">
      <fmt:message key="sbox.recentsearches"/>
      <a href="#"><fmt:message key="sbox.clearrecent"/></a>
      <ul>
          <li><a href...>...</a></li>
      </ul>
    </div>
(end code)

Examples:
<<<<<<< HEAD
>    wiki.add('.searchbox-recents', function(element){
>       new Wiki.Recents(element, {
>           items: wiki.prefs.get('RecentSearch'),
>           onChange: function(recents){ wiki.set('RecentSearch',recents); }
=======
>    wiki.add(".searchbox-recents", function(element){
>       new Wiki.Recents(element, {
>           items: wiki.prefs.get("RecentSearch"),
>           onChange: function(recents){ wiki.set("RecentSearch",recents); }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
>       });
>   });

*/
Wiki.Recents = new Class({

    Implements: [Events, Options],

<<<<<<< HEAD
    initialize:function(dropdown,options){

        var self = this, 
            items, i=0, len, 
            list=[], li='li.recents';

		self.setOptions( options );
        //self.options.items = ['foo','bar']; //test

        self.items = items = self.options.items || list;
        self.form = dropdown.getParent('form').addEvent('submit', self.submit.bind(self) );
=======
    initialize: function(dropdown, options){

        var self = this,
            items, i = 0,
            list = [], li = "li.recents";

		self.setOptions( options );
        //self.options.items = ["foo","bar"]; //test

        self.items = items = self.options.items || list;
        self.form = dropdown.getParent("form").addEvent("submit", self.submit.bind(self) );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        //build li.recents dropdown items
        if( items[0] ){

            while(items[i]){
<<<<<<< HEAD
                list.push(li, ['a', { html:items[i++].stripScripts() }] );
            }
            //list.push(li+'.clear',['a',{html:'[Clear Recent Searches]' }]);
            list.push(li+'.clear',['a', [ 'span.btn.btn-xs.btn-default',{text:'Clear Recent Searches' }]]);
            dropdown.adopt( list.slick() );
        }
        dropdown.addEvent('click:relay('+li+')', function(ev){ ev.stop(); self.action(this); });
=======
                list.push(li, ["a", { html: items[i++].stripScripts() }] );
            }
            list.push(li + ".clear", ["a", [ "span.btn.btn-xs.btn-default", {text: "sbox.clearrecent".localize() }]]);
            dropdown.adopt( list.slick() );
        }
        dropdown.addEvent( "click:relay(" + li + ")", function(ev){ ev.stop(); self.action(this); });
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    },

    action: function( element ){

        var self = this, form = self.form;

<<<<<<< HEAD
        if( element.match('.clear') ){

            //element.getSiblings('li.recents').destroy();
            //element.destroy();
            element.getElements('!> > li.recents').destroy(); //!> == direct parent
            self.items = [];
            self.fireEvent('change'/*,null*/);

        } else {

            form.query.value = element.get('text');
=======
        if( element.match(".clear") ){

            //element.getSiblings("li.recents").destroy();
            //element.destroy();
            element.getElements("!> > li.recents").destroy(); //!> == direct parent
            self.items = [];
            self.fireEvent("change"/*,null*/);

        } else {

            form.query.value = element.get("text");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            form.submit();

        }

    },

<<<<<<< HEAD
    submit:function(){
=======
    submit: function(){
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        var self = this,
            items = self.items,
            value = self.form.query.value.stripScripts(); //xss

        if( items.indexOf( value ) < 0 ){

            //insert new item at the start of the list, and cap list on max 10 items
<<<<<<< HEAD
            if( items.unshift(value) > 9){ items = items.slice(0,9); }
            self.fireEvent('change', [self.items = items] );
=======
            if( items.unshift(value) > 9){ items = items.slice(0, 9); }
            self.fireEvent("change", [self.items = items] );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        }

    }

});
