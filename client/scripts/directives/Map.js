'use strict';
var L = require('mapbox.js');

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

        L.mapbox.accessToken = 'pk.eyJ1IjoidWJtYXBzIiwiYSI6Il9EUThaMUEifQ.45ITMBnO4PJfE0fCD-Bxpw'

        var southWest = L.latLng(37.581209, -122.498682),
          northEast = L.latLng(37.897507, -122.080184),
          bounds = L.latLngBounds(southWest, northEast);
          
        var map = L.mapbox.map('map', 'ubmaps.map-kb224le4', { 
          zoomControl: false,
          minZoom: 12,
          maxZoom: 19,
          maxBounds: bounds
        })
          
          .setView([37.8119,-122.3028], 15)

        var ui = document.getElementById('map-ui');
        //I put this here    
        var thelayer = null;

        L.control.layers({
          'Streets' : L.mapbox.tileLayer('ubmaps.map-kb224le4')
        },{collapsed: false, position: 'topleft'}).addTo(map);
          
        var AO = L.mapbox.tileLayer('ubmaps.hd9mfekb');
        var Caltrans = L.mapbox.tileLayer('ubmaps.ha733p25');
        var Caltransbuffer = L.mapbox.tileLayer('ubmaps.hd0pj88j');
        var TruckBuffer = L.mapbox.tileLayer('ubmaps.hpo8nk4n');
        var Parcel500 = L.mapbox.tileLayer('ubmaps.hnb19lk5');
        var baaqmd = L.mapbox.tileLayer('ubmaps.hgd2f95d');
        var oaklandowner = L.mapbox.tileLayer('ubmaps.hnb26i58');
        var zoning = L.mapbox.tileLayer('ubmaps.h6b0lp81');
        var baytrail = L.mapbox.tileLayer('ubmaps.BayTrail');
        var envirostor = L.mapbox.tileLayer('ubmaps.hp1e3041');
        var forest = L.mapbox.tileLayer('ubmaps.CalTrans_Forest');    
          
        addLayer(AO, L.mapbox.gridLayer('ubmaps.hd9mfekb'),'Adapt Oakland Area', 11);
        addLayer(Caltrans, L.mapbox.gridLayer('ubmaps.ha733p25'),'Caltrans Right-of-way', 9);
        addLayer(Caltransbuffer, L.mapbox.gridLayer('ubmaps.hd0pj88j'),'500ft Freeway Setback', 8);
        addLayer(TruckBuffer, L.mapbox.gridLayer('ubmaps.hpo8nk4n'),'500ft Truck Route Setback', 7);    
        addLayer(baytrail, L.mapbox.gridLayer('ubmaps.BayTrail'),'Bay Trail', 12);
          
        addLayer(baaqmd, L.mapbox.gridLayer('ubmaps.hgd2f95d'),'Point Source Pollution', 6);
        addLayer(envirostor, L.mapbox.gridLayer('ubmaps.hp1e3041'),'Envirostor', 13);
        addLayer(zoning, L.mapbox.gridLayer('ubmaps.h6b0lp81'),'Zoning', 2);    
        addLayer(oaklandowner, L.mapbox.gridLayer('ubmaps.hnb26i58'),'Public Land', 5);
        addLayer(Parcel500, L.mapbox.gridLayer('ubmaps.hnb19lk5'),'Parcels in the 500ft Setback', 10);
          
        addLayer(forest, L.mapbox.gridLayer('ubmaps.CalTrans_Forest'),'CalTrans Plantable Areas', 14);

          
        function addLayer(layer, gridlayer, name, zIndex) {
          layer
              .setZIndex(zIndex)

          gridlayer
          // add the gridControl to the active gridlayer
          var gridControl = L.mapbox.gridControl(gridlayer, {follow: false}).addTo(map);
          
          // Create a simple layer switcher that toggles layers on and off.
          var item = document.createElement('li');
          var link = document.createElement('a');

          link.href = '#';
          link.innerHTML = name;

          
          link.onclick = function(e) {
              e.preventDefault();
              e.stopPropagation();

              if (map.hasLayer(layer)) {
                  map.removeLayer(layer);
                  map.removeLayer(gridlayer);
                  map.legendControl.removeLegend(layer.getTileJSON().legend);
                  
                  this.className = '';
              } else {
                  map.addLayer(layer);
                  map.addLayer(gridlayer);
                  this.className = 'active';
                  map.legendControl.addLegend(layer.getTileJSON().legend);

              }
                 thelayer = layer;  


              
          };
          item.appendChild(link);
          ui.appendChild(item);
        }
          
        new L.Control.Zoom({ position: 'topleft' }).addTo(map);
    }
  };
};
