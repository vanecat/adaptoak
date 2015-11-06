'use strict';
var mapboxgl = require('mapbox-gl');

exports.inject = function(app) {
  app.directive('map', exports.directive);
  return exports.directive;
};

// TODO: This is just placeholder code copied from the current deployment
// Looking into premade leaflet/mapbox directives that will allow us 
// to associate diff. routes with different map states.
// Also looking into vector tiles in place of current Raster tiles
exports.directive = function() {
  return {
    restrict: 'E',
    template: '<ul id="map-ui"></ul><div id="map" class="leaflet-container leaflet-retina leaflet-fade-anim" tabindex="0"></div>',
    link: function(scope, element, attrs, ctrl) {

      mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obnZmIiwiYSI6IjFkZGY0OTk4Mjg5MDU0ZjNiYmU4YWFjODg2YzQ0ZTk2In0.cUp8RaZxpmq7A7KGVNucKQ';

      var map = new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
          center: [ -122.3028, 37.8119], // starting position
          zoom: 15 // starting zoom
      });

      map.on('style.load', function () {

        map.addSource('2015_parcels', {
            type: 'vector',
            url: 'mapbox://johnvf.cdc0d47d'
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

    }

  }
};
