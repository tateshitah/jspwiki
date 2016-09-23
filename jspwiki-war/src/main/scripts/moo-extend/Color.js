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
Class: Color
    Class for creating and manipulating colors in JavaScript.
    This is a minimized variant of the Color class, based Mootools.More,
    written for jspwiki.
    It adds supports for html color names. (ref. http://en.wikipedia.org/wiki/Web_colors)
 
Arguments:
    color - (mixed) A string or an array representation of a color.

Color:
    There are 4 representations of color: #hex (3 or 6 chars) , vga color name, X11 color names, RGB (array).
    For String representation see Element:setStyle for more information.

Returns:
    (array) A new Color instance.

Examples:
    > var black = new Color('#000');
    > var black = new Color('rgb(0,0,0)');
    > var purple = new Color([255,0,255]);
    > var purple = new Color(255,0,255);
    > var red = new Color('red'); //support 16 standard vga color names
    > var azure = new Color('azure'); //support all 130 additional X11 color names

*/

!function(){

<<<<<<< HEAD
var RGB = 'rgb',
    VGA = "black#000 green#008000 silver#c0c0c0 lime#0f0 gray#808080 olive#808000 white#fff yellow#ff0 maroon#800000 navy#000080 red#f00 blue#00f purple#800080 teal#008080 fuchsia#f0f aqua#0ff",
=======
var VGA = "black#000 green#008000 silver#c0c0c0 lime#0f0 gray#808080 olive#808000 white#fff yellow#ff0 maroon#800000 navy#000080 red#f00 blue#00f purple#800080 teal#008080 fuchsia#f0f aqua#0ff",
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    c0l0r = 'i'.slick(),

    Color = this.Color = new Type('Color', function(color){

    if (arguments.length >= 3){

        color = Array.slice(arguments, 0, 3);

    } else if (typeof color == 'string'){

<<<<<<< HEAD
        if(color.test(/^[\da-f]{3,6}$/i)) color = "#"+color;
=======
        if(color.test(/^[\da-f]{3,6}$/i)){ color = "#"+color; }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        c0l0r.setStyle('color',''); //reset the template
        color = ( VGA.test( RegExp(color+"(#\\S+)","i" ) ) ? RegExp.$1 :
            color.match(/rgb/i) ? color.rgbToHex() :
                c0l0r.setStyle('color',color).getStyle('color') ).hexToRgb(true);

    }
<<<<<<< HEAD
    if(!color) return null;
=======
    if(!color){ return null; }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
    color.rgb = color.slice(0, 3);
    color.hex = color.rgbToHex();
    return Object.append(color, this);
});

Color.implement({

    mix: function(){

        var colors = Array.slice(arguments),
            alpha = ( (typeOf(colors.getLast()) == 'number') ? colors.pop() : 50 )/100,
<<<<<<< HEAD
            alphaI = 1-alpha,
            rgb = this.slice(), i, color;

        while( colors[0] ){
            color = new Color( colors.shift() );
            for (i=0; i < 3; i++){ rgb[i] = ((rgb[i] * alphaI) + (color[i] * alpha)).round(); }
        };
=======
            alphaI = 1 - alpha,
            rgb = this.slice(), i, color;

        while( colors[0] ){

            color = new Color( colors.shift() );
            for (i = 0; i < 3; i++){
                rgb[i] = ((rgb[i] * alphaI) + (color[i] * alpha)).round();
            }

        }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
        return new Color(rgb);

    },

    invert: function(){

        return new Color(255-this[0],255-this[1],255-this[2]);

        /*return new Color(this.map(function(value){
            return 255 - value;
        }));*/
    }

});

<<<<<<< HEAD
}();
=======
}();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
