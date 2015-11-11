'use strict';
var mapboxgl = require('mapbox-gl');

exports.inject = function(app) {
  // require('./../directives/TestDirective').inject(app);
  app.controller('MapCtrl', exports.controller);
  return exports.controller;
};

exports.controller = function($scope, $stateParams, MapService, MapStyleService) {

  // Load all relevant map layers for 'design', 'analyze' tags etc..
  // then, use other map tags to toggle layers on and off.

  var maps = {};
  var sources = {}
  var styles = {};

  var tags = window.active_tags

  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obnZmIiwiYSI6IjFkZGY0OTk4Mjg5MDU0ZjNiYmU4YWFjODg2YzQ0ZTk2In0.cUp8RaZxpmq7A7KGVNucKQ';

  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
      center: [ -122.3028, 37.8119], // starting position
      zoom: 15 // starting zoom
  });

  // Once the active tags are passed into this controller, they would be used to toggle the available overlays. 
  // All overlays should always be available, but only those that match the active tags should be toggled on.
  map.on('style.load', function () {
    loadData( tags , maps, styles )
    .then(addData.bind( null, map, maps, sources, styles));
  });

  // Obtain all maps, and styles that match the active tags from MongoDB
  function loadData( tags , maps, styles ){
    return new Promise(function(resolve, reject) {
      
      MapService.filter( tags, function(mapData){
        mapData.payload.forEach( function( thisMap ){

          maps[ thisMap.name ] = thisMap
          var layerPromises = thisMap.layers.map( function(layer ){ 
            return new Promise(function(resolve, reject) {
              
              if( styles[layer.style] === undefined ){
                MapStyleService.get({ 'filter[name]': layer.style }, function (data){
                  styles[ layer.style ] = data.payload[0]
                  resolve();
                });
              }
              else{
                resolve();
              }

            })
          })
          Promise.all(layerPromises).then(resolve)
        })
      });
    });
  }

  function addData( map, maps, sources, styles){
    return new Promise(function(resolve, reject) {

      for (var key in maps) {
        maps[key].layers.forEach( function(layer){
          addLayer(map, layer, sources, styles)
        })
      }
      resolve();
    }); 
  }

  function addLayer( map, layer, sources, styles){
    console.log(map)
    console.log(layer)
    console.log(styles)
    // sources[layer]
    // Keep track of added layers and don't repeat
    sources[layer.source] = true

    map.addSource( layer.source , {
        type: 'vector',
        url:  layer.source //maps[0].source
    });

    map.addLayer({
        "id": layer.source+layer.source_layer+layer.style,
        "source": layer.source,
        "source-layer":layer.source_layer,
        "type": "fill",
        // "paint": {
        //   "fill-color": "#ff69b4",
        //   "fill-opacity": 0.5
        // }

        // TODO Start with style data and merge this data in.
    });
  }

};
