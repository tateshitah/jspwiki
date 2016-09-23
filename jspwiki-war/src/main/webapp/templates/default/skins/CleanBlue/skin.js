/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 *  SkinQute javascript extensions
 *  needed to initialise RoundedCorner elements.
 */
<<<<<<< HEAD
if ( RoundedCorners ) {  
=======
if ( RoundedCorners ) {
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
  var r = RoundedCorners;
//  r.register( "header",    ['yyyy', 'lime', 'lime' ] );
//  r.register( "footer",    ['yyyy', 'lime', 'lime' ] );
}
<<<<<<< HEAD
 
/**
 *  Preload logo images. 
=======

/**
 *  Preload logo images.
>>>>>>> fbf0008a47db5d7946a86d8aa5ba7af192c61094
 */
function preloadImages() {
  var imageList = [
    "./templates/default/skins/CleanBlue/images/logo.png",
    "./templates/default/skins/CleanBlue/images/logo-hi.png"
  ];
  for ( var i = 0; i < imageList.length; i++ ) {
    var imageObject = new Image();
    imageObject.src = imageList[i];
  }
}
preloadImages();

