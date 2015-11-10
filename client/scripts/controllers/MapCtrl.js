'use strict';
var mapboxgl = require('mapbox-gl');

exports.inject = function(app) {
  // require('./../directives/TestDirective').inject(app);
  app.controller('MapCtrl', exports.controller);
  return exports.controller;
};

exports.controller = function($scope, $stateParams, Map, MapStyle) {

  // FIXME: Placeholder just loads the first map.
  // Instead of passing map_id, I should be passing tags in. The tags should be used to get an array of maps.
  // also, after loading maps, I should be iterating over the mapstyle objects in each map and loading these styles as well.

  // FIXME: Move this code into loadData
  // , then async call addSource + addLayer (or preload all maps but hide/show? - maybe this approach is best)
  // Then the output of 'filter' simply toggles layers.
  var maps,
      styles,
      tags = window.active_tags;

  Map.filter( tags, function(data){

    maps = data.payload
    styles = {};

    maps.forEach( function( thisMap ){
      thisMap.layers.forEach( function(layer){
        var style = layer.style
        if( !styles[ style ] ){
          styles[style] = MapStyle.get({ 'filter[name]': style })
        }
      })
    })

  });

  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obnZmIiwiYSI6IjFkZGY0OTk4Mjg5MDU0ZjNiYmU4YWFjODg2YzQ0ZTk2In0.cUp8RaZxpmq7A7KGVNucKQ';

  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
      center: [ -122.3028, 37.8119], // starting position
      zoom: 15 // starting zoom
  });

  // Everything is still hard coded here.
  // - this stuff should actually be in an 'addOverlay' method for the controller
  // This method would also update the data structure used to generate the layer toggle UI.
  // Once the active tags are passed into this controller, they would be used to toggle the available overlays. 
  // All overlays should always be available, but only those that match the active tags should be toggled on.
  map.on('style.load', function () {

    console.log( maps )
    console.log( styles )

    map.addSource('2015_parcels', {
        type: 'vector',
        url:  "mapbox://johnvf.cdc0d47d" //maps[0].source
    });

    map.addLayer({
        "id": "2015_parcels",
        "type": "line",
        "source": "2015_parcels",
        "source-layer": "oakland_public_update_2015",
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#ff69b4",
          "line-width": 1,
        }
    });

    map.addLayer({
        "id": "2015_parcels_fill",
        "type": "fill",
        "source": "2015_parcels",
        "source-layer": "oakland_public_update_2015",
        "paint": {
          "fill-color": "#ff69b4",
          "fill-opacity": 0.5
        }
    });

  });

  function loadData(){

  }

  function addSource( map ){

  }

  function addLayer( layer ){

  }

};
