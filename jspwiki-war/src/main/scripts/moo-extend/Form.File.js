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
Mootools Extension: Form.File.js
    Creates a multiple file upload form, based on styles from Bootstrap.
    Includes a json-rpc based progress-bar implemention for non-xhr2.0 browsers
    See also: [Form.File.Multiple, Request.File]

Credit:
    Arian Stolwijk, [https://github.com/arian/mootools-form-upload]

*/
<<<<<<< HEAD

!function(){
//"use strict";

=======
!function(){


function readableFileSize(bytes, precision){

    var exp = " KMGT".split(""), K = 1024;
    while( bytes >= K ){
        bytes /= K;
        exp.shift();
    }
    return bytes.toFixed(precision || 1) + " " + ( exp[0] || "" ) + "B";
}

//"use strict";
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
if (!this.Form) this.Form = {};
var Form = this.Form;

Form.File = new Class({

    Implements: [Options, Events],

    options: {
<<<<<<< HEAD
        max: 5, //maximum number of files to upload in one go...  0=unlimited.
        list: '.list-group',
        item: '.list-group-item',
        drop: '.droppable',
        progress: '.progress-bar',
=======

        max: 5, //maximum number of files to upload in one go...  0=unlimited.
        list: ".list-group",
        item: ".list-group-item",
        drop: ".droppable",
        progress: ".progress-bar",
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        fireAtOnce: false,
        onComplete: function(){
            // reload
            window.location.href = window.location.href;
        }
<<<<<<< HEAD
        
    },

    initialize: function(input, options){
    
        input = document.id(input);

        var form = input.getParent('form');
        if(!form) return false;
        
        this.setOptions(options);
        this.nbr = 0; //counter
        var list = this.list = input.getParent(this.options.list);
        this.submit = form.getElement('input[type=submit]');
        this.progress = form.getElement(this.options.progress);
        
        //console.log('FormData' in window ? "XHR2.0":"legacy");
        this['disabled-for-now-FormData' in window ? 'uploadXHR2' : 'upload'](form, input,list);
        
=======
    },

    initialize: function(input, options){

        var form,
            isXHR20 = false; //force old browser -- FIXME:  "FormData" in window;

        //isXHR20 = "FormData" in window;

        input = document.id(input);
        form = input.getParent("form");
        if(!form) return false;

        options = this.setOptions(options).options;
        this.nbr = 0; //upload file counter
        this.list = input.getParent(options.list);
        this.submit = form.getElement("input[type=submit]");
        this.progress = form.getElement(options.progress);

        //console.log("XHR20 ? ", isXHR20);
        form.ifClass( isXHR20, "XHR20" , "legacy" );
        this[ isXHR20 ? "uploadXHR2" : "upload"](form, input, this.list, options);

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    },

    update: function( step ){

        var self = this,
<<<<<<< HEAD
            disabled = 'disabled';
           
           console.log('update ',self.nbr,step); 
        self.nbr += step;
        self.submit.set(disabled, self.nbr ? '':disabled );  
        self.list.getFirst().ifClass(self.nbr >= self.options.max, disabled);                  

    },

    uploadXHR2: function(form,input,list){

        //console.log("xhr2.0", form.action, form.get('action'), input.name);

        var self = this, 
            options = self.options,
            name = input.get('name'),
            drop = form.getElement(options.drop),
            progress = self.progress,
            fireAtOnce = function(){ if(options.fireAtOnce) submit(); },

            uploadReq = new Request.File({

                url: form.get('action'),
                onRequest: function(){
                    progress.setStyle('width', 0).getParent().removeClass('hidden');
                },
                onProgress: function(event){
                    var percent = event.loaded.toInt(10) / event.total.toInt(10);
                    progress.setStyle('width', (percent * 100).toInt().limit(0,100) + '%');
                },
                onComplete: function(){
                    progress.setStyle('width', '100%');
                    self.fireEvent('complete', Array.slice(arguments));
=======
            disabled = "disabled";

        console.log("update ",self.nbr,step);

        self.nbr += step;
        self.submit.set(disabled, self.nbr ? "":disabled );
        self.list.getFirst().ifClass(self.nbr >= self.options.max, disabled);

    },

    uploadXHR2: function(form,input,list, options){

        var self = this,
            name = input.get("name"),
            drop = form.getElement(options.drop),
            progress = self.progress,

            fireAtOnce = function(){ if(options.fireAtOnce) submit(); },

            uploadReq = new Request.File({
                url: form.get("action"),
                onRequest: function(){
                    progress.setStyle("width", 0).getParent().removeClass("hidden");
                },
                onProgress: function(event){
                    var percent = event.loaded.toInt(10) / event.total.toInt(10);
                    progress.setStyle("width", (percent * 100).toInt().limit(0,100) + "%");
                },
                onComplete: function(){
                    progress.setStyle("width", "100%");
                    self.fireEvent("complete", Array.slice(arguments));
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                    this.reset();
                }
            }),

            //select one or more files via input[type=file] or drag/drop
<<<<<<< HEAD
            inputFiles = new Form.MultipleFileInput(input, list, drop, {

=======
            inputFiles = new Form.MultipleFile(input, list, drop, {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
                onDrop: fireAtOnce,
                onChange: fireAtOnce,
                onAdd: self.update.pass(+1,self),
                onRemove: self.update.pass(-1,self)
<<<<<<< HEAD

            }),

            submit = function(event){

                if (event) event.preventDefault();
                 inputFiles.getFiles().each(function(file){ 
                    uploadReq.append(name, file);
                });
                uploadReq.send();

            }
        
        form.addEvent('submit', submit);

        self.reset = function(){
            console.log(" reset ");
            var files = inputFiles.getFiles();
            while( files[0] ) inputFiles.remove( files.shift() );
=======
            }),

            submit = function(event){
                if (event) event.preventDefault();
                 inputFiles.getFiles().each(function(file,i){
                    uploadReq.append(name+"-"+i, file);
                });
                uploadReq.send();
            };

        form.addEvent("submit", submit);

        self.reset = function(){

            console.log(" reset ");
            var files = inputFiles.getFiles();

            while( files[0] ){ inputFiles.remove( files.shift() ); }

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
            /*
            for (var i = 0; i < files.length; i++){
                inputFiles.remove(files[i]);
            }
            */
<<<<<<< HEAD
        }
        
        
    },

    /*
    Function: upload
        Legacy upload handler, compatible with legacy input[type=file] capabilities
    
    The script works by hiding the file input element when a file is selected,
    then immediately replacing it with a new, empty one.
    Although ideally the extra elements would be hidden using the CSS setting
    'display:none', this causes Safari to ignore the element completely when
    the form is submitted. So instead, elements are moved to a position
    off-screen.
    On submit, any remaining empty file input element is removed.

    
=======

        };

    },
    /*
    Function: upload
        Legacy upload handler, compatible with legacy input[type=file] capabilities.

        The script works by hiding the file input element when a file is selected,
        then immediately replacing it with a new, empty one.
        Although ideally the extra elements would be hidden using the CSS setting
        "display:none", this causes Safari to ignore the element completely when
        the form is submitted. So instead, elements are moved to a position
        off-screen.
        On submit, any remaining empty file input element is removed.

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    DOM structure:
    (start code)
     ul.list-group
        li.list-group-item
            a
                label.add
                    input[type=file][id=attachefilename][name=content[?]]
<<<<<<< HEAD
            a.delete            
=======
            a.delete
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        li.list-group-item
            a
                label.add
                    input[type=file][id=unique]
<<<<<<< HEAD
            a.delete            
    (end)
    */
    upload: function(form,input,list){
    
        console.log("legacy");

        var self = this,
            options = self.options;
        
        list.addEvents({

            'change:relay(input)': function( event ){

                //this event can only be received on the first input[type=file]
                var input = this,
                    item = input.getParent(options.item);
                    newItem = item.clone(true, true);

                input.set('id',String.uniqueID());
                item.getElement('label').set('text', input.value.replace(/.*[\\\/]/, '') );
                item.getElement('.delete').removeClass('hidden');
                item.removeClass('droppable');        
            
                list.grab(newItem,'top');
                self.update(+1);
            },

            'click:relay(a.delete)': function(event){

                this.getParent(options.item).destroy();
                self.update(-1);

            }
        });
        
        form.addEvent('submit', function(event){

            list.getElement('input').destroy(); //remove first input[type=file] which is empty
            self.progressRpc();   //legacy rpc-based progress handler...

=======
            a.delete
    (end)
    */
    upload: function(form,input,list,options){

        var self = this;

        list.addEvents({
            "change:relay(input)": function(){

                //this event can only be received on the first input[type=file]
                var input = this,
                    item = input.getParent(options.item),
                    newItem = item.clone(true, true),
                    fileNames = "";

                for( var i=0; i< input.files.length; i++){
                    var file = input.files[i];
                    fileNames += file.name.replace(/.*[\\\/]/, "")
                              + " <span class='badge'>" + readableFileSize( file.size )+ "</span><br />";
                  }

                input.set("id",String.uniqueID());
                input.set("name",String.uniqueID());
                input.set ("title","");
                item.getElement("label").set("html", fileNames );
                item.getElement(".delete").removeClass("hidden");
                item.removeClass("droppable");

                list.grab(newItem,"top");
                self.update(+1);
            },
            "click:relay(a.delete)": function(){
                this.getParent(options.item).destroy();
                self.update(-1);
            }
        });

        form.addEvent("submit", function(){
            list.getElement("input").destroy(); //remove first input[type=file] which is empty
            self.progressRpc();   //legacy rpc-based progress handler...
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        });

        /* not used
        this.reset = function(){
<<<<<<< HEAD
            list.getElements(':not(:first-child)').destroy(); 
=======
            list.getElements(":not(:first-child)").destroy();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        };
        */

    },
<<<<<<< HEAD
    
    /*
    Function: progressRpc
        JSPWiki progress-bar implementation based on JSON-RPC

    JSON-RPC protocol:
    {{{
    --> {"id":10000,"method":"progressTracker.getProgress","params":["2a0d2563-1ec7-4d1e-9d10-5f4ae62e8251"]}:
    <-- {"id":10000,"result":30}                                
    }}}}
    */
    progressRpc: function(){
        
        var progress = this.progress;
            
        if( progress ){
            
            progress.getParent().removeClass('hidden');
                
            this.options.rpc( progress.get('data-progressid'), function(result){

                //console.log("rpc progress result ",result);                
                if( result && result.code ){
                    result = result.toInt().limit(0,100);
                    progress.setStyle('width',result+"%");
                    if( result < 100 ){ progressRpc.delay(500); }
                }               
            });
        }                
=======

    /*
    Function: progressRpc
        JSPWiki progress-bar implementation based on JSON-RPC
    JSON-RPC protocol:
    {{{
    --> {"id":10000,"method":"progressTracker.getProgress","params":["2a0d2563-1ec7-4d1e-9d10-5f4ae62e8251"]}:
    <-- {"id":10000,"result":30}
    }}}}
    */
    progressRpc: function(){

        var progress = this.progress;

        if( progress ){

            progress.getParent().removeClass("hidden");

            this.options.rpc( progress.get("data-progressid"), function(result){

                //CHECKME:  alert("rpc progress result ",result);

                if( result ){
                    result = result.toInt().limit(0,100);
                    progress.setStyle("width",result + "%");
                    if( result < 100 ){ progressRpc.delay(500); }
                }

            });

        }

>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    }

});

<<<<<<< HEAD
}();
=======
}();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
