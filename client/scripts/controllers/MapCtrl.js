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
        var mapPromises = mapData.payload.map( function( thisMap ){
          maps[ thisMap.name ] = thisMap
          return loadStyles( thisMap, styles )
        })
        // Resolve when all the map data has been loaded
        Promise.all( mapPromises ).then(resolve)
      });
    });
  }

  function loadStyles( thisMap, styles ){
    return new Promise(function(resolve, reject) {

      var stylePromises = thisMap.layers.map( function(layer ){ 
        return new Promise(function(resolve, reject) {
          
          if( !styles[layer.style] ){
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
      // Resolve when the style data for ever layer has been loaded
      Promise.all(stylePromises).then(resolve)
    });
  }

  function addData( map, maps, sources, styles){

    var ui = document.getElementById('map-ui');

    for (var key in maps) {
      maps[key].layers.forEach( function(layer){
        addLayer(map, layer, sources, styles)
        addLayerUI(map, ui, layer, addLayer.bind(null, map, layer, sources, styles) )
      })
    }
  }

  function addLayer( map, layer, sources, styles){


    if( !sources[layer.source] ){
      map.addSource( layer.source , {
        type: 'vector',
        url:  layer.source //maps[0].source
      });
      sources[layer.source] = true
    }

    // Deep copy this style
    var style = JSON.parse(JSON.stringify(styles[layer.style].data))

    // Associate this style with the source
    // Need a better id
    style['id'] = layer.source+layer.source_layer+layer.style
    style['source'] = layer.source
    style['source-layer'] = layer.source_layer

    map.addLayer( style );
  }

  function addLayerUI( map, ui, layer , addLayerCallback ){
    // Need a better id
    var id = layer.source+layer.source_layer+layer.style

    var item = document.createElement('li');
    var link = document.createElement('a');

    link.href = '#';
    link.innerHTML = id;

    
    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.getLayer(id)) {
            map.removeLayer(id);
            this.className = '';
            // map.legendControl.removeLegend(layer.getTileJSON().legend);
        } else {
            addLayerCallback();
            this.className = 'active';
            // map.legendControl.addLegend(layer.getTileJSON().legend);
        }
    };

    item.appendChild(link);
    ui.appendChild(item);
  }

};
