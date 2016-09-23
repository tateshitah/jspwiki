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
/*global typeOf, instanceOf, Class, Options, Events, Snipe, Dialog  */
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
/*
Class: SnipEditor.Commands
    This class preprocesses all command triggers, such as
    suggestion commands, button clicks or tab-completion commands.

    It will make sure that only one dialog is open at the same time.
    It intializes and caches the dialogs, handles the show/hide/toggle
<<<<<<< HEAD
    of dialogs, and passes action events back to the SnipEditor.
=======
    of dialogs, and passes action events back to the Snipe Editor.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    Dialogs can be opened by means of
    - external command triggers: exec
    - click events on command buttons (.cmd.pop)
    - suggestion trigger (exec ???)

<<<<<<< HEAD
    FYI - all DIALOGs are created as descendants of the Dialog class.
=======
    DIALOGs are created as descendants of the Dialog class.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    - Dialog : floating dialog panel
        - FormDialog : predef content with open/close handlers ???
        - Dialog.Selection : selectable list of items
            - Dialog.Font : selection list of font items
            - Dialog.Section : selection list of textarea sections
        - Dialog.Chars : selection matrix of special character entities
        - Dialog.Color : color-wheel
        - Dialog.Find : find and replace dialog

Options:
    container: DOM element  => contains commands([data-cmd])
<<<<<<< HEAD
    dialogs - predefined set of dialog initialisators
    // **event handlers**
    onOpen - invoked after opening a DIALOG
    onClose - invoked after closing a DIALOG
    onAction - action call-back action(cmd,arguments)
=======
    dialogs - predefined set of dialog definitions
    relativeTo - relative position of the dialog (default is document.body)
    // **event handlers**
    onOpen - fired after opening any DIALOG
    onClose - fired after closing any DIALOG
    onAction - action call-back action(cmd, arguments)
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

Properties
    - buttons : collection of DOM-elements with click handlers to either
        action() or toggle()
<<<<<<< HEAD
    - dialogs : collection of dialog definitions [Dialog-class, {dialog parameters}]
=======
    - dialogs : collection of dialog definitions [Dialog-class, {options}]
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

DOM structure:
    <div class="cmd tICON"><i>action command</i></div>
    <div class="cmd pop tICON"><i>dialog</i></div>

    <div class="dialog fixed"> ... dialog content </div>
*/
Snipe.Commands = new Class({

    Implements: [Events, Options],

    options: {
<<<<<<< HEAD
        //onAction:function()...s
        cmds:'cmd' //toolbar button data attribute
        //dialogs:{ cmd1:dialog1, cmd2:dialog2, ...}
    },
    btns: {},     //all cmd:buttons (dom element)
    dlgs: {},     //all cmd:instantiated dialogs  (lazy activation)
    dialogs: {},  //all cmd:dialogs

    initialize: function( container, options ){

        var self = this.setOptions(options), 
            attr = 'data-' + self.options.cmds,
            command, 
            dialog,
            dialogs = options.dialogs||{};

        container.getElements('['+attr+']').each( function(el){

            command = el.get(attr);

            self.btns[command] = el.addEvent('click', self.click.pass(command,self));

            if( dialog = container.getElement('.dialog.' + command) ){
            
                if( dialogs[command] ){

                    dialogs[command][1].dialog = dialog;  

                } else {

                    dialogs[command] = dialog;

                }
=======
        //onAction:function(command,value){ .. },
        cmds: "data-cmd" //toolbar button data attribute
        //relativeTo: document.body //default position of a dialog
        //dialogs:{ cmd1:dialog1, cmd2:dialog2, ...}
    },
    dlgs: {},  //all cmd:instantiated dialogs  (lazy activation)
    btns: {},  //all button DOM elements
    dialogs: {},  //all cmd:dialogs  definitions

    initialize: function( container, options ){

        var self = this.setOptions(options),
            dataCmd = self.options.cmds,
            command,
            dialog,
            dialogs = options.dialogs || {};


        //add click buttons and dialogs
        container.addEvent("click:relay([" + dataCmd + "])", function(event){

            var cmd = this.get( dataCmd ),
                dlg = self.dlgs[ cmd ];

            dlg ? dlg.toggle() : self.action( cmd );

            // input fields (eg checkboxes) keep the default behaviour; other click events are disabled
            if( !this.match("input") ){ event.stop(); }

        });

        //see if there are any dialogs linked to a button. Eg: "div.dialog.<command>"
        container.getElements("[" + dataCmd + "]").each( function(button){

            command = button.get(dataCmd);
            self.btns[command] = button;

            if( (dialog = container.getElement(".dialog." + command)) ){

                if( !dialogs[command] ){ dialogs[command] = [Dialog, {}]; }

                options = dialogs[command][1];
                //register the DOM dialog element, and move to top of DOM for proper absolute positioning
                options.dialog = dialog.inject(document.body);
                options.relativeTo = button;  //register the dialog positioning info

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            }
        });

        self.addDialogs( dialogs );
<<<<<<< HEAD
    },

    /*
    Funciton: addDialog
        Add a new dialog.
        The dialog is only created when invoking the command.
        This happens through a button click or through the action() method.

    Arguments:
        dialogs: {cmd1:dialog, cmd2:dialog-def...}
        (dialog-def : array[Dialog-Class, {dialog parameters}]
        relativeTo: create a dialog relative to a positioned object (eg. button, textarea-location)
    */
    addDialogs: function(newdialogs, relativeTo){

        var self = this,
            dialog,
            command
            dialogs = self.dialogs;
        
        for( command in newdialogs ){

            if( dialogs && dialogs[command] ){
                console.log("AddDialogs - warning: double registration of => " + command);
            }

            dialog = dialogs[command] = newdialogs[command];  //array of all dialogs
            if( instanceOf( dialog, Dialog ) ){ self.attach(command,dialog); }

            //checkme ...
            if( relativeTo ){ self.btns[ command ] = relativeTo; }

        };
        //console.log('allDialogs: '+Object.keys(self.dialogs) );
    },

    attach: function(command, dialog){

        var self = this,
            actionHdl = function(v){ self.fireEvent('action', [command,v]); };

        //console.log('attachDialog: '+command);

        return self.dlgs[command] = dialog.addEvents({
            onOpen: self.openDialog.bind(self, command),
            onClose: self.closeDialog.bind(self, command),
            onAction: actionHdl,
            onDrag: actionHdl
        });
    },

    click: function( command ){

        var dialog = this.dlgs[ command ];
        dialog ? dialog.toggle() : this.action( command );

    },

    /*
    Function: action
        Action handler for a simple command. Pass the 'action' event
        up to the Snipe Editor.
=======

    },

    /*
    Function: addDialog
        Add a new dialogs.

    Arguments:
        newdialogs: {cmd:[Dialog-Class, {options}]..}
    */
    addDialogs: function( newdialogs ){

        var dialog,
            command,
            dialogs = this.dialogs;

        for( command in newdialogs ){

            if( dialogs[command] ){
                console.log("Snipe.Commands addDialogs() - warning: double registration of => " + command);
            }

            dialog = dialogs[command] = newdialogs[command];

            //note: make sure to initialize this.dialogs[command] prior to calling show()
            if( instanceOf( dialog, Dialog ) ){ this.attach(dialog, command); }

        }
        //console.log("allDialogs: " + Object.keys(this.dialogs) );
    },

    /*
    Function: attach
        Attach event-handlers to a dialog
    */
    attach: function(dialog, command){

        var self = this,
            //fire ACTION event back to the invoker of the Snipe.Commands
            actionHdl = function(value){ self.fireEvent("action", [command, value]); };

        //console.log("Snipe.Commands: attachDialog() ", command, dialog);

        return self.dlgs[command] = dialog.addEvents({
            open: self.openDialog.bind(self, command),
            close: self.closeDialog.bind(self, command),
            action: actionHdl,
            drag: actionHdl
        });
    },

    /*
    Function: action
        Action handler for a simple command.
        Send the "action" event back to the Snipe Editor.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    Arguments:
        command : command name
        value : (optional) initial value of the dialog
    */
    action: function( command, value ){

<<<<<<< HEAD
        var self = this, 
            active = 'active',
            button = self.btns[command], 
            dialog = self.dlgs[command];

        //console.log("Commands.action "+command+" value:"+value+" btn="+button+ " dlg="+dialog);
        if( button ) button = document.id( button);

        if( button && button.match('.disabled') ){

            //nothing to do here

        } else if( self.dialogs[command] ){

            if( !dialog ){ dialog = self.createDialog(command) }
            if( value ){ dialog.setValue( value ); }
=======
        var self = this,
            active = "active",
            button = self.btns[command],
            dialog;

        //console.log("Commands.action ", command, " value:", value, " btn=", button, " dlg=", dialog);
        //if( button ) button = document.id( button);

        if( button && button.match(".disabled") ){

            //nothing to be done here

        } else if( self.dialogs[command] ){

            dialog = self.dlgs[command] || self.createDialog(command);
            if( value != null ){ dialog.setValue( value ); }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            dialog.show();

        } else {

            if( button ){ button.addClass(active); }
<<<<<<< HEAD
            self.fireEvent('action', [command, value] );
=======
            self.fireEvent("action", [command, value] );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            if( button ){ button.removeClass(active); }

        }

    },

    /*
    Function: createDialog
<<<<<<< HEAD
        Create a new dialog.
        The name of the cmd determines the type (or class) of Dialog to be created
        - cmd: Dialog[cmd] (eg cmd='font' : Dialog.Font)
        - the name of the dialog equals the DOM ID of a predefined HTML dialog

        - DOM Element: predefined DOM dialog
        - [ Dialog-class, { dialog parameters } ]
        - { dialog parameters } : the cmd determines the type of Dialog to create
        - "string" : create a Dialog.Selection dialog


    Arguments
        cmd - (string) command

        The open/close handlers will make sure only one dialog is open at the
        same time. The open dialog is stored in {{this.activeCmd}}.

        The key events 'action', 'drag', 'open' and 'close' are propagated upwards.
=======
        Create a new dialog, based on dialog creation parameters in this.dlgs :
        - [ Dialog-class, { options } ]
        - otherwise convert to Dialog.Selection dialog


    Arguments
        command - (string) command

        The open/close handlers will make sure only one dialog is open at the
        same time. The open dialog is stored in {{this.activecommand}}.

        The key events "action", "drag", "open" and "close" are propagated upwards.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    Returns:
        The created dialog, which is also stored in this.dlgs[] repository.

    */
<<<<<<< HEAD
    createDialog: function( cmd ){

        var self = this,
            dlg,
            btn = self.btns[cmd],
            factory = Function.from( self.dialogs[cmd] )(),
            type = typeOf(factory);

        //console.log('Commands.createDialog() '+cmd+' '+ ' btn='+btn +" "+type);

        //expect factory to be [Dialog class,  {dialog options object}]
        if( type != 'array' || factory.length != 2 ){

            factory = ( type == 'element' ) ?
                [Dialog, {dialog:factory}] : [Dialog.Selection, {body:factory}];
        }

        dlg = new factory[0]( Object.append( factory[1],{
            //cssClass: 'dialog float',
            autoClose: false, //fixme: suggestion dialog should not be autoclosed
            relativeTo: btn   //button or textareaa
            //draggable: true
        }) );

        //Make sure that this.dlgs[cmd] gets initialized prior to calling show()
        return self.attach(cmd, dlg);
=======
    createDialog: function( command ){

        var dialog = Function.from( this.dialogs[command] )();

        //console.log("Snipe.Commands: createDialog() " + command + " ",dialog );

        if( typeOf(dialog) != "array" ){ dialog = [ Dialog.Selection, { body: dialog } ]; }

        if( !dialog[1].relativeTo ){ dialog[1].relativeTo = this.options.relativeTo || document.body; }

        dialog[1].autoClose = false;

        //note: make sure to initialize this.dialogs[command] prior to calling show()
        return this.attach( new dialog[0]( dialog[1] ), command);
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    /*
    Function: openDialog
        Opens a dialog. If already another dialog was open, that one will first be closed.
<<<<<<< HEAD
        When a toolbar button exists, it will get the css class '.active'.
=======
        When a toolbar button exists, it will get the css class ".active".
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        Note: make sure that this.dlgs[cmd] is initialized prior to calling show() !

    Argument:
        command - dialog to be opened
<<<<<<< HEAD
        preOpen - ...
    */
    openDialog: function(command, dialog){

        var self = this, 
            current = self.activeCmd, 
            tmp;

        //console.log('Commands.openDialog() ' + command + ' ' + self.activeCmd );

        if( ( current!=command ) && ( tmp = self.dlgs[current] ) ){ tmp.hide(); }
        //toobar button will be deactivated by closeDialog()

        self.activeCmd = command;
        if( tmp = self.btns[command] ){ $(tmp).addClass('active'); }

        self.fireEvent('open', command, dialog);
=======
    */
    openDialog: function(command){

        var self = this,
            activeDlg = self.activeDlg,
            newDlg = self.dlgs[command],
            button = self.btns[command];

        //console.log("Snipe.Commands: openDialog() " + command + " " + activeDlg);

        if( activeDlg && (activeDlg != newDlg) ){ activeDlg.hide(); }
        self.activeDlg = self.dlgs[command];

        if( button ){ button.addClass("active"); }

        self.fireEvent("open", command);

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    /*
    Function: closeDialog

    Arguments:
<<<<<<< HEAD
        cmd - (mandatory) dialog to be closed
    */
    closeDialog: function(cmd, dialog){

        var self = this, 
            btn = self.btns[cmd];

        //console.log('Commands.closeDialog() ' + cmd + ' ' + self.activeCmd )

        if( cmd == self.activeCmd ){ self.activeCmd = null; }
        if( btn ){ $(btn).removeClass('active'); }

        self.fireEvent('close', cmd, dialog);
=======
        command - (mandatory) dialog to be closed
    */
    closeDialog: function(command /*, dialog*/){

        var self = this,
            button = self.btns[command];

        //console.log("Snipe.Commands: closeDialog() " + command )

        if( self.dlgs[command] == self.activeDlg ){ self.activeDlg = null; }

        if( button ){ button.removeClass("active"); }

        self.fireEvent("close", command);

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    /*
    Function: close
<<<<<<< HEAD
        Close the active dialog, if any.
    */
    close: function(){

        var activeCmd = this.activeCmd;
        if( activeCmd ){ this.dlgs[activeCmd].hide(); }

    }

});


=======
        Close any active dialog.
    */
    close: function(){

        var activeDlg = this.activeDlg;
        if( activeDlg ){ activeDlg.hide(); }

    }

});
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
