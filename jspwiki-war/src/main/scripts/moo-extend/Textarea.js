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
/*global Class, Options, Events  */
/*exported Textarea */

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
/*
Class: Textarea
    The textarea class enriches a TEXTAREA element, and provides cross browser
    support to handle text selection: get and set the selected text,
    changing the selection, etc.
    It also provide support to retrieve and validate the caret/cursor position.

Example:
    (start code)
    <script>
<<<<<<< HEAD
        var txta = new Textarea( "mainTextarea" );
=======
        var ta = new Textarea( "mainTextarea" );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    </script>
    (end)
*/
var Textarea = new Class({

<<<<<<< HEAD
    Implements: [Options,Events],

    //options: { onChange:function(e){} );

    initialize: function(el,options){

        var self = this,
            txta = self.ta = $(el),

            lastValue,
            lastLength = -1,
            changeFn = function(e){
                var v = txta.value;
                if( v.length != lastLength || v !== lastValue ){
                    self.fireEvent('change', e);
                    lastLength = v.length;
                    lastValue = v;
                }
=======
    Implements: [Options, Events],

    initialize: function(el, options){

        var self = this,
            ta = self.ta = document.id(el),
            fireChange = function( event ){
                console.log('hi');
                self.fireEvent("change", event);
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            };

        self.setOptions(options);

<<<<<<< HEAD
        txta.addEvents({ change:changeFn, keyup:changeFn });

        //Create shadow div to support pixel measurement of the caret in the textarea
        //self.taShadow = new Element('div',{
        //    styles: { position:'absolute', visibility:'hidden', overflow:'auto'/*,top:0, left:0, zIndex:1, white-space:pre-wrap*/ }
        //})
        self.taShadow = new Element('div[style=position:absolute;visibility:hidden;overflow:auto]')
          .inject(txta,'before')
          .setStyles( txta.getStyles(
            'font-family0font-size0line-height0text-indent0padding-top0padding-right0padding-bottom0padding-left0border-left-width0border-right-width0border-left-style0border-right-style0white-space0word-wrap'
=======
        //ta.addEvents({ change: fireChange, keyup: fireChange });

        //Create a shadow div to support getCoordinates() of any character in the textarea
        //This only works if the textarea font is monospace (?)
        self.taShadow = "div[style=position:absolute;visibility:hidden;overflow:auto]".slick()
          .setStyles( ta.getStyles(
            "font-family0font-size0line-height0text-indent0padding-top0padding-right0padding-bottom0padding-left0border-left-width0border-right-width0border-left-style0border-right-style0white-space0word-wrap"
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            .split(0)
        ));

        return this;
    },

    /*
    Function: toElement
        Return the DOM textarea element.
        This allows the dollar function to return
        the element when passed an instance of the class. (mootools 1.2.x)

    Example:
<<<<<<< HEAD
    >    var txta = new Textarea('textarea-element');
    >    $('textarea-element') == txta.toElement();
    >    $('textarea-element') == $(txta); //mootools 1.2.x
=======
    >    var ta = new Textarea("textarea-element");
    >    $("textarea-element") == ta.toElement();
    >    $("textarea-element") == $(ta); //mootools 1.2.x
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    */
    toElement: function(){
        return this.ta;
    },

    /*
    Function: getValue
        Returns the value (text content) of the textarea.
    */
    getValue: function(){
        return this.ta.value;
    },
    /*
    Function: slice
<<<<<<< HEAD
        Mimics the string slice function on the value (text content) of the textarea.
    Arguments:
        Ref. javascript slice function
    */
    slice: function(start,end){
        return this.ta.value.slice(start,end);
    },


    /*
    Function: getFromStart
        Returns the first not selected part of the textarea, till the start of the selection.
=======
        Invokes slice(..) on the value of the textarea
    */
    slice: function(start, end){
        return this.ta.value.slice(start, end);
    },
    /*
    Function: indexOf
        Invokes indexOf(..) on the value of the textarea
    */
    indexOf: function(searchValue, fromIndex){
        return this.ta.value.indexOf(searchValue, fromIndex);
    },

    /*
    Function: getFromStart
        Returns the start of the textarea, upto the start of the selection.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    */
    getFromStart: function(){
        return this.slice( 0, this.getSelectionRange().start );
    },

    /*
    Function: getTillEnd
<<<<<<< HEAD
        Returns the last not selected part of the textarea, starting from the end of the selection.
=======
        Returns the end of the textarea, starting from the end of the selection.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    */
    getTillEnd: function(){
        return this.slice( this.getSelectionRange().end );
    },

    /*
    Function: getSelection
        Returns the selected text as a string

    Note:
        IE fixme: this may return any selection, not only selected text in this textarea
<<<<<<< HEAD
            //if(Browser.Engine.trident) return document.selection.createRange().text;
=======
        //if(Browser.Engine.trident) return document.selection.createRange().text;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    */
    getSelection: function(){

        var cur = this.getSelectionRange();
        return this.slice(cur.start, cur.end);

    },

    /*
    Function: setSelectionRange
<<<<<<< HEAD
        Selects the selection range of the textarea from start to end

    Arguments:
        start - start position of the selection
        end - (optional) end position of the seletion (default == start)
=======
        Set a new selection range of the textarea

    Arguments:
        start - start position of the new selection
        end - (optional) end position of the new seletion (default is start)
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    Returns:
        Textarea object
    */
    setSelectionRange: function(start, end){

<<<<<<< HEAD
        var txta = this.ta,
            value,diff,range;

        if(!end){ end = start; }

        if( txta.setSelectionRange ){

            txta.setSelectionRange(start, end);

        } else {

            value = txta.value;
            diff = value.slice(start, end - start).replace(/\r/g, '').length;
            start = value.slice(0, start).replace(/\r/g, '').length;

            range = txta.createTextRange();
            range.collapse(1 /*true*/);
            range.moveEnd('character', start + diff);
            range.moveStart('character', start);
=======
        var ta = this.ta,
            value, diff, range;

        if( !end ){ end = start; }

        if( ta.setSelectionRange ){

            ta.setSelectionRange(start, end);

        } else {

            value = ta.value;
            diff = value.slice(start, end - start).replace(/\r/g, "").length;
            start = value.slice(0, start).replace(/\r/g, "").length;

            range = ta.createTextRange();
            range.collapse( true );
            range.moveEnd("character", start + diff);
            range.moveStart("character", start);
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            range.select();
            //textarea.scrollTop = scrollPosition;
            //textarea.focus();

        }
<<<<<<< HEAD
=======
        ta.fireEvent("change");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        return this;
    },

    /*
    Function: getSelectionRange
        Returns an object describing the textarea selection range.

<<<<<<< HEAD
    Returns:
        {{ { 'start':number, 'end':number, 'thin':boolean } }}
        start - coordinate of the selection
        end - coordinate of the selection
        thin - boolean indicates whether selection is empty (start==end)
    */

/* ffs
    getIERanges: function(){
        this.ta.focus();
        var txta = this.ta,
=======
    Returns: Object:
        start - (number) start position of the selection
        end - (number) end position of the selection
        thin - (boolean) indicates whether selection is empty (start==end)
    */

    /* ffs
    getIERanges: function(){
        this.ta.focus();
        var ta = this.ta,
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            range = document.selection.createRange(),
            re = this.createTextRange(),
            dupe = re.duplicate();
        re.moveToBookmark(range.getBookmark());
<<<<<<< HEAD
        dupe.setEndPoint('EndToStart', re);
        return { start: dupe.text.length, end: dupe.text.length + range.text.length, length: range.text.length, text: range.text };
    },
*/
    getSelectionRange: function(){

        var txta = this.ta,
            caret = { start: 0, end: 0 /*, thin: true*/ },
            range, dup, value, offset;

        if( txta.selectionStart!=null ){

            caret = { start: txta.selectionStart, end: txta.selectionEnd };
=======
        dupe.setEndPoint("EndToStart", re);
        return { start: dupe.text.length, end: dupe.text.length + range.text.length, length: range.text.length, text: range.text };
    },
    */
    getSelectionRange: function(){

        var ta = this.ta,
            start = 0,
            end = 0,
            range, dup, value, offset;

        if( ta.selectionStart != null ){

            //caret = { start: ta.selectionStart, end: ta.selectionEnd };
            start = ta.selectionStart;
            end = ta.selectionEnd;
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        } else {

            range = document.selection.createRange();
<<<<<<< HEAD
            //if (!range || range.parentElement() != txta){ return caret; }
            if ( range && range.parentElement() == txta ){
                dup = range.duplicate();
                value = txta.value;
                offset = value.length - value.match(/[\n\r]*$/)[0].length;

                dup.moveToElementText(txta);
                dup.setEndPoint('StartToEnd', range);
                caret.end = offset - dup.text.length;
                dup.setEndPoint('StartToStart', range);
                caret.start = offset - dup.text.length;
            }
        }

        caret.thin = (caret.start==caret.end);

        return caret;
=======

            if ( range && range.parentElement() == ta ){
                dup = range.duplicate();
                value = ta.value;
                offset = value.length - value.match(/[\n\r]*$/)[0].length;

                dup.moveToElementText(ta);
                dup.setEndPoint("StartToEnd", range);
                end = offset - dup.text.length;

                dup.setEndPoint("StartToStart", range);
                start = offset - dup.text.length;
            }
        }

        return { start: start, end: end, thin: start == end };
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    /*
    Function: setSelection
<<<<<<< HEAD
        Replaces the selection with a new value (concatenation of arguments).
=======
        Replaces the selection with a new string (concatenation of arguments).
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        On return, the selection is set to the replaced text string.

    Arguments:
        string - string to be inserted in the textarea.
            If multiple arguments are passed, all strings will be concatenated.

    Returns:
        Textarea object, with a new selection

    Example:
<<<<<<< HEAD
        > txta.setSelection("new", " value"); //replace selection by 'new value'
    */
    setSelection: function(){

        var value = Array.from(arguments).join('').replace(/\r/g, ''),
            txta = this.ta,
            scrollTop = txta.scrollTop, //cache top
            start,end,v,range;

        if( txta.selectionStart!=null ){

            start = txta.selectionStart;
            end = txta.selectionEnd;
            v = txta.value;
            //txta.value = v.substr(0, start) + value + v.substr(end);
            txta.value = v.slice(0, start) + value + v.substr(end);
            txta.selectionStart = start;
            txta.selectionEnd = start + value.length;

        } else {

            txta.focus();
=======
        > ta.setSelection("new", " value"); //replace selection by "new value"
    */
    setSelection: function(){

        var value = Array.from(arguments).join("").replace(/\r/g, ""),
            ta = this.ta,
            scrollTop = ta.scrollTop, //cache top
            start, end, v, range;

        if( ta.selectionStart != null ){

            start = ta.selectionStart;
            end = ta.selectionEnd;
            v = ta.value;
            ta.value = v.slice(0, start) + value + v.substr(end);
            ta.selectionStart = start;
            ta.selectionEnd = start + value.length;

        } else {

            ta.focus();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            range = document.selection.createRange();
            range.text = value;
            range.collapse(1 /*true*/);
            range.moveStart("character", -value.length);
            range.select();

        }
<<<<<<< HEAD
        txta.focus();
        txta.scrollTop = scrollTop;
        txta.fireEvent('change');
=======
        ta.focus();
        ta.scrollTop = scrollTop;
        ta.fireEvent("change");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        return this;

    },

    /*
    Function: insertAfter
        Inserts the arguments after the selection, and puts caret after inserted value

    Arguments:
        string( one or more) - string to be inserted in the textarea.

    Returns:
        Textarea object
    */
    insertAfter: function(){

<<<<<<< HEAD
        var value = Array.from(arguments).join('');
=======
        var value = Array.from(arguments).join("");
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

        return this.setSelection( value )
            .setSelectionRange( this.getSelectionRange().start + value.length );

    },

    /*
    Function: isCaretAtStartOfLine
<<<<<<< HEAD
        Returns boolean indicating whether caret is at the start of a line.
    */
    isCaretAtStartOfLine: function(){

        var i = this.getSelectionRange().start;
        return( (i<1) || ( this.ta.value.charAt( i-1 ).test( /[\n\r]/ ) ) );
=======
        Returns boolean indicating whether caret (or start of the selection)
        is at the start of a line.
        (previous char is \n)
    */
    isCaretAtStartOfLine: function(){

        var start = this.getSelectionRange().start;
        return ( (start < 1) || ( this.ta.value.charAt(start - 1).test( /[\n\r]/ ) ) );

    },
    /*
    Function: isCaretAtEndOfLine
        Returns boolean indicating whether the caret or the end of the selection
        is at the end of a line.
        (last char is \n)
    */
    isCaretAtEndOfLine: function(){

        var end = this.getSelectionRange().end;
        return ( (end == this.ta.value.length) || ( this.slice(end - 1, end + 1).test( /[\n\r]/ ) ) );
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    },

    /*
    Function: getCoordinates
        Returns the absolute coordinates (px) of the character at a certain offset in the textarea.
        Default returns pixel coordinates of the selection.

    Credits:
        Inspired by http://github.com/sergeche/tx-content-assist.

    Arguments:
        offset - character index
            If omitted, the pixel position of the caret is returned.

    Returns:
        {{ { top, left, width, height, right, bottom } }}
     */
    getCoordinates: function( offset ){

<<<<<<< HEAD
        var txta = this.ta,
            taShadow = this.taShadow,
            delta = 0,
            el,css,style,t,l,w,h;

        //prepare taShadow
        css = txta.getStyles(['padding-left','padding-right','border-left-width','border-right-width']);
        for(style in css){ delta +=css[style].toInt() }

        //default offset is the position of the caret
        if( !offset ){ offset = this.getSelectionRange().end; }

        el = taShadow.set({
            styles: {
                width: txta.offsetWidth - delta,
                height: txta.getStyle('height')  //ensure proper handling of scrollbars - if any
            },
            //FIXME: should we put the full selection inside the <i></i> bracket ? (iso a single char)
            html: txta.value.slice(0, offset) + '<i>A</i>' + txta.value.slice(offset+1)
        }).getElement('i');

        t = txta.offsetTop + el.offsetTop - txta.scrollTop;
        l = txta.offsetLeft + el.offsetLeft - txta.scrollLeft;
        w = el.offsetWidth;
        h = el.offsetHeight;
        return {top:t, left:l, width:w, height:h, right:l+w, bottom:t+h}
=======
        var ta = this.ta,
            //make sure the shadow element is always just before of the textarea
            taShadow = this.taShadow.inject(ta, "before"),
            value = ta.value.replace(/[<>&]/g,"X"),
            el, t, l, w, h;

        //default character offset is the position of the caret (cursor or begin of the selection)
        if( offset == undefined ){ offset = this.getSelectionRange().end; }

        el = taShadow.set({
            styles: {
                width: ta.offsetWidth,
                height: ta.getStyle("height")  //ensure proper handling of scrollbars - if any
            },
            html: value.slice(0, offset) + "<i>A</i>" + value.slice(offset + 1)
        }).getElement("i");

        t = ta.offsetTop + el.offsetTop - ta.scrollTop;
        l = ta.offsetLeft + el.offsetLeft - ta.scrollLeft;
        w = el.offsetWidth;
        h = el.offsetHeight;
        return { top: t, left: l, width: w, height: h, right: l + w, bottom: t + h };
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    }

});
<<<<<<< HEAD

=======
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
