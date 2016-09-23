<<<<<<< HEAD
/*!
=======
/*
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
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
/*global $, Class, Options, Events, Undoable, Textarea, Dialog  */
/*eslint-disable no-console */

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
/*
Class: Snipe
    The Snipe class decorates a TEXTAREA object with extra capabilities such as
    section editing, tab-completion, auto-indentation,
    smart typing pairs, suggestion popups, toolbars, undo and redo functionality,
    advanced find & replace capabilities etc.
    The snip-editor can be configured with a set of snippet commands.
    See [getSnippet] for more info on how to define snippets.

Credit:
    Snipe (short for Snip-Editor) was inspired by postEditor (by Daniel Mota aka IceBeat,
<<<<<<< HEAD
    http://icebeat.bitacoras.com ) and ''textMate'' (http://macromates.com/).
=======
    http://icebeat.bitacoras.com ) and ""textMate"" (http://macromates.com/).
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    It has been written to fit as wiki markup editor for the JSPWIKI project.

Arguments:
    el - textarea element
    options - optional, see below

Options:
    tab - (string) number of spaces used to insert/remove a tab in the textarea;
        default is 4
    snippets - (snippet-object) set of snippets, which will be expanded when
        clicking a button or pressing the TAB key. See [getSnippet], [tabSnippet]
    tabcompletion - (boolean, default false) when set to true,
        the tabSnippet keywords will be expanded
        when pressing the TAB key.  See also [tabSnippet]
    directsnips - (snippet-object) set of snippets which are directly expanded
        on key-down. See [getSnippet], [directSnippet]
    smartpairs - (boolean, default false) when set to true,
        the direct snip (aka smart pairs) will be expanded on keypress.
        See also [directSnippet]
    buttons - (array of Elements), each button elemnet will bind its click-event
        with [onButtonClick}. When the click event fires, the {{rel}} attribute
        or the text of the element will be used as snippet keyword.
        See also [tabSnippet].
    dialogs - set of dialogs, consisting of either a Dialog object,
        or a set of {dialog-options} for the predefined
        dialogs suchs as Font, Color and Special.
        See property [initializeDialogs] and [openDialog]
    findForm - (object) list of form-controls. See [onFindAndReplace] handler.
<<<<<<< HEAD
    next - (Element), when pressing Shift-Enter, the textarea will ''blur'' and
        this ''next'' element will ge the focus.
        This compensates the overwritting default TAB handling of the browser.
=======
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    onresize - (function, optional), when present, a textarea resize bar
        with css class {{resize-bar}} is added after the textarea,
        allowing to resize the heigth of the textarea.
        This onresize callback function is called whenever
        the height of the textarea is changed.

Dependencies:
    [Textarea]
<<<<<<< HEAD
    [UndoRedo]
=======
    [Undoable]
    [Snipe.Snips]
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    [Snipe.Commands]

Example:
(start code)
    new Snipe( "mainTextarea", {
<<<<<<< HEAD
        snippets: { bold:"**{bold text}**", italic:"''{italic text}''" },
        tabcompletion:true,
        directsnips: { '(':')', '[' : ']' },
        buttons: $$('a.tool'),
        next:'nextInputField'
=======
        tabcompletion: true,
        snippets: { bold:"**{bold text}**", italic:"\"\"{italic text}\"\"" },
        directsnips: { "(":")", "[" : "]" }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    });
(end)

*/
var Snipe = new Class({

<<<<<<< HEAD
    Implements: [Options, Events],

    Binds: ['sync','shortcut','keystroke','suggest'],
=======
    Implements: [Options, Events, Undoable],

    Binds: ["sync","shortcut","keystroke","suggest","action"],
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    options: {
        tab: "    ", //default tab = 4 spaces
        //autosuggest:false,
        //tabcompletion:false,
<<<<<<< HEAD
        //autocompletion:false, 
        snippets: {},
        directsnips: {}, 
        //container: null,   //DOM element, container for toolbar buttons
        sectionCursor: 'all',
=======
        //autocompletion:false,
        snippets: {},
        directsnips: {},
        //container: null,   //DOM element, container for toolbar buttons
        sectionCursor: "all",
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        sectionParser: function(){ return {}; }
    },

    initialize: function(el, options){

        options = this.setOptions(options).options;

<<<<<<< HEAD
        var self = this,

            /*
            The textarea is cloned into a mainarea and workarea.
            The workarea is visible and used for the actual editing.
            It contains either the full document or a particular section.
            The mainarea is hidden and contains always the full document.
            On submit, the mainarea is send back to the server.
            */
            main = self.mainarea = $(el),
            work = main.clone().erase('name') //.clone(true,false), dont copy ID and name
                .inject( main.hide(), 'before' ),
            container = options.container || work.form;
=======
        this.initializeUndoable(options.undoBtns);

        var self = this,

            /*
            The textarea is cloned into a main and work textarea.
            The work texarea remains visible and is used for the actual editing.
            It contains either the full document or a particular section.
            The main textarea is hidden and contains always the complete document.
            On submit, the mainarea is send back to the server.
            */
            main = self.mainarea = $(el),
            work = main.clone().erase("name").inject( main.hide(), "before" ),
            container = options.container || work.form,
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

            // Augment the textarea element with extra capabilities
            // Make sure the content of the mainarea is always in sync with the workarea
            textarea = self.textarea = new Textarea( work );

<<<<<<< HEAD
        self.undoredo = new UndoRedo( self, {
            undo:container.getElement('[data-cmd=undo]'), 
            redo:container.getElement('[data-cmd=redo]')
        });


        //The Commands class processes all commands
        //   entered via tab-completion, button clicks, dialogs or suggestion dialogs.
        //   Valid commands are given back to the Snipe editor via the onAction event.
        self.commands = new Snipe.Commands( container, {

            onOpen: function(/*cmd, eventHdl*/){ /*work.focus();*/ },

            onClose: function(){ work.focus(); },

            onAction: function(cmd){ self.action(cmd, Array.slice(arguments,1) ); },

            //predefined dialogs
            dialogs: {

                find: [ Dialog.Find, {

                    //dialog: container.getElement('.dialog.find'),

                    data: {
                        //feed the find dialog with searchable content: selection or all
                        get: function(){
                            var s = textarea.getSelection();
                            return (s=='') ? work.value : s;
                        },
                        set: function(v){
                            var s = textarea.getSelectionRange();
                            self.undoredo.onChange();
                            s.thin ? work.value = v : textarea.setSelection(v);
                        }
                    }

                }]
            }
        });

        self.initSnippets( options.snippets );
        self.clearContext();

        work.addEvents({
            keydown: self.keystroke,
            keypress: self.keystroke,
            //fixme: any click outside the suggestion block should clear the active snip -- blur ?
            //blur: self.clearContext.bind(self), //(and hide any open dialogs)
            keyup: self.suggest,
            click: self.suggest,
            change: function(parm){ self.fireEvent('change',parm); }
        });

        //catch shortcut keys when focus on toolbar or textarea
        container.addEvent('keypress', self.shortcut);

    },

    /*
    Function: initSnippets
        Initialize the snippets and collect all shortcut keys and suggestion snips
    */
    initSnippets: function( snips ){

        var self = this, 
            cmd, snip, key, dialogs = {},
            ismac = Browser.Platform.mac, //navigator.userAgent.indexOf('Mac OS X')!=-1
            shortcut = (ismac ? 'meta+' : 'control+');

        self.keys = {};
        self.suggestions = {};

        for( cmd in snips ){
        
            snip = snips[cmd];

            if( typeOf(snip)=='string' ){ snip = {snippet:snip}; }

            Function.from( snip.initialize )(cmd, snip);

            if( key = snip.key ){ 
                if( key.indexOf('+')<0 ){ key = shortcut+key; }
                self.keys[key.toLowerCase()] = cmd; 
            }

            if( typeOf(snip.suggest)=='function' ){ self.suggestions[cmd] = snip; }

            //check for default snip dialogs -- they have the same name as the command
            //EG:  find:{find:[Dialog.Find,{options}] }
            if( snip[cmd] ){ dialogs[cmd] = snip[cmd]; }

        }

        //initialize all detected dialogs
        console.log("snip dialogs",Object.keys(dialogs).length);
        self.commands.addDialogs(dialogs, self.textarea);
        
    },


=======
        self.directsnips = new Snipe.Snips( textarea, options.directsnips );
        self.snippets    = new Snipe.Snips( textarea, options.snippets );

        self.snippets.dialogs.find = [ Dialog.Find, {
            data: {
                //feed the find dialog with searchable content
                get: function(){
                    var selection = textarea.getSelection();
                    return (selection=="") ? work.value : selection;
                    //return (selection=="") ? textarea.getValue() : selection;
                },
                set: function(v){
                    var s = textarea.getSelectionRange();
                    //self.fireEvent("beforeChange");
                    //textarea[ s.thin ? "setValue" : "setSelection" ](v);
                    s.thin ? work.value = v : textarea.setSelection(v);
                    self.fireEvent("change");
                }
            }
        }];

        //Snipe.Commands takes care of capturing commands.
        //Commands are entered via tab-completion, button clicks, or a dialog.
        //Snipe.Commands ensures that at most one dialog is open at the same time.
        self.commands = new Snipe.Commands( container, {
            //onOpen: function( /*command*/ ){ work.focus(); },
            onClose: function( /*command*/ ){ work.focus(); },
            onAction: self.action,
            dialogs: self.snippets.dialogs,
            relativeTo: textarea
        });


        self.reset();

        work.addEvents({

            keydown: self.keystroke,
            keypress: self.keystroke,

            //fixme: any click outside the suggestion block should clear the context -- blur ?
            //blur: self.reset.bind(self),
            keyup: self.suggest.debounce(), //(250, true)
            click: self.suggest.debounce(),

            input: (function( ){
                console.log("***Snipe: dom textarea input :");
                self.fireEvent("change");
            }).debounce()

        });

        //catch shortcut keys when focus anywhere on the snipe editor (toolbar, textarea..)
        container.addEvent("keydown", self.shortcut);

    },

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    /*
    Function: toElement
        Retrieve textarea DOM element;

    Example:
<<<<<<< HEAD
    >    var snipe = new Snipe('textarea-element');
    >    $('textarea-element') == snipe.toElement();
    >    $('textarea-element') == $(snipe);
=======
    >    var snipe = new Snipe("textarea-element");
    >    $("textarea-element") == snipe.toElement();
    >    $("textarea-element") == $(snipe);
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    */
    toElement: function(){
        return $(this.textarea);
    },

    /*
    Function: get
<<<<<<< HEAD
        Retrieve some of the public properties of the snip-editor.

    Arguments:
        item - textarea|snippets|tabcompletion|directsnips|smartpairs|autosuggest
    */
    get: function(item){

        return( /mainarea|textarea/.test(item) ? this[item] : 
                    /snippets|directsnips|autosuggest|tabcompletion|smartpairs/.test(item) ? this.options[item] : 
                        null );
=======
        Retrieve some of the public properties or options of the snip-editor.

    Arguments:
        item - mainarea|textarea|snippets|directsnips|autosuggest|tabcompletion|smartpairs
    */
    get: function(item){

        return( /mainarea|textarea/.test(item) ? this[item] :
                /snippets|directsnips|autosuggest|tabcompletion|smartpairs/.test(item) ? this.options[item] :
                null );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    },

    /*
    Function: set
<<<<<<< HEAD
        Set/Reset some of the public options of the snip-editor.

    Arguments:
        item - snippets|tabcompletion|directsnips|smartpairs|autosuggest
=======
        Set/Reset some of the options of the snip-editor.

    Arguments:
        item - snippets|directsnips|autosuggest|tabcompletion|smartpair
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        value - new value
    Returns
        this Snipe object
    */
    set: function(item, value){

        if( /snippets|directsnips|autosuggest|tabcompletion|smartpairs/.test(item) ){
            this.options[item] = value;
        }
<<<<<<< HEAD
        return this;
=======
        return this.fireEvent("change");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    /*
    Function: shortcut.
<<<<<<< HEAD
        Handle shortcut keys: Ctrl+shortcut key.
=======
        Handle shortcut keys: Ctrl/Meta+shortcut key.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        This is a "Keypress" event handler connected to the container element
        of the snip editor.
    Note:
        Safari seems to choke on Cmd+b and Cmd+i. All other Cmd+keys are fine. !?
        It seems in those cases, the event is fired on document level only.
<<<<<<< HEAD
    */
    shortcut: function(e){

        var key = (e.shift ? 'shift+':'') + 
                    (e.control ? 'control+':'') + 
                      (e.meta ? 'meta+':'') + 
                        (e.alt ? 'alt+':'') + 
                          e.key,

            keycmd = this.keys[key];

        //console.log(key);
        if ( keycmd ){
            console.log(this.keys,'shortcut',key,keycmd);
            e.stop();
            this.commands.action( keycmd );
=======

        More info http://unixpapa.com/js/key.html
    */
    shortcut: function(e){

        var key, keycmd;

        if( e.shift || e.control || e.meta || e.alt ){

            key = (e.shift ? "shift+":"") +
                    (e.control ? "control+":"") +
                      (e.meta ? "meta+":"") +
                        (e.alt ? "alt+":"") +
                          e.key,

            //console.log("shortcut ",key);
            keycmd = this.snippets.keys[key];

            if ( keycmd ){

                //console.log("Snipe shortcut",key,keycmd,e.code);
                e.stop();
                this.commands.action( keycmd );

            }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        }

    },

    /*
    Function: keystroke
        This is a cross-browser keystroke handler for keyPress and keyDown
        events on the textarea.

    Note:
        The KeyPress is used to accept regular character keys.

        The KeyDown event captures all special keys, such as Enter, Del, Backspace, Esc, ...
        To work around some browser incompatibilities, a hack with the {{event.which}}
        attribute is used to grab the actual special chars.

        Ref. keyboard event paper by Jan Wolter, http://unixpapa.com/js/key.html

        Todo: check on Opera

    Arguments:
        e - (event) keypress or keydown event.
    */
    keystroke: function(e){

<<<<<<< HEAD
        //console.log(e.key, e.code + " keystroke "+e.shift+" "+e.type+"+meta="+e.meta+" +ctrl="+e.control );

        if( e.type=='keydown' ){

            //Exit if this is a normal key; process special chars with the keydown event
            if( e.key.length==1 ) return;

        } else { // e.type=='keypress'

            //CHECKME
            //Only process regular character keys via keypress event
            //Note: cross-browser hack with 'which' attribute for special chars
            if( !e.event.which /*which==0*/ ){ return; }

            //CHECKME: Reset faulty 'special char' treatment by mootools
            //console.log( e.key, String.fromCharCode(e.code).toLowerCase());
            
=======
        //console.log(e.type, e.key, e.code, "shift:"+e.shift,"meta:"+e.meta,"ctrl:"+e.control );

        if( e.type == "keydown" ){

            //Exit if this is a normal key; process special chars with the keydown event
            if( e.key.length == 1 ){ return; }

        } else { // e.type == "keypress"

            //CHECKME
            //Only process regular character keys via keypress event
            //Note: cross-browser hack with "which" attribute for special chars
            if( !e.event.which /*which==0*/ ){ return; }

            //CHECKME: Reset faulty "special char" treatment by mootools
            //console.log( e.key, String.fromCharCode(e.code).toLowerCase());

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            e.key = String.fromCharCode(e.code).toLowerCase();

        }

        var self = this,
            txta = self.textarea,
<<<<<<< HEAD
            el = $(txta),
            key = e.key,
            caret = txta.getSelectionRange(),
            scroll = el.getScroll();

        el.focus();

        if( /up|down|esc/.test(key) ){

            self.clearContext();
=======
            //el = txta.toElement(),
            key = e.key,
            caret = txta.getSelectionRange();

        txta.toElement().focus();

        if( /up|down|esc/.test(key) ){

            self.reset();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        } else if( /tab|enter|delete|backspace/.test(key) ){

            self[key](e, txta, caret);

        } else {

<<<<<<< HEAD
            self.directSnippet(e, txta, caret);

        }

        el.scrollTo(scroll);

=======
            self.smartPairs(e, txta, caret);

        }

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    /*
    Function: enter
<<<<<<< HEAD
        When the Enter key is pressed, the next line will be ''auto-indented''
        or space-aligned with the previous line.
=======
        When the Enter key is pressed, the next line will be auto-indented
        with the previous line.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        Except if the Enter was pressed on an empty line.

    Arguments:
        e - event
        txta - Textarea object
        caret - caret object, indicating the start/end of the textarea selection
    */
<<<<<<< HEAD
    enter: function(e, txta, caret) {

        //if( this.hasContext() ){
            //fixme
            //how to 'continue previous snippet ??
            //eg '\n* {unordered list item}' followed by TAB or ENTER
            //snippet should always start with \n;
            //snippet should have a 'continue on enter' flag ?
        //}

        this.clearContext();

        if( caret.thin ){

            var prevline = txta.getFromStart().split(/\r?\n/).pop(),
                indent = prevline.match( /^\s+/ );

            if( indent && (indent != prevline) ){
                e.stop();
                txta.insertAfter( '\n' + indent[0] );
            }

        }
=======
    enter: function(e, txta /*, caret*/ ) {

        this.reset();

        var prevline = txta.getFromStart().match( /(?:^|\r?\n)([ \t]+)(.*)$/ );
        //prevline[1]=sequence of spaces (indentation string)
        //prevline[2]=non-blank tail of the prevline

        if( !e.shift && prevline && ( prevline[2] != "" ) ){

            e.stop();
            //console.log("enter key - autoindent", prevline);
            txta.insertAfter( "\n" + prevline[1] );

        }

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    /*
    Function: backspace
        Remove single-character directsnips such as {{ (), [], {} }}

    Arguments:
        e - event
        txta - Textarea object
        caret - caret object, indicating the start/end of the textarea selection
    */
    backspace: function(e, txta, caret) {

        if( caret.thin  && (caret.start > 0) ){

            var key = txta.getValue().charAt(caret.start-1),
<<<<<<< HEAD
                snip = this.getSnippet( this.options.directsnips, key );

            if( snip && (snip.snippet == txta.getValue().charAt(caret.start)) ){

                /* remove the closing pair character */
                txta.setSelectionRange( caret.start, caret.start+1 )
                    .setSelection('');
=======
                snip = this.directsnips.get( key );

            if( snip && (snip.snippet == txta.getValue().charAt(caret.start)) ){

                // remove the closing pair character
                txta.setSelectionRange( caret.start, caret.start+1 )
                    .setSelection("");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

            }
        }
    },

    /*
    Function: delete
<<<<<<< HEAD
        Removes the next TAB (4spaces) if matched
=======
        Removes the previous TAB (4spaces) if matched
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    Arguments:
        e - event
        txta - Textarea object
        caret - caret object, indicating the start/end of the textarea selection
    */
    "delete": function(e, txta, caret) {

        var tab = this.options.tab;
<<<<<<< HEAD
=======
        //console.log("delete key");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        if( caret.thin && !txta.getTillEnd().indexOf(tab) /*index==0*/ ){

            e.stop();
            txta.setSelectionRange(caret.start, caret.start + tab.length)
<<<<<<< HEAD
                .setSelection('');
=======
                .setSelection("");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        }
    },

    /*
    Function: tab
        Perform tab-completion function.
        Pressing a tab can lead to :
        - expansion of a snippet command cmd and selection of the first parameter
<<<<<<< HEAD
        - selection of the next snippet parameter (if active snippet)
=======
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        - otherwise, expansion to set of spaces (4)


    Arguments:
        e - event
        txta - Textarea object
        caret - caret object, indicating the start/end of the textarea selection

    */
    tab: function(e, txta, caret){

<<<<<<< HEAD
        var self = this,
            snips = self.options.snippets,
            fromStart = txta.getFromStart(),
            len = fromStart.length,
            cmd, cmdlen; // ok = false;
=======
        var self = this, cmd;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        e.stop();

        if( self.options.tabcompletion ){

<<<<<<< HEAD
            if( self.hasContext() ){

                return self.nextAction(txta, caret);

            }

            if( caret.thin ){

                //lookup the command backwards from the text preceeding the caret
                for( cmd in snips ){

                    cmdlen = cmd.length;

                    if( (len >= cmdlen) && (cmd == fromStart.slice( - cmdlen )) ){

                        //first remove the command
                        txta.setSelectionRange(caret.start - cmdlen, caret.start)
                            .setSelection('');

                        return self.commands.action( cmd );

                    }
                }
=======
            if( caret.thin && ( cmd = self.snippets.match() ) ){

                //remove the command
                txta.setSelectionRange(caret.start - cmd.length, caret.start)
                    .setSelection( "" );

                return self.commands.action( cmd );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            }

        }

        //if you are still here, convert the tab into spaces
<<<<<<< HEAD
        self.convertTabToSpaces(e, txta, caret);
=======
        self.tab2spaces(e, txta, caret);
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    },

    /*
<<<<<<< HEAD
    Function: convertTabToSpaces
=======
    Function: tab2spaces
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        Convert tabs to spaces. When no snippets are detected, the default
        treatment of the TAB key is to insert a number of spaces.
        Indentation is also applied in case of multi-line selections.

    Arguments:
        e - event
        txta - Textarea object
        caret - caret object, indicating the start/end of the textarea selection
    */
<<<<<<< HEAD
    convertTabToSpaces: function(e, txta, caret){

        var tab = this.options.tab,
            selection = txta.getSelection(),
            fromStart = txta.getFromStart();
            isCaretAtStart = txta.isCaretAtStartOfLine();

        //handle multi-line selection
        if( selection.indexOf('\n') > -1 ){

            if( isCaretAtStart ){ selection = '\n' + selection; }
=======
    tab2spaces: function(e, txta, caret){

        var tab = this.options.tab,
            selection = txta.getSelection(),
            fromStart = txta.getFromStart(),
            isCaretAtStart = txta.isCaretAtStartOfLine();

        //handle multi-line selection
        if( selection.indexOf("\n") > -1 ){

            if( isCaretAtStart ){ selection = "\n" + selection; }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

            if( e.shift ){

                //shift-tab: remove leading tab space-block
<<<<<<< HEAD
                selection = selection.replace(RegExp('\n'+tab,'g'),'\n');
=======
                selection = selection.replace(RegExp("\n"+tab,"g"),"\n");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

            } else {

                //tab: auto-indent by inserting a tab space-block
<<<<<<< HEAD
                selection = selection.replace(/\n/g,'\n'+tab);
=======
                selection = selection.replace(/\n/g,"\n"+tab);
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

            }

            txta.setSelection( isCaretAtStart ? selection.slice(1) : selection );

        } else {

            if( e.shift ){

<<<<<<< HEAD
                //shift-tab: remove 'backward' tab space-block
                if( fromStart.test( tab + '$' ) ){

                    txta.setSelectionRange( caret.start - tab.length, caret.start )
                        .setSelection('');
=======
                //shift-tab: remove "backward" tab space-block
                if( fromStart.test( tab + "$" ) ){

                    txta.setSelectionRange( caret.start - tab.length, caret.start )
                        .setSelection("");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

                }

            } else {

                //tab: insert a tab space-block
                txta.setSelection( tab )
                    .setSelectionRange( caret.start + tab.length );

            }

        }
    },

    /*
    Function: setContext
        Store the active snip. (state)
        EG, subsequent handling of dialogs.
        As long as a snippet is active, the textarea gets the css class {{.activeSnip}}.

    Arguments:
        snip - snippet object to make active
    */
    hasContext: function(){
<<<<<<< HEAD
        return !!this.context.snip;
=======

        return !!this.context.snip;

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    setContext: function( snip, suggest ){

<<<<<<< HEAD
        this.context = {snip:snip, suggest:suggest};
        $(this).addClass('activeSnip');
=======
        //console.log("Snipe.setContext",snip,suggest);
        this.context = { snip:snip, suggest:suggest };
        this.toElement().addClass("activeSnip");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    },

    /*
<<<<<<< HEAD
    Function: clearContext
        Clear the context object, and remove the css class from the textarea.
        Also make sure that no dialogs are left open.
    */
    clearContext: function(){

        this.context = {};
        this.commands.close();
        $(this).removeClass('activeSnip').focus();

    },

    /*
    Function: getSnippet
        Retrieve and validate the snippet. Returns false when the snippet is not
        found or not in scope.

    About snippets:
    In the simplest case, you can use snippets to insert plain text that you do not
    want to type again and again. The snippet is expanded when hitting
    the Tab key: the ''snippet'' is replaced by ''snippet expansion text''.

    (start code)
    var tabSnippets = {
        <snippet1> : <snippet expansion text>,
        <snippet2> : <snippet expansion text>
    }
    (end)

    See also [DirectSnippets].

    For example, following snippet will expand the ''toc'' text into the
    TableOfContents wiki plugin call. Don't forget to escape '{' and '}'
    with a backslash, because they have a special meaning. (see below)
    Use the '\n' charater to define multi-line snippets. Start the snippet
    with '\n' to make sure the snippet starts on a new line.

    (start code)
    "toc": "\n[\{TableOfContents \}]\n"
    (end)

    After tab-completion, the caret is placed just after the expanded snippet.

    Snippet parameters:
    If you want, you can put ''{parameters}'' inside the snippet. Pressing the tab
    will jump to the next parameter. If you are ok with the default value,
    just tab over it. If not, start typing to overwrite it.

    (start code)
    "bold": "__{some bold text}__"
    (end)

    You can have multiple ''{parameters}'' too. Pressing more tabs will get you there.

    (start code)
    "link": "[{link text}|{pagename}]"
    (end)

    Extended snippet syntax:
    So far we discussed the simple snippet syntax. In order to unlock more advanced
    snippet features, you'll need to use the extended snippet syntax.

    (start code)
    "toc": {
        snippet : "\n[\{TableOfContents \}]\n"
    }
    (end)

    which is actually the same as

    (start code)
    "toc": "\n[\{TableOfContents \}]\n"
    (end)

    Snippet synonyms:
    Instead of defining the snippet text, you can also refer to another snippet.
    This allows you to create synonyms.

    (start code)
    "allow": {
        synonym: "acl"
    }
    (end)

    Dynamic snippets:
    Next to static snippet texts, you can also dynamically generate
    the snippet text through a javascript function. For example, you could
    use ajax calls to populate the snippet on the fly. The function should return
    either the string (simple snippet syntax) or a snippet object.
    (eg return {{ { snippet:"..." } }} )

    (start code)
    "date": function(e, textarea){
        return new Date().toLocaleString();
    }
    (end)

    or

    (start code)
    "date": function(e, textarea){
        var d = new Date().toLocaleString();
        return { 'snippet': d };
    }
    (end)

    Snippet scope:
    See [inScope] to see how to restrict the scope of a snippet.

    Parameter dialog boxes:
    To help the entry of parameters, you can specify a predefined set of choices
    for a ''{parameter}'', as a string (with | separator), js array or js object.
    A parameter dialog box will be displayed to provide easy selection of
    one of the choices.  See [Dialog.Selection].

    Example of parameter suggestion-list:

    (start code)
    "acl": {
        snippet: "[\{ALLOW {permission} {principal(,principal)} \}]",
        permission: "view|edit|modify|comment|rename|upload|delete",
        "principal(,principal)": "Anonymous|Asserted|Authenticated|All"
        }
    }
    "acl": {
        snippet: "[\{ALLOW {permission} {principal(,principal)} \}]",
        permission: [view,edit,modify]
        }
    }
    "acl": {
        snippet: "[\{ALLOW {permission} {principal(,principal)} \}]",
        permission: {'Only read access':'view','Read and write access':'edit','R/W, rename, delete access':'modify' }
        }
    }
    (end)


    Arguments:
        snips - snippet collection object for lookup of the key
        key - snippet key. If not present, retreive the key from
            the textarea just to the left of the caret. (i.e. tab-completion)

    Returns:
        Return a snippet object or false.
        (start code)
        returned_object = false || {
                key: "snippet-key",
                snippet: " snippet-string ",
                text: " converted snippet-string, no-parameter braces, auto-indented ",
                parms: [parm1, parm2, "last-snippet-string" ]
            }
        (end)
    */
    getSnippet: function( snips, cmd ){

        var self = this,
            txta = self.textarea,
            fromStart = txta.getFromStart(),
            snip = snips[cmd],
            tab = this.options.tab,
            parms = [],
            s,last;

        if( snip && snip.synonym ){ snip = snips[snip.synonym]; }

        snip = Function.from(snip)(self, [cmd]);

        if( typeOf(snip) == 'string' ){ snip = { snippet:snip }; }

        if( !snip || !self.inScope(snip, fromStart) ){ return false; }

        s = snip.snippet || '';

        //parse snippet and build the parms[] array with all {parameters}
        s = s.replace( /\\?\{([^{}]+)\}/g, function(match, name){

            if( match.charAt(0) == '\\' ){ return match.slice(1); }
            parms.push(name);
            return name;

        }).replace( /\\\{/g, '{' );
        //and finally, replace the escaped '\{' by real '{' chars

        //also push the last piece of the snippet onto the parms[] array
        last = parms.getLast();
        if(last){ parms.push( s.slice(s.lastIndexOf(last) + last.length) ); }

        //collapse \n of previous line if the snippet starts with \n
        if( s.test(/^\n/) && ( fromStart.test( /(^|[\n\r]\s*)$/ ) ) ) {
            s = s.slice(1);
            //console.log("remove leading \\n");
        }

        //collapse \n of subsequent line when the snippet ends with a \n
        if( s.test(/\n$/) && ( txta.getTillEnd().test( /^\s*[\n\r]/ ) ) ) {
            s = s.slice(0,-1);
            //console.log("remove trailing \\n");
        }

        //auto-indent the snippet's internal newlines \n
        var prevline = fromStart.split(/\r?\n/).pop(),
            indent = prevline.match(/^\s+/);
        if( indent ){ s = s.replace( /\n/g, '\n' + indent[0] ); }

        //complete the snip object
        snip.text = s;
        snip.parms = parms;

        return snip;
    },

    /*
    Function: inScope
        Sometimes it is useful to restrict the scope of a snippet, and only allow
        the snippet expansion in specific parts of the text. The scope parameter allows
        you to do that by defining start and end delimiting strings.
        For example, the following "fn" snippet will only expands when it appears
        inside the scope of a script tag.

        (start code)
        "fn": {
            snippet: "function( {args} )\{ \n    {body}\n\}\n",
            scope: {"<script":"</script"} //should be inside this bracket
        }
        (end)

        The opposite is possible too. Use the 'nScope' or not-in-scope parameter
        to make sure the snippet is only inserted when not in scope.

        (start code)
        "special": {
            snippet: "{special}",
            nScope: { "%%(":")" } //should not be inside this bracket
        },
        (end)

    Arguments:
        snip - Snippet Object
        text - (string) used to check for open scope items

    Returns:
        True when the snippet is in scope, false otherwise.
    */
    inScope: function(snip, text){

        var pattern, pos, scope=snip.scope, nscope=snip.nscope;

        if( scope ){

            if( typeOf(scope)=='function' ){

                return scope( this.textarea );

            } else {

                for( pattern in scope ){

                    pos = text.lastIndexOf(pattern);
                    if( (pos > -1) && (text.indexOf( scope[pattern], pos ) == -1) ){ return 1 /*true*/; }

                }
                return false;
            }
        }

        if( nscope ){

            for( pattern in nscope ){

                pos = text.lastIndexOf(pattern);
                if( (pos > -1) && (text.indexOf( nscope[pattern], pos ) == -1) ){ return !1 /*false*/; }

            }

        }
        return 1 /*true*/;
    },


    /*
    Function: directSnippet
=======
    Function: reset
        Clear the context object, and remove the css class from the textarea.
        Also make sure that no dialogs are left open.
    */
    reset: function(){

        //console.log("Snipe:reset", this.context);
        this.context = {};
        this.toElement().removeClass("activeSnip").focus();
        this.commands.close();

    },


    /*
    Function: smartPairs
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        Direct snippet are invoked immediately when the key is pressed
        as opposed to a [tabSnippet] which are expanded after pressing the Tab key.

        Direct snippets are typically used for smart typing pairs,
        such as {{ (), [] or {}. }}
        Direct snippets can also be defined through javascript functions
        or restricted to a certain scope. (ref. [getSnippet], [inScope] )

        First, the snippet is retrieved based on the entered character.
        Then, the opening- and closing- chars are inserted around the selection.

    Arguments:
        e - event
        txta - Textarea object
        caret - caret object, indicating the start/end of the textarea selection

    Example:
    (start code)
    directSnippets: {
<<<<<<< HEAD
        '"' : '"',
        '(' : ')',
        '{' : '}',
        "<" : ">",
        "'" : {
            snippet:"'",
=======
        """ : """,
        "(" : ")",
        "{" : "}",
        "<" : ">",
        """ : {
            snippet:""",
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            scope:{
                "<javascript":"</javascript",
                "<code":"</code",
                "<html":"</html"
            }
        }
    }
    (end)

    */
<<<<<<< HEAD
    directSnippet: function(e, txta, caret){

        var self = this,
            options = self.options,

            snip = self.getSnippet( options.directsnips, e.key );

        if( snip && options.smartpairs ){

            e.stop();

            txta.setSelection( e.key, txta.getSelection(), snip.snippet )
                .setSelectionRange( caret.start+1, caret.end+1 );
=======
    smartPairs: function(e, workarea, caret){

        var snip, key = e.key;

        if( this.options.smartpairs && (snip = this.directsnips.get(key)) ){

            e.stop();

            //insert the keystroke, retain the selection and insert the snippet outcome
            //and keep the original selection (caret)
            workarea.setSelection( key, workarea.getSelection(), snip.snippet )
                    .setSelectionRange( caret.start + 1, caret.end + 1 );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        }

    },

<<<<<<< HEAD
    /*
    Function: action
        This function executes the proper action.
        The command can be given throug TAB-completion or by pressing a button.

        It looks up the snippet and inserts its value in the textarea.

        When text was selected prior to the click event, the selection will
        be injected in one of the snippet {parameter}.

        Additionally, when the snippet only contains one {parameter},
        the snippet will toggle: i.e. remove the snippet when already present,
        otherwise insert the snippet.

        TODO:
        Prior to the insertion of the snippet, the caret will be moved to the beginning of the line.
        Prior to the insertion of the snippet, the caret will be moved to the beginning of the next line.

    Arguments:
        e - (event) keypress or keydown event.
    */
    action: function( cmd, args ){

        var self = this,
            txta = self.textarea,
            caret = txta.getSelectionRange(),
            snip = self.context.snip || self.getSnippet(self.options.snippets, cmd),
            s;

        //console.log("Action: "+cmd+" ("+args+") text=["+snip.text+"] parms=["+snip.parms+"] "+!!snip);

        if( snip ){

            s = snip.text;

            if( snip.action ){    //eg undo, redo

                return snip.action.call(self, cmd, snip, args );

            }

            self.undoredo.onChange();

            if( snip.event ){

                return self.fireEvent(snip.event, [cmd, args]);

            }


            $(txta).focus();

            if( self.options.autosuggest && self.context.suggest ){

                return self.suggestAction( cmd, args );

            }


            if( !caret.thin && (snip.parms.length==2) ){
                s = self.toggleSnip(txta, snip, caret);
                //console.log("toggle snippet: "+s+" parms:"+snip.parms);
            }

            //inject args into the snippet parms
            if( args ){
                args.each( function(arg){
                    if(snip.parms.length > 1){
                        s = s.replace( snip.parms.shift(), arg );
                    }
                });
                //console.log("inject args: "+s+" "+snip.parms);
            }

            //inject selected text into first snippet parm
            if( !caret.thin && (snip.parms[1] /*length>1*/) ){
                s = s.replace( snip.parms.shift(), txta.getSelection() );
                //console.log("inject selection: "+s+" "+snip.parms);
            }

            //now insert the snippet text
            txta.setSelection( s );

            if( !snip.parms.length/*length==0*/ ){

                //when no selection, move caret after the inserted snippet,
                //otherwise leave the selection unchanged
                if( caret.thin ){ txta.setSelectionRange( caret.start + s.length ); }
                //console.log("action:: should we clear this ? " + self.hasContext() );
                self.clearContext();

            } else {

                //this snippet has one or more parameters
                //store the active snip and process the next {parameter}
                //checkme !!
                if( !self.hasContext() ){ self.setContext( snip ); }
                caret = txta.getSelectionRange(); //update new caret
                self.nextAction(txta, caret);

            }

        }

    },

    /*
    Function: toggleSnip
        Toggle the prefix and suffix of a snippet.
        Eg. toggle between {{__text__}} and {{text}}.
        The selection will be matched against the snippet.

    Precondition:
        - the selection is not empty (caret.thin = false)
        - the snippet has exatly one {parameter}

    Arguments:
        txta - Textarea object
        snip - Snippet object
        caret - Caret object {start, end, thin}

    Returns:
        - (string) replacement string for the selection.
            By default, returns snip.text
        - the snip.parms will be set to [] is toggle was executed successfully
        Eventually the selection will be extended if the
        prefix and suffix were just outside the selection.
    */
    toggleSnip: function(txta, snip, caret){

        var s = snip.text,
            //get the first and last textual parts of the snippet
            arr = s.trim().split( snip.parms[0] ),
            fst = arr[0],
            lst = arr[1],
            re = new RegExp( '^\\s*' + fst.trim().escapeRegExp() + '\\s*(.*)\\s*' + lst.trim().escapeRegExp() + '\\s*$' );

        if( (fst+lst)!='' ){

            s = txta.getSelection();
            snip.parms = [];

            // if pfx & sfx (with optional whitespace) are matched: remove them
            if( s.test(re) ){

                s = s.replace( re, '$1' );

            // if pfx/sfx are matched just outside the selection: extend selection
            } else if( txta.getFromStart().test(fst+'$') && txta.getTillEnd().test('^'+lst) ){

                txta.setSelectionRange(caret.start-fst.length, caret.end+lst.length);

            // otherwise, insert snippet and set caret between pfx and sfx
            } else {

                txta.setSelection( fst+lst ).setSelectionRange( caret.start + fst.length );
            }
        }
        return s;
    },

    /*
    Method: suggest
        Suggestion snippets are dialog-boxes appearing as you type.
        When clicking items in the suggest dialogs, content is inserted
        in the textarea.

    */
    suggest: function(){

        var self = this,
            txta = self.textarea,
            caret = txta.getSelectionRange(),
            fromStart = txta.getFromStart(),
            suggestions = self.suggestions,
            cmd, suggest, snip;

        if( !self.options.autosuggest ) return;

        for( cmd in suggestions ){

            snip = suggestions[cmd];
            suggest = snip.suggest(txta, caret);

            if( suggest /*&& self.inScope(snip, fromStart)*/ ){

                if(!suggest.tail) suggest.tail = 0; //ensure default value

                //console.log( "Suggest: "+ cmd + " [" + JSON.encode(suggest)+"]" );
                self.setContext( snip, suggest );
                return self.commands.action(cmd, suggest.match);

            }
        }

        //if you got here, no suggestions
        this.clearContext();

    },

    /*
    Method: suggestAction
        <todo>
        suggest = { start: start-position , match:'string', tail: length }
    */
    suggestAction: function( cmd, value ){

        var self = this,
            txta = self.textarea,
            suggest = self.context.suggest,
            end = suggest.start + suggest.match.length + suggest.tail;


        //console.log('SuggestAction: '+ cmd+' (' +value + ') [' + JSON.encode(suggest) + ']');

        //set the selection to the replaceable text, and inject the new value
        txta.setSelectionRange( suggest.start, end ).setSelection( value );

        //if tail, set the selection on the tail --why ??
        if( suggest.tail>0 ){
            txta.setSelectionRange( end - suggest.tail, txta.getSelectionRange().end );
        }

        self.clearContext();
        return self.suggest();

    },

    /*
    Function: nextAction
        Process the next ''{parameter}'' of the active snippet as you tab along
        or after you clicked a button or closed a dialog.

    Arguments:
        txta - Textarea object
        caret - caret object, indicating the start/end of the textarea selection
    */
    nextAction: function(txta, caret){

        var self = this,
            snip = self.context.snip,
            parms = snip.parms,
            dialog,
            pos;

        while( parms[0] /*.length > 0*/ ){

            dialog = parms.shift();
            pos = txta.getValue().indexOf(dialog, caret.start);

            //console.log("next action: "+dialog+ " pos:" + pos + " parms: "+parms+" caret:"+caret.start);

            //found the next {dialog} or possibly the end of the snippet
            if( (dialog !='') && (pos > -1) ){

                if( parms[0] /*.length > 0*/ ){

                    // select the next {dialog}
                    txta.setSelectionRange( pos, pos + dialog.length );

                    //invoke the new dialog
                    //console.log('next action: invoke '+dialog+" "+snip[dialog])
                    self.commands.action( dialog, snip[dialog] );

                    //remember every selected snippet dialog
                    self.undoredo.onChange();

                    return; // and retain the context snip for subsequent {dialogs}

                } else {

                    // no more {dialogs}, move the caret after the end of the snippet
                    txta.setSelectionRange( pos + dialog.length );

                }
            }
        }

        self.clearContext();
    },

    /*
    Function: getState
        Return the current state which consist of the content and selection of the textarea.
        It implements the ''Undoable'' interface called from the [UndoRedo] class.
=======

    /*
    Method: suggest
        Suggestion snippets are dialog-boxes appearing as you type.
        When clicking items in the suggest dialogs, content is inserted
        in the textarea.

    */
    suggest: function( /*event*/ ){

        var suggest;

        if( this.options.autosuggest ){

            if ( (suggest = this.snippets.matchSuggest()) ){

                console.log( "Snipe.suggest ",suggest );
                this.setContext( null/*snip*/, suggest );
                return this.commands.action( suggest.cmd , suggest.pfx );

            }

            this.commands.close();
        }
    },


    /*
    Function: action
        This function executes the command action.
        It will insert the snippet and update the selection and caret.

        It looks up and processes the snippet.
        - insert the snippet text at the caret in the textarea.
        - when text was selected (prior to the click or keyup event):
            - the snippet text will replace the selection
            - the selection will be passed as a parameter into the snippet
            - if the snippet has ONE parameter, the snippet text will be toggled:
              i.e. remove the snippet when already present, otherwise insert the snippet

    Arguments:
        cmd - (string) used to loopup the snippet
        args - (optional) additional snippet arguments (eg value passed via a dialog)
    */
    action: function( cmd ){

        var self = this,
            args = Array.slice(arguments, 1),
            snip = self.snippets.get( cmd ),
            //snippet = snip.snippet,
            s = snip.snippet,
            suggest = snip.suggest && self.context.suggest,

            txta = self.textarea,
            caret = txta.getSelectionRange(),
            hasCaret = !caret.thin,
            caretStart = caret.start,

            pfx, sel, sfx, snipArr, selectionLength,
            /* match "pfx{selection}sfx" into ["pfx","selection","sfx"] */
            /* do not match "pfx~{do-not-match}sfx"  */
            snipSelection = /(^|[\S\s]*[^~])\{([^\{\}]+)\}([\S\s]*)/,
            snipEscapeChar = /~\{/g;

        function setCaret(start,end){ txta.setSelectionRange(start, end); }
        function removeEscapeChar(s){ return s.replace(snipEscapeChar, "{"); }

        console.log("Snipe:action ", snip, s, cmd, args,suggest );

        if( snip ){

            if( snip.event ){

                //console.log("Snipe:action() fire-event: ",snip.event);
                return self.fireEvent(snip.event, arguments);

            }

            this.fireEvent("beforeChange"); //CHECKME

            //adjust caret based on suggestion context
            if( suggest ){

                s = args.join();  //result of the suggest dialog
                selectionLength = suggest.match.length;

                if( s.startsWith(suggest.pfx) ){

                    s = s.slice(suggest.pfx.length);
                    selectionLength -= suggest.pfx.length;

                } else {

                    caretStart -= suggest.pfx.length;

                }

                //move the caret according to suggest pfx and match
                setCaret( caretStart, caretStart +  selectionLength );
                hasCaret = selectionLength > 0;
            }

            if( (snipArr = s.match( snipSelection )) ){

                pfx = removeEscapeChar( snipArr[1] );
                sel = hasCaret ?  txta.getSelection() : snipArr[2] ;
                sfx = removeEscapeChar( snipArr[3] );

                console.log("found a 'pfx{selection}sfx' snippet", snipArr, pfx, sel, sfx,hasCaret );

                if( hasCaret ) {

                    if( sel.startsWith(pfx) && sel.endsWith(sfx) ){

                        console.log("TOGGLE: pfx/sfx matched inside the selection",caret.start,caret.end);
                        sel = sel.slice( pfx.length, -sfx.length );
                        pfx = sfx = "";

                    } else if( txta.getFromStart().endsWith(pfx)
                            && txta.getTillEnd().startsWith(sfx) ){

                        console.log("TOGGLE: pfx/sfx matched outside the selection",caret.start,caret.end);
                        caretStart -= pfx.length;
                        setCaret( caretStart, caret.end + sfx.length); //enlarge the selection
                        pfx = sfx = "";

                    }
                }

                s = pfx + sel + sfx;
                caretStart += pfx.length;
                selectionLength = sel.length;

            } else {

                console.log("plain text snippet", hasCaret,s );
                s = removeEscapeChar( s );
                caretStart += hasCaret ? 0 : s.length;
                selectionLength = hasCaret ? s.length : 0;

            }

            self.inject(s, caretStart, selectionLength);
            self.reset();

            self.fireEvent("change");
            //allow to finish the actions, before opening a new suggestion dialog
            self.suggest.delay(10, self);

        }

    },

    inject: function( snippet, start, selectionLength ){

        var self = this,
            txta = self.textarea,
            fromStart = txta.getFromStart(),
            prevline = fromStart.split(/\r?\n/).pop(),
            indentation = prevline.match(/^\s+/);

        //console.log(snippet,start,selectionLength);

        //process whitespace before and after the snippet
        //collapse \n of previous line if the snippet starts with \n
        if( snippet.test(/^\n/) && ( fromStart.test( /(^|[\n\r]\s*)$/ ) ) ) {
            //console.log("remove leading \\n", snippet);
            snippet = snippet.slice( 1 );
            start--;
        }

        //collapse \n of the next line when the snippet ends with a \n
        if( snippet.test(/\n$/) && ( txta.getTillEnd().test( /^\s*[\n\r]/ ) ) ) {
            //console.log("remove trailing \\n", snippet);
            snippet = snippet.slice(0, -1);
        }

        //finally auto-indent the snippets internal newlines \n
        if( indentation ){
            snippet = snippet.replace( /\n/g, "\n" + indentation[0] );
        }

        txta.setSelection( snippet )
            .setSelectionRange( start, start + selectionLength );

    },


    /*
    Interface: Undoable
        Implemenent the "undoable" interface.

    Function: getState
        State contains the value of the main and work area, the cursor and scroll position
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    */
    getState: function(){

        var txta = this.textarea,
<<<<<<< HEAD
            el = $(txta);

        return {
            main: this.mainarea.value,
            value: el.get('value'),
=======
            el = txta.toElement();

        return {
            main: this.mainarea.value,
            value: el.get("value"),
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            cursor: txta.getSelectionRange(),
            scrollTop: el.scrollTop,
            scrollLeft: el.scrollLeft
        };
    },

    /*
    Function: putState
<<<<<<< HEAD
        Set a state of the Snip editor. This works in conjunction with the [UndoRedo] class.

    Argument:
        state - object originally created by the getState funcion
=======
        Set a state of the Snip editor. This works in conjunction with the getState function.

    Argument:
        state - object originally created by the getState function
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    */
    putState: function(state){

        var self = this,
            txta = self.textarea,
<<<<<<< HEAD
            el = $(txta);

        self.clearContext();
=======
            el = txta.toElement();

        self.reset();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        self.mainarea.value = state.main;
        el.value = state.value;
        el.scrollTop = state.scrollTop;
        el.scrollLeft = state.scrollLeft;
<<<<<<< HEAD
        txta.setSelectionRange( state.cursor.start, state.cursor.end )
            .fireEvent('change',[state.value]);
=======
        txta.setSelectionRange( state.cursor.start, state.cursor.end );

        self.fireEvent("change");
        self.suggest();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    }

});
