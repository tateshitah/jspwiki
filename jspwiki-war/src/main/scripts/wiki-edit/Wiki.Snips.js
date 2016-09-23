<<<<<<< HEAD
/*!
    JSPWiki - a JSP-based WikiWiki clone.

=======
/*
    JSPWiki - a JSP-based WikiWiki clone.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); fyou may not use this file except in compliance
    with the License.  You may obtain a copy of the License at
<<<<<<< HEAD

       http://www.apache.org/licenses/LICENSE-2.0

=======
       http://www.apache.org/licenses/LICENSE-2.0
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/
<<<<<<< HEAD
/*



*/
=======

/*eslint-env browser*/
/*global Wiki, Dialog, Request  */
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

/*
DirectSnippet definitions for JSPWiki, aka ''smartpairs''.
These snippets are directly expanded on keypress.
*/
Wiki.DirectSnips = {
<<<<<<< HEAD

=======
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    '"' : '"',
    '(' : ')',
    '[' : ']',
    '{' : '}',
<<<<<<< HEAD
    '%%' : ' /%',
    "'" : {
        snippet:"'",
        scope:{
            "[{":"}]"  //plugin parameters
=======
    "'" : {
        snippet: "'",
        scope: {
            "[{" : "}]"  //plugin parameters
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
          }
    }
};

/*
<<<<<<< HEAD
    Function: tabSnippets
    
        Definitions for the JSPWiki editor commands.

        Following commands are predefined by the snipe editor:
        - find : toggles the find and replace dialog
        - sections : toggle sections dropdown dialog, which allows to switch
            between certain sections of the document or the whole document
        - undo : undo last command, set the editor to the previous stable state
        - redo : revert last undo command

        A command consists of triggers, attributes, snippets, events and dialogs.

        Triggers : 
        ========
        click events, suggestion dialogs, TAB-completion and Ctrl-keys.

        Click events are attached to DOM elements with a .cmd css-class.
        If the DOM element also contains a .pop css-class, a dialog will be opened.

        TAB-completion can be turned on/off via the 'tabcompletion' flag.

        The 'keyup' event can trigger a suggestion dialog:
        - the suggest(txta,caret) function validates the suggestion context
          It returns true/false and can modify the snippet with
             - snip.start : begin offset of the matched prefix
             - snip.match : matched prefix (string)
             - snip.tail: (optional) replaceable tail

        Attributes :
        ==========
        - initialize: function(cmd, snip) called once at initialization
        - key: shortcut key  (ctrl-key)
        - scope: set to TRUE when the cmd is valid
        - nscope: set to TRUE when the cmd is not valid
        - cmdId: wysiwyg mode only (commandIdentifier)
        
        Snippet :
        =======
        The snippet contains the inserted or replaced text.
        - static snippet: "some string"
        - snippet with parameters in {} brackets: "some {dialog1} string"
          A {.} will be replaced by the selected text.
          A {dialog-1} opens a dialog, and inserts the returned info (eg color, selection...)
        - dynamic snippet: javascript function.
          Example:
              snippet: function(){
                  this.dialogs.exec( dialog-name, ...
                      onChange: function(value){  }
                  )
              }

        Event :
        =====
        Fires an event back to the invoking Object (Wiki.Edit in our case)
        Example:
            smartpairs: { event: 'config' }

        Dialogs :
        =======
        (btw -- you do use unique names, do you?)
        - <dialog-name>: [ Dialog.SubClass, {dialog-parameters, event-handlers} ]
        - <dialog-name>: "dialog initialization string"
          This is a short notation for Dialog.Selection, or..
          [Selection, "put here your dialog initialization string"]

        The Dialog Classes are subclass of Dialog. (eg. Dialog.Selection)


    Examples:

     acl: {
         nscope: { "[{" : "}]" },
         snippet: "[\\{ ALLOW {permission} {principal(s)}  }]"

         permission: "view|edit|delete",
         "principals(s)": [Dialog.Selection, {
             onOpen: function(){ this.setBody( AJAX-request list of principals ); }
         ]
     }

     link: {
         suggest: function(){
             //match [, but not [[ or [{
             //defines .start, .selection, .trail ??
         }
         snippet: "{wikiLink}",
         //or snippet: function(){ this.dialogs.exec('wikiLink'); },
         wikiLink: [Dialog.Link, {
            onOpen: function(){
                AJAX-retrieval of link suggestions
            }
         }]
     }

     color: {
        nscope: {"%%(":")"},
        action: "%%(color:#000000; background:#ffffff;) {.} \%",
     }
     colorsuggestion: {
        scope: {"%%(":")"},
        suggest: function(){
            //match #cccccc
        }
        snippet: "{color}",
        color: [ dialog.Color, {
            //parms
        }]
     }


=======
Function: snippets

        Definitions for the JSPWiki editor commands.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
*/

Wiki.Snips = {

<<<<<<< HEAD
        find: {
            key: "f"
            //predefined find dialog triggered via Ctrl-f or a toolbar 'find' button
        },

        //sections:
        //predefined section dialog triggered via a toolbar 'sections' button
        //TODO: turn it into a suggestion menu for header lines

        undo: {
            //event: "undo", //predefined snipe event
            action: function(){ this.undoredo.onUndo(); },
            key: "z"
        },

        redo: {
            //event: "redo", //predefined snipe event
            action: function(){ this.undoredo.onRedo(); },
            key: "y"
        },

=======
        // Snipe predefined commands
        find: { key: "f" },
        undo: { event: "undo" },
        redo: { event: "redo" },

        // Configuration commands
        wysiwyg: { event: 'config' },
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        smartpairs: { event: 'config' },
        livepreview: { event: 'config' },
        autosuggest: { event: 'config' },
        tabcompletion: { event: 'config' },
        previewcolumn: { event: 'config' },

<<<<<<< HEAD
=======

        // Simple shortcuts
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        br: {
            key: "shift+enter",
            snippet: "\\\\\n"
        },
<<<<<<< HEAD

        hr: "\n----\n",


        h: {
            xxxsuggest: function(txta,caret){
                var c,result=txta.slice(0,caret.start).match( /(?:^|[\n\r])(!{1,3}[^\n\r]*)$/ );

                if( result ){
                    c = result[1];
                    result = {
                        start: caret.start - c.length,
                        match: c + txta.slice(caret.start).match( /[^\n\r]*/ )||''  //entire line
                    };
                }
                return result;
            },
            h: [Dialog.Selection, {
                onOpen: function(){
                    var value = (this.getValue().replace(/^!+\s?/,'')||'Title'), //remove !markup
                        val = value.trim().trunc(20),
                        k = ['!!! '+value,'!! '+value,'! '+value],
                        v = ['<h2>'+val+'</h2>','<h3>'+val+'</h3>','<h4>'+val+'</h4>'];

                    this.setBody( v.associate( k ) );
                }
            }]
        },
    
        font: {
            nScope: {
                "%%(":")",
                "font-family:":";"
            },
            /*
            suggest: function(txta,caret){
                //match /%%(:?.*)font-family:([^;\)]+)/

            },*/
            snippet: "%%(font-family:{font};) {.}/% ",
            font: [Dialog.Font, {}]
        },

        color: {
            nscope: { '%%(': ')' },
            snippet: "%%(color:{#000000}; background:{#ffffff};) {.} ",
            suggest: function(txta, caret){
                //match "#cccccc;" pattern
                var c,d, result = txta.slice(0,caret.end).match( /#[0-9a-f]{0,6}$/i );

                if( result ){
                    c = result[0];
                    d = txta.slice( caret.end ).match( /^[0-9a-f]+/i )||'';
                    result = {
                        start: caret.end - c.length, //position of # char
                        match: (c+d).slice(0,7)
                    };
                }
                return result;
            },
            color: [ Dialog.Color, {
                //colorImage:'./test-dialog-assets/circle-256.png'
            }]
         },

        symbol: { synonym:"chars" },
        chars: {
            nScope: { "%%(":")" },
            snippet: "{&entity;}",
            suggest: function(txta, caret){
                //match &xxx;
                var c,result = txta.slice(0,caret.end).match( /&[\da-zA-Z]*;?$/ );

                if( result ){
                    c = result[0];
                    result = {
                        start: caret.end - c.length,
                        match: c,
                        tail: txta.slice( caret.end ).match( /^[\da-zA-Z]*;?/ )||''
                    }
                }
                return result;

            },
            chars: [Dialog.Chars, {caption:"Special Chars".localize()}]
        },

        style: { synonym:"css"},
        css: {
            nScope: { "%%(":")" },
            snippet: "%%{css} {.} /% ",
            suggest: function(txta, caret){
                //match %%(.w+)
                var c, result = txta.slice(0,caret.end).match(/%%[\da-zA-Z(\-\_:#;)]*$/);

                if(result){
                    c = result[0].slice(2); //drop the %% prefix
                    result = {
                        start: caret.end - c.length,
                        match: c + txta.slice( caret.end ).match( /^[\da-zA-Z(:#;)]*/ )||''
                    };
                }
                return result;
            },
            css: {
                "(css:value;)":"any css definitions",
                "text-success":"text-success",
                "text-information":"text-information",
                "text-warning":"text-warning",
                "text-error":"text-error",
                success:"success",
                information:"information",
                warning:"warning",
                error:"error",
                commentbox:"commentbox",
                quote:"quoted paragraph",
                sub:"sub-script<span class='sub'>2</span>",
                sup:"super-script<span class='sup'>2</span>",
                strike:"<span class='strike'>strikethrough</span>",
                pretify:"prettify code block",
                reflection:"image reflection"
=======
        hr: "\n----\n",
        lorem: "This is just some sample. Don’t even bother reading it; you will just waste your time. Why do you keep reading? Do I have to use Lorem Ipsum to stop you? OK, here goes: Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Still reading? Gosh, you’re impossible. I’ll stop here to spare you.",
        Lorem: { alias: "lorem" },


        // simple inline tab completion commands
        bold:   { key: "b", snippet: "__{bold}__" },
        italic: { key: "i", snippet: "''{italic}''" },

        mono:   { key: "m", snippet: "{{{monospaced text}}} " },
        sub:    "%%sub {subscript text}/% ",
        sup:    "%%sup {superscript text}/% ",
        strike: "%%strike {strikethrough text}/% ",

        // simple block tab completion commands
        quote:  "\n%%quote\n{Quoted text}\n/%\n",
        dl:     "\n;{term}:definition-text ",
        pre:    "\n{{{\n{some preformatted block}\n}}}\n",
        code:   "\n%%prettify \n{{{\n{/* some code block */}\n}}}\n/%\n",
        table:  "\n||{heading-1} ||heading-2\n|cell11     |cell12\n|cell21     |cell22\n",
        t: { alias: "table" },

        me: { alias: "sign"},
        sign: function(){
            var name = Wiki.UserName || 'UserName';
            return "\n\\\\ &mdash;" + name + ", "+ new Date().toISOString() + "\\\\ \n";
        },

        hDlg: {
            suggest: { pfx:"(^|\n)([!]{1,3})$", match:"^([!]{1,3})(?:[^!])"},
            hDlg: [Dialog.Selection, {
                match: "=",  //exact match
                body: {
                    "!!!": "<span style='font-size:30px;xline-height:1;'>Header</span>",
                    "!!": "<span style='font-size:24px;xline-height:30px;'>Title</span>",
                    "!": "<span style='font-size:18px;xline-height:30px;'>Sub-title</span>",
                    "{text}": "Normal Paragraph"
                }
            }]
        },

        now: { alias: "date" },
        date: function( ){
            return new Date().toISOString()+' ';
            //return "[{Date value='" + d.toISOString() + "' }]"
            //return "[{Date " + d.toISOString() + " }]"
        },

        tabs: {
            nScope: {
                "%%(":")",
                "%%tabbedSection":"/%"
            },
            snippet:"%%tabbedSection \n%%tab-{tabTitle1}\ntab content 1\n/%\n%%tab-tabTitle2\ntab content 2\n/%\n/%\n "
        },

        img: "\n[{Image src='{img.jpg}' width='400px' height='300px' align='left' }]\n ",

        imgSrcDlg:{
            scope: { "[{Image":"}]" },
            suggest: { pfx:"src='([^']*)'?$", match: "^([^']*)" },
            imgSrcDlg: [ Dialog.Selection, {

                caption: "Image Source",
                onOpen: function( dialog ){

                    var key = dialog.getValue();

                    if( !key || (key.trim()=='') ){ key = Wiki.PageName + '/'; }

                    Wiki.jsonrpc("/search/suggestions", [key, 30], function( result ){

                        //console.log('jsonrpc result', result );
                        if( result[1] /*length>1*/ ){

                            dialog.setBody( result );

                        } else {

                            dialog.hide();

                        }
                    });
                }
            }]
        },

        imgAlignDlg: {
            scope: { "[{Image":"}]" },
            suggest: "align='\\w+'",
            imgAlignDlg: "left|center|right"
        },

        font: {
            nScope: { "%%(":")" },
            snippet: "%%(font-family:{font};) body /% "
        },

        fontDlg: {
            scope: { "%%(":")" },
            suggest: { pfx: "font-family:([^;\\)\\n\\r]*)$", match:"^([^;\\)\\n\\r]*)" },
            fontDlg: [Dialog.Font, {}]
        },

        color: "%%(color:{#000000}; background:#ffffff;) {some text} /%",

        colorDlg: {
            scope: { '%%(': ')' },
            suggest:"#[0-9a-fA-F]{0,6}",
            colorDlg: [ Dialog.Color , {} ]
         },

        symbol: { alias: "chars" },
        chars: "&entity;",

        charsDlg: {
            suggest: '&\\w+;?',
            charsDlg: [ Dialog.Chars, { caption:"Special Chars".localize() }]
        },

        icon: "%%icon-{}search /%",
        iconDlg: {
            scope: { "%%":"/%" },
            suggest: "icon-\\S*",
            iconDlg: [Dialog.Selection, {
                cssClass:".dialog-horizontal",
                body:{
                    "icon-search":"<div class='icon-search'></div>",
                    "icon-user":"<div class='icon-user'></div>",
                    "icon-home":"<div class='icon-home'></div>",
                    "icon-refresh":"<div class='icon-refresh'></div>",
                    "icon-repeat":"<div class='icon-repeat'></div>",
                    "icon-bookmark":"<div class='icon-bookmark'></div>",
                    "icon-tint":"<div class='icon-tint'></div>",
                    "icon-plus":"<div class='icon-plus'></div>",
                    "icon-external-link":"<div class='icon-external-link'></div>",

                    "icon-signin":"<div class='icon-signin'></div>",
                    "icon-signout":"<div class='icon-signout'></div>",
                    "icon-rss":"<div class='icon-rss'></div>",
                    "icon-wrench":"<div class='icon-wrench'></div>",
                    "icon-filter":"<div class='icon-filter'></div>",
                    "icon-link":"<div class='icon-link'></div>",
                    "icon-paper-clip":"<div class='icon-paper-clip'></div>",
                    "icon-undo":"<div class='icon-undo'></div>",
                    "icon-euro":"<div class='icon-euro'></div>",
                    "icon-slimbox":"<div class='icon-slimbox'></div>",
                    "icon-picture":"<div class='icon-picture'></div>",
                    "icon-columns":"<div class='icon-columns'></div>"
                }
            }]
        },

        contextText: {
            scope: { "%%":"/%" },
            suggest: {pfx: "%%text-(\\w*)$", match: "^default|success|info|warning|danger" },
            contextText: [Dialog.Selection, {
                cssClass:".dialog-horizontal",
                body:{
                    primary:"<span class='text-primary'>primary</span>",
                    success:"<span class='text-success'>success</span>",
                    info:"<span class='text-info'>info</span>",
                    warning:"<span class='text-warning'>warning</span>",
                    danger:"<span class='text-danger'>danger</span>"
                }
            }]
        },

        contextBG: {
            scope: { "%%":"/%" },
            suggest: {pfx:"%%(default|success|info|warning|error)$", match:"^default|success|info|warning|error"},
            contextBG: [Dialog.Selection, {
                cssClass:".dialog-horizontal",
                body:{
                    "default":"<span class='default'>default</span>",
                    success:"<span class='success'>success</span>",
                    info:"<span class='info'>info</span>",
                    warning:"<span class='warning'>warning</span>",
                    error:"<span class='error'>error</span>"
                }
            }]
        },

        labelDlg: {
            scope: { "%%":"/%" },
            suggest: {pfx: "%%label-(\\w*)$", match: "^default|success|info|warning|danger" },
            labelDlg: [Dialog.Selection, {
                cssClass:".dialog-horizontal",
                body:{
                    "default":"<span class='label label-default'>default</span>",
                    primary:"<span class='label label-primary'>primary</span>",
                    success:"<span class='label label-success'>success</span>",
                    info:"<span class='label label-info'>info</span>",
                    warning:"<span class='label label-warning'>warning</span>",
                    danger:"<span class='label label-danger'>danger</span>"
                }
            }]
        },

        listDlg: {
            scope: { "%%list-":"/%" },
            suggest: {pfx: "list-(?:[\\w-]+-)?(\\w*)$", match: "^\\w*" },
            listDlg: [Dialog.Selection, {
                cssClass:".dialog-horizontal",
                body: "nostyle|unstyled|hover|group"
            }]
        },

        tableDlg: {
            scope: { "%%table-":"/%" },
            suggest: {pfx: "table-(?:[\\w-]+-)?(\\w*)$", match: "^\\w*" },
            tableDlg: [Dialog.Selection, {
                cssClass:".dialog-horizontal",
                body: "sort|filter|striped|bordered|hover|condensed|fit"
            }]
        },

        cssDlg: {
            scope: { "%%":"/%" },
            suggest: {pfx:"%%([\\da-zA-Z-_]*)$", match:"^[\\da-zA-Z-_]+"},
            cssDlg: {
                "(css:value;)":"any css definitions",
                "default":"contextual backgrounds",
                "text-default":"contextual text color",
                "label-default":"<span class='label label-default'>contextual labels</span>",
                "badge":"badges <span class='badge'>13</span>",
                //"btn-default":"<span class='btn btn-xs btn-default'>Buttons</span>",
                "collapse":"collapsable lists",
                "list-nostyle":"list styles",
                //progress:"Progress Bars",
                "table-fit":"table styles",
                "":"",
                "add-css":"Add CSS",
                alert: "Alert Box",
                accordion: "Accordion",  //leftAccordion, rightAccordion, pillsAccordion, accordion-primary...
                category: "Category Links",
                carousel: "Carousel",
                columns: "Multi-column layout",
                commentbox: "Comment Box",
                //graphBar
                pills:"Pills",
                prettify: "Prettify syntax highlighter",
                scrollable: "Scrollable Preformatted block",
                "scrollable-image": "Scrollable Wide Images",
                //reflection: "Image with reflection",
                slimbox: "Slimbox Viewer <span class='icon-slimbox'></span>",
                //"under-construction": "<div class='under-construction'> </div>",
                tabs:"Tabs",
                viewer: "Media Viewer"

//block styles
//                quote:"<div class='quote'>Quoted paragraph</div>",
//                lead:"<span class='lead'>LEAD text</span>",
//                "drop-caps":"Drop Caps",
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                //xflow:"wide content with scroll bars"
            }
        },

<<<<<<< HEAD
        //simple tab completion commands
        sub: "%%sub {subscript text}/% ",
        sup: "%%sup {superscript text}/% ",
        strike: "%%strike {strikethrough text}/% ",
        xflow: "\n%%xflow\n{wide content}\n/%\n ",
        quote: "\n%%quote \n{quoted text}\n/%\n",
        dl: "\n;{term}:{definition-text} ",
        pre: "\n\\{\\{\\{\n{some preformatted block}\n}}}\n",
        code: "\n%%prettify \n\\{\\{\\{\n{/* some code block */}\n}}}\n/%\n",
        mono: "\\{\\{{monospaced text}}} ",

        link: {
            key:'l',
            commandIdentifier:'createlink',
            suggest: function(txta, caret){

                //match [link] or [link,  do not match [{, [[
                //match '[' + 'any char except \n, [, { or ]' at end of the string
                var result = txta.getFromStart().match( /\[([^\[\{\]\n\r]*)$/ ),
                    link;

                if( result ){
                    link = result[1].split('|').getLast(); //exclude "text|" prefix
                    result = {
                        start: caret.start - link.length ,
                        //if no input yet, then get list attachments of this wikipage
                        match: link,
                        tail: txta.slice( caret.start ).search( /[\n\r\]]/ )
                    };
                }
                return result;
            },

            //snippet: "[{display text}|{pagename or url}|{attributes}] ",
            snippet: "[{link}] ",
            //attributes: "accesskey='X'|title='description'|target='_blank'
            //    'accesskey', 'charset', 'class', 'hreflang', 'id', 'lang', 'dir',
            //  'rel', 'rev', 'style', 'tabindex', 'target', 'title', 'type'
            //    display-text
            //    wiki-page or url -- allow to validate the url ; preview the page/url
            //    title: descriptive text
            //- target: _blank --new-- window yes or no

            //link: [ Dialog.Link, { ...
            link: [ Dialog.Selection, {

                onOpen: function(dialog){


//console.log("****"+dialog.getValue()+"****", Wiki.PageName)
                    var dialog = this, 
                        key = dialog.getValue();
                        
                    if( !key || (key.trim()=='')) key = Wiki.PageName + '/';

                    //console.log('json lookup for '+key);
                    Wiki.jsonrpc('search.getSuggestions', [key,30], function(result,exception){

                      if( result.list && result.list[0] /*length!=0*/ ){
                          dialog.setBody( result.list );
                      } else {
                          dialog.hide();
                      }

                    });
                }

            }]


        },

        bold: {
            key:'b',
            snippet:"__{bold text}__ "
        },

        italic: {
            key:'i',
            snippet: "''{italic text}'' "
        },

        allow: { synonym: "acl" },
        acl: {
            snippet: "\n[\\{ALLOW {permission} {principal(,principal)} \\}]\n",
            permission: "view|edit|modify|comment|rename|upload|delete",
            //permission:[Dialog.Selection, {body:"view|edit|modify|comment|rename|upload|delete"}]
            "principal(,principal)": function(){
                return "Anonymous|Asserted|Authenticated|All";
                //FIXME: retrieve list of available wiki user groups through ajax call
            }
        },

        img: {
            snippet:"\n[\\{Image src='{img.jpg}' width='{400px}' height='{300px}' align='{text-align}' style='{css-style}' class='{css-class}' }]\n ",
            'text-align':'left|center|right'
        },

        plugin: {
            snippet: "\n[\\{{plugin}}]\n",
            suggest: function(txta, xcaret){
                //match [{
            },
            plugin: {
                "TableOfContents title='Page contents' numbered='true' prefix='Chap. '":"Table Of Contents (toc)",
                "If name='value' page='pagename' exists='true' contains='regexp'\n\nbody\n":"Test a page variable",
                "SET alias='{pagename}'":"Make a Page Alias",
                "SET name='value'":"Set a page variable",
                "$varname":"Get a page variable",
                "InsertPage page='pagename'":"Insert Page",
                "CurrentTimePlugin format='yyyy mmm-dd'":"Current Time",
                "Search query='Janne' max='10'":"Search query",
                "ReferredPagesPlugin page='pagename' type='local|external|attachment' depth='1..8' include='regexp' exclude='regexp'":"Incoming Links (aka referred pages)",
                "ReferringPagesPlugin page='pagename' separator=',' include='regexp' exclude='regexp'":"Outgoing Links (aka referring pages)",
                "WeblogPlugin page='pagename' startDate='300604' days='30' maxEntries='30' allowComments='false'":"Display weblog posts",
                "WeblogEntryPlugin":"New weblog entry"
            }
        },

        tab: {
            nScope: {
                "%%(":")",
                "%%tabbedSection":"/%"
            },
            snippet:"%%tabbedSection \n%%tab-{tabTitle1}\n{tab content 1}\n/%\n%%tab-{tabTitle2}\n{tab content 2}\n/%\n/%\n "
        },

        toc: {
            nScope: { "[{":"}]" },
            snippet:"\n[\\{TableOfContents }]\n"
        },

        table: "\n||heading-1||heading-2\n| cell11   | cell12\n| cell21   | cell22\n",

        me: { alias: 'sign'},
        sign: function(){
            var name = Wiki.UserName || 'UserName';
            return "\\\\\n--" + name + ", "+ new Date().toISOString() + "\\\\\n";
        },

        date: function(k) {
            return new Date().toISOString()+' ';
            //return "[{Date value='" + d.toISOString() + "' }]"
            //return "[{Date " + d.toISOString() + " }]"
        },

        abra: {
            suggest:"abra",
            snippet:"cadabra"
        },
        abrar: {
            suggest:"abrar",
            snippet:"acurix"
        },
        lorem: "This is is just some sample. Don’t even bother reading it; you will just waste your time. Why do you keep reading? Do I have to use Lorem Ipsum to stop you? OK, here goes: Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Still reading? Gosh, you’re impossible. I’ll stop here to spare you.",
        Lorem: { synonym: "lorem" }

=======
        link: {
            key:'l',
            wysiwyg:'createlink',
            snippet: "[description|{pagename or url}|options] "
        },


        linkPart3:{
            suggest: {
                pfx: "\\[(?:[^\\|\\]]+\\|[^\\|\\]]+\\|)([^\\|\\[\\]\\n\\r]*)$",
                match: "^[^\\|\\]\\n\\r]*"
            },
            linkPart3: {
                //"class='category'": "Category link",
                "class='viewer'": "Embedded Viewer",
                "class='slimbox'": "Add a Slimbox Link <span class='icon-slimbox'/> ",
                "class='slimbox-link'": "Change to Slimbox Link <span class='icon-slimbox'/> ",
                "divide1": "",
                "class='btn btn-primary'": "Button style (normal)",
                "class='btn btn-xs btn-primary'": "Button style (small)",
                "divide2": "",
                "target='_blank'": "Open link in new tab"
            }

        },

        linkDlg: {

            //match [description|link], [link] or [link,  do not match [{, [[
            //match '[' + 'any char except \n, [, { or ]' at end of the string
            //note: do not include the [ in the matched string
            suggest: {
                pfx: "\\[(?:[^\\|\\]]+\\|)?([^\\|\\[{\\]\\n\\r]*)$",
                match: "^([^\\|\\[{\\]\\n\\r]*)(?:\\]|\\|)"
            },

            linkDlg: [ Dialog.Selection, {

                caption: "Wiki Link",
                onOpen: function( dialog ){

                    var //dialog = this,
                        key = dialog.getValue();

                    //if empty link, than fetch list of attachments of this page
                    if( !key || (key.trim()=='') ){ key = Wiki.PageName + "/"; }

                    Wiki.jsonrpc("/search/suggestions", [key, 30], function( result ){

                        //console.log("jsonrpc result", result );
                        if( result[0] /* length > 0 */ ){

                            dialog.setBody( result );

                        } else {

                            dialog.hide();

                        }
                    });
                }
            }]
        },

        variableDlg: {
            scope:{ '[{$':'}]'},
            suggest: "\\w+",
            variableDlg: "applicationname|baseurl|encoding|inlinedimages|interwikilinks|jspwikiversion|loginstatus|uptime|pagename|pageprovider|pageproviderdescription|page-styles|requestcontext|totalpages|username"
        },

        // Page access rights
        allow: { alias: "acl" },
        acl: "\n[{ALLOW {permission} principal }]\n",

        permission: {
            scope:{ '[{ALLOW':'}]'},
            suggest: { pfx:"ALLOW (\\w*)$", match:"^\\w+" },
            permission: [Dialog.Selection, {
                cssClass:".dialog-horizontal",
                body:"view|edit|modify|comment|rename|upload|delete"
            }]
        },
        principal: {
            scope:{ '[{ALLOW':'}]'},
            suggest: { pfx:"ALLOW \\w+ (?:[\\w,]+,)?(\\w*)$", match:"^\\w*" },

            principal: [ Dialog.Selection, {

                caption: "Roles, Groups or Users",
                onOpen: function( dialog ){

                    new Request({
                        url: Wiki.XHRPreview,
                        data: { page: Wiki.PageName, wikimarkup: "[{Groups}]" },
                        onSuccess: function(responseText){

                            var body = "Anonymous|Asserted|Authenticated|All";
                            responseText = responseText.replace( /<[^>]+>/g,'').replace(/\s*,\s*/g,'|' ).trim();
                            if(responseText != ""){ body = body + '||' + responseText; }

                            dialog.setBody(body);

                        }
                    }).send();

                }
            }]



        },

        toc: {
            nScope: { "[{":"}]" },
            snippet:"\n[~{TableOfContents }]\n"
        },

        tocParams: {
            scope:{ '[{TableOfContents':'}]'},
            suggest: "\\s",
            tocParams: [Dialog.Selection, {
                caption: "TOC options",
                body:{
                " title='{Page contents}' ":"title",
                " numbered='true' ":"numbered",
                " prefix='{Chap. }' ":"chapter prefix"
                }
            }]
        },

        plugin: "\n[{{plugin}}]\n",

        pluginDlg: {
            //match [{plugin}]  do not match [[{
            //match '[{' + 'any char except \n, or }]' at end of the string
            //note: do not include the [ in the matched string
            suggest: {
                pfx: "(^|[^\\[])\\[{(\\w*)(?:\\|\\])?$",
                //pfx: "(^|[^\\[])\\[{([^\\[\\]\\n\\r]*)(?:\\|\\])?$",
                match: "^([^\\[\\]\\n\\r]*)\\}\\]"
            },
            pluginDlg: [ Dialog.Selection, {
                caption: "Plugin",
                body: {
                "ALLOW {permission} principal ": "Page Access Rights <span class='icon-unlock-alt' />",
                "SET {name}='value'":"Set a Wiki variable",
                "${varname}":"Get a Wiki variable",
                "If name='{value}' page='pagename' exists='true' contains='regexp'\n\nbody\n":"IF plugin",
                "SET alias='${pagename}'":"Set Page Alias",
                "SET page-styles='prettify-nonum table-condensed-fit'":"Set Page Styles",
                "SET sidebar='off'":"Hide Sidebar",
                //"Table":"Advanced Tables",
                //"Groups":"View all Wiki Groups",
                "":"",
                "Counter":"Insert a simple counter",
                "PageViewPlugin":"Count Views of this page",
                "CurrentTimePlugin format='yyyy mmm-dd'":"Insert Current Time",
                "Denounce":"Denounce a link",
                "Image src='${image.jpg}'":"Insert an Image <span class='icon-picture'></span>",
                "IndexPlugin":"Index of all pages",

                "InsertPage page='${pagename}'":"Insert another Page",
                "ListLocksPlugin":"List page locks",
                "RecentChangesPlugin":"Displays the recent changed pages",
                "ReferredPagesPlugin page='{pagename}' type='local|external|attachment' depth='1..8' include='regexp' exclude='regexp'":"Incoming Links (referred pages)",
                "ReferringPagesPlugin page='{pagename}' separator=',' include='regexp' exclude='regexp'":"Outgoing Links (referring pages)",
                "Search query='{Janne}' max='10'":"Insert a Search query",
                "TableOfContents ":"Table Of Contents ",
                "UndefinedPagesPlugin":"List pages that are missing",
                "UnusedPagesPlugin":"List pages that have been orphaned",
                "WeblogArchivePlugin":"Displays a list of older weblog entries",
                "WeblogEntryPlugin":"Makes a new weblog entry",
                "WeblogPlugin page='{pagename}' startDate='300604' days='30' maxEntries='30' allowComments='false'":"Builds a weblog"
                }
            }]

        },

        selectBlock: {
            suggest: function(workarea, caret /*, fromStart*/){

                var selection = workarea.getSelection();

                if( !caret.thin
                  && workarea.isCaretAtStartOfLine()
                  && workarea.isCaretAtEndOfLine()
                  && selection.slice(0,-1).indexOf("\n") > -1 ){

                     //console.log("got block selection" );
                     return { pfx:"", match:workarea.getSelection() }
                }
            },

            selectBlock: [Dialog.Selection, {
                cssClass: ".dialog-horizontal",
                body:{
                    "\n{{{\n{code block}\n}}}\n": "<span style='font-family:monospace;'>code</span>",
                    "\n%%scrollable\n{{{\n{code block}\n}}}/%\n": "<span style='font-family:monospace;'>scrollable-code</span>",
                    "\n%%prettify\n{{{\n{pretiffied code block}\n}}}/%\n": "<span class='pun' style='font-family:monospace;'>prettify</span>"
                }
            }]
        },

        selectStartOfLine: {
            suggest: function(workarea, caret/*, fromStart*/ ){

                var selection = workarea.getSelection();

                if( !caret.thin
                  && workarea.isCaretAtStartOfLine()
                  && workarea.isCaretAtEndOfLine() ){

                     //console.log("got start of line selection", caret);
                     return { pfx:"", match:selection }
                }
            },

            selectStartOfLine: [Dialog.Selection, {
                cssClass: ".dialog-horizontal",
                body:{
                    "\n!!!{header}": "H1",
                    "\n!!{header}": "H2",
                    "\n!{header}": "H3",
                    "__{bold}__": "<b>bold</b>",
                    "''{italic}''": "<i>italic</i>",
                    "{{{monospaced text}}} ": "<tt>mono</tt>",
                    "{{{{code}}}}\n": "<span style='font-family:monospace;'>code</span>",
                    "[description|{link}|options]": "<span class='icon-link'/>",
                    "[{Image src='${image.jpg}'}]": "<span class='icon-picture'/>",
                    "\n[{{plugin}}]\n": "<span class='icon-puzzle-piece'></span>"
                }
            }]
        },
        //Commands triggered by the selection of substrings:
        //    lowest priority vs. other snippets
        selectInline: {
            suggest: function(workarea, caret/*, fromStart*/ ){

                if(!caret.thin){
                     //console.log("got selection", caret);
                     return { pfx:"", match:workarea.getSelection() }
                }
            },

            selectInline: [Dialog.Selection, {
                cssClass: ".dialog-horizontal",
                body:{
                    "__{bold}__":"<b>bold</b>",
                    "''{italic}''":"<i>italic</i>",
                    "{{{monospaced text}}}":"<tt>mono</tt>",
                    "{{{{code}}}}\n": "<span style='font-family:monospace;'>code</span>",
                    "[description|{pagename or url}|options]":"<span class='icon-link'/>",
                    "[{Image src='{image.jpg}'}]":"<span class='icon-picture'/>"
                }
            }]
        }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

}

