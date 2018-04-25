/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
 var db = window.openDatabase("db_map", "1.0", "db_map", 200000);
     var element = document.getElementById("showInformation");
     function successCB(latitude,longitude) {        
        alert("saved sucessfully");       
        
     }    
    function querySuccess(tx, results) {     
        var collection = "";
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
          for (var i=1; i<results.rows.length; i++){            
            var detail = results.rows.item(i).detail;           
            if (detail!=="undefined"){
              collection +=detail+"<br/>"; 
            }
           
          }   
          element.innerHTML = collection;
        }         
       
        }
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }
      function saveDescription(tx){
        var descriptionStart = document.getElementById('descriptionStart').value;
        var start = document.getElementById('start').value;                  
        var Lstartvalue = getLatitudeLongitude(start,descriptionStart);                    
      }
      function getLatitudeLongitude(address,detail){
        var information = detail;        
        var geocoder = new google.maps.Geocoder();        
        geocoder.geocode( { 'address': address}, function(results, status) {         
          if (status == 'OK') {                      
            var userlatitude = (results[0].geometry.location.lat());
            var userlongitude  = (results[0].geometry.location.lng());                       
            db.transaction(function(tx){             
              tx.executeSql('CREATE TABLE IF NOT EXISTS Map (detail, longitude ,latitude)');
              tx.executeSql('INSERT INTO Map (detail, longitude,latitude) VALUES ("'+information+'", "'+userlongitude+'","'+userlatitude+'")');              
              }, errorCB, successCB(userlatitude,userlongitude));                         
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
       });
      }
      
      function initMap() {              
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        var control = document.getElementById('floating-panel');
        control.style.display = 'block';
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
        document.getElementById('submit').addEventListener('click', function() {          
          calculateAndDisplayRoute(directionsService, directionsDisplay);          
          saveDescription();  
        });
      }
     
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {     
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,         
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {             
              summaryPanel.innerHTML += 'Distance'+'<br>'
              summaryPanel.innerHTML += route.legs[i].distance.text;              
            }  
                     
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      } 

    

app.initialize();