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
/*
 Function: naturalSort
        Sorts the elements of an array, using a more 'natural' algoritm.
        Maintains a cache of the prepared sortable array.

 Example:
        [0, 1, "017", 6, , 21 ].naturalSort();  //[0, 1, 6, "017", 21]

        [[6,"chap 1-14"],["05","chap 1-4"]].naturalSort(1); //[["05","chap 1-4"],[6,"chap 1-14"]]
        rows.naturalSort( 3 );

 */
/*jshint forin:false, noarg:true, noempty:true, undef:true, unused:true, plusplus:false, immed:false, browser:true, mootools:true */

!function(){

    /*
    Function: makeSortable
        Parse the column and guess its data-type.
        Then convert all values according to that data-type.
        Cache the sortable values in rows[0-n].cache.
        Empty rows will sort based on the title attribute of the cells.
=======
/*jshint forin:false, noarg:true, noempty:true, undef:true, unused:true, plusplus:false, immed:false, browser:true, mootools:true */

!function(){

/* helper stuff for <array>.toNatural() */

var reNAT = /([-+]?\d+)|(\D+)/g,  //split string in sequences of digits

    //stuff to support matching KMGT patterns, like 2MB, 4GB, 1.2kb, 8Tb
    KMGTre = /(?:[\d.,]+)\s*([kmgt])b/,
    KMGTmul = { k: 1, m: 1e3, g: 1e6, t: 1e9 };

function parseKMGT( v ){

    return KMGTre.test( v.toLowerCase() ) ? v.toFloat() * KMGTmul[RegExp.$1] : NaN;

}

/*
Function: naturalCompare
    Helper comparison function for <array>.naturalSort().
    Each entry of the sorted array consists of a 2 item array:
    [0] - the actual data to be sorted (can be of any data type, dom nodes, etc.)
    [1] - the toNatural value, which is either a scalar or an array of scalars
*/
function naturalCompare(a, b){

    var aa, bb, i = 0, t;

    // retrieve the toNatural values: scalars or tokenized arrays
    a = a[1];
    b = b[1];

    // scalars, always same types - integer, float, date, string
    // if( !a.pop ){ return a.localeCompare(b); }
    if( !a.pop ){
        return ( a < b ) ? -1 : ( a > b ) ? 1 : 0;
    }

    //compare arrays
    //for(i = 0; i < len; i++){
    while( ( aa = a[i] ) ){

        if( !( bb = b[i++] ) ){ return 1; } //fixme

        t = aa - bb;       //auto-conversion to numbers, if possible
        if( t ){ return t; } //otherwise fall-through to string comparison

        if( aa !== bb ){ return ( aa > bb ) ? 1 : -1; }
        //if( aa !== bb ) return aa.localeCompare( bb );

    }
    return b[i] ? -1 : 0;
}


Array.implement({

    /*
    Function: toNatural(column)
        Convert this array into an array with natural sortable data.

        1. Parse the column and auto-guess the data-type.
        2. Convert all data to scalars according to the data-type.

        DOM-nodes are sorted on its content or its title attributes. (CHECKME)
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

    Supported data-types:
        numeric - numeric value, with . as decimal separator
        date - dates as supported by javascript Date.parse
          See https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Date/parse
        ip4 - ip addresses (like 169.169.0.1)
        euro - currency values (like £10.4, $50, €0.5)
        kmgt - storage values (like 2 MB, 4GB, 1.2kb, 8Tb)

    Arguments:
        rows - array of rows each pointing to a DOM tr element
            rows[i].data caches the converted data.
        column - index (0..n) of the processed column

    Returns:
        comparison function which can be used to sort the table
    */
<<<<<<< HEAD
    function makeSortable(thisArray, column){

        var num=[], dmy=[], kmgt=[], nat=[], val, i, len = thisArray.length, isNode,

            //split string in sequences of digits
            reNAT = /([-+]?\d+)|(\D+)/g,

            KMGTre = /(:?[\d.,]+)\s*([kmgt])b/,    //eg 2 MB, 4GB, 1.2kb, 8Tb
            KMGTmul = { k:1, m:1e3, g:1e6, t:1e9 },
            KMGTparse = function( val ){
                return KMGTre.test( val.toLowerCase() ) ?
                    val.toFloat() * KMGTmul[ RegExp.$2 ] : NaN;
            };

        for( i=0; i<len; i++ ){

            //1. Retrieve the value to be sorted: native js value, or dom elements

            val = thisArray[i];
            isNode = val && val.nodeType;

            //if 'column' => retrieve the nth DOM-element or the nth Array-item
            if( !isNaN(column) ) val = ( isNode ? val.getChildren() : val )[column];

            //retrieve the value and convert to string
            val = (''+(isNode ? val.get('text') || val.get('title') : val)).trim();

            //2. Convert and store in type specific arrays (num,dmy,kmgt,nat)

            //CHECKME: some corner cases: numbers with leading zero's, confusing date string
            if( /(?:^0\d+)|(?:^[^\+\-\d]+\d+$)/.test(val) ){ num=dmy=0; }

            if( num && isNaN( num[i] = +val ) ) num=0;

            if( nat && !( nat[i] = val.match(reNAT) ) ) nat=0;

            //Only strings with non-numeric values
            if( dmy && ( num || isNaN( dmy[i] = Date.parse(val) ) ) ) dmy=0;

            if( kmgt && isNaN( kmgt[i] = KMGTparse(val) ) ) kmgt=0;

        }

        console.log("[",kmgt?"kmgt":dmy?"dmy":num?"num":nat?"nat":'no conversion',"] ");
        //console.log(nat);
        //console.log(kmgt||dmy||num||nat||thisArray);

        return kmgt || dmy || num || nat || thisArray;

    }

    /*
    Function: naturalCmp
        Comparison function for sorting "natural sortable" arrays.
        The entries of sortable arrays consists of tupples:
        ( .[1] is the sortable value, .[0] is the original value )

        The sortable value is either a scalar or an array.
    */
    function naturalCmp(a,b){

        var aa, bb, i=0, t;

        // retrieve the sortable values: scalars or tokenized arrays
        a = a[1]; b = b[1];

        // scalars, always same types - integer, float, date, string
        if( typeof a !='object' ) return (a<b) ? -1 : (a>b) ? 1 : 0;
        //if( !a.length ) return a.localeCompare(b);

        while( (aa = a[i]) ){

            if( !( bb = b[i++] ) ) return 1; //fixme

            t = aa - bb;       //auto-conversion to numbers, if possible
            if( t ) return t;  //otherwise fall-through to string comparison

            if( aa !== bb ) return (aa > bb) ? 1 : -1;
            //if( aa !== bb ) return aa.localeCompare(bb);

        }
        return b[i] ? -1 : 0;
    }


    Array.implement('naturalSort',function(column, force){

        var thisArray = this, sortable, i, len = thisArray.length,
            cache = 'cache';

console.log('naturalSort',column,force)
        //1. read sortable cache or make a new sortable array
        if( isNaN(column) ){    // 1D array : [ .. ]

            sortable = thisArray[cache] || [];

            if( column/*==force*/ || !sortable.length/*==0*/ ){

                sortable = thisArray[cache] = makeSortable(thisArray);
=======
    toNatural: function( column ){

        var len = this.length,
            num = [], dmy = [], kmgt = [], nat = [],
            val, i, isNode;

        for(i = 0; i < len; i++){

            //1. Retrieve the value to be sorted: native js value, or dom elements

            val = this[i];
            isNode = val && val.nodeType;

            //if "column" => retrieve the nth DOM-element or the nth Array-item
            if( !isNaN(column) ){ val = ( isNode ? val.getChildren() : val )[column]; }

            //retrieve the value and convert to string
            val = ("" + (isNode ? val.getAttribute("data-sortvalue") || val.get("text") || val.get("title") : val)).trim();

            //2. Convert and store in type specific arrays (num, dmy, kmgt, nat)

            //CHECKME: some corner cases: numbers with leading zero's, confusing date string
            if( /(?:^0\d+)|(?:^[^\+\-\d]+\d+$)/.test(val) ){ num = dmy = 0; }

            //remove non numeric tail : replace( /[\w].*$/,'');
            if( num && isNaN( num[i] = +val ) ){ num = 0; }
            //if( num && isNaN( num[i] = + val.replace(/[\W].*$/,"") ) ){ num = 0; }

            if( nat && !( nat[i] = val.match(reNAT) ) ){ nat = 0; }

            //Only strings with non-numeric values
            if( dmy && ( num || isNaN( dmy[i] = Date.parse(val) ) ) ){ dmy = 0; }

            if( kmgt && isNaN( kmgt[i] = parseKMGT(val) ) ){ kmgt = 0; }

        }

        //console.log("[", kmgt ? "kmgt" : dmy ? "dmy" : num ? "num" : nat ? "nat" : "no conversion", "] ");

        return kmgt || dmy || num || nat || this.slice();

    },

    /*
    Function: naturalSort
        Sort the elements of an array, using a "natural" algoritm.
        First it converts to sort key into a toNatural array: <array>.toNatural()
        Then it sorts the array with the naturalCompare() routine.
        To increase speed, the toNatural arrays are cached.

    Example:
        [0, 1, "017", 6, , 21 ].naturalSort();  //=> [0, 1, 6, "017", 21]

        [[6,"chap 1-14"],["05","chap 1-4"]].naturalSort(1); //=> [["05","chap 1-4"],[6,"chap 1-14"]]

        rows.naturalSort( 3 ); //eg HTML table rows, sorting key is the 3rd table column
    */
    naturalSort: function(column, force){

        var self = this,
            naturalArr = [],
            cache = "cache",
            len = self.length,
            i;


        //1. Retrieve toNatural: either from cache or via <array>.toNatural

        if( isNaN( column ) ){    // 1D array : [ .. ]

            naturalArr = self[cache];
            if( column/*==force*/ || !naturalArr ){

                naturalArr = self[cache] = self.toNatural();
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

            }

        } else {    // 2D array : [[..],[..],..]

<<<<<<< HEAD
            sortable = thisArray[0][cache] || [];

            if( !sortable.length ) for(i=0; i<len; i++) thisArray[i][cache] = []; //init row caches

            if( force || (sortable[column]==undefined) ){

                sortable = makeSortable(thisArray, column);
                for(i=0; i<len; i++) thisArray[i][cache][column] = sortable[i]; //cache sortable values

            } else {

                for(i=0; i<len; i++) sortable[i]=thisArray[i][cache][column];  //retrieve cached column
=======
            //init 2D cache if not present
            if( !self[0][cache] ){

                 for(i = 0; i < len; i++){ self[i][cache] = []; }

            }

            if( force || isNaN( self[0][cache][column] ) ){

                naturalArr = self.toNatural(column);
                for(i = 0; i < len; i++){ self[i][cache][column] = naturalArr[i]; }

            } else {

                //retrieved cached toNatural array
                naturalArr = [];
                for(i = 0; i < len; i++){ naturalArr[i] = self[i][cache][column]; }
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

             }

        }

<<<<<<< HEAD
console.log(this.cache);
        //2. Do the actual sorting
        for( i=0; i<len; i++) sortable[i] = [ thisArray[i], sortable[i] ];
        sortable.sort( naturalCmp );
        for( i=0; i<len; i++) thisArray[i] = sortable[i][0];

        return thisArray;

    });
=======
        //2. Do the actual sorting

        for(i = 0; i < len; i++){ naturalArr[i] = [ self[i], naturalArr[i] ]; }

        naturalArr.sort( naturalCompare );

        for(i = 0; i < len; i++){ self[i] = naturalArr[i][0]; }

        return self;

    }

  });
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094

}();
