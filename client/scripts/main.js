'use strict';
require('angular');

var uiRoute = require('angular-ui-router');
var ngResource = require('angular-resource');
var uiBootstrap = require('angular-ui-bootstrap');

var app = angular.module('MyApp', [uiRoute, uiBootstrap]);

require('./services/Auth').inject(app);
require('./services/CustomStateService').inject(app);
require('./services/Map').inject(app);
require('./services/MapStyle').inject(app);

require('./directives/ExampleDirective').inject(app);
require('./directives/MapDirective').inject(app);
require('./directives/SidenavDirective').inject(app);
require('./directives/SidenavItemDirective').inject(app);
require('./directives/AddthisDirective').inject(app);

// Array to describe UI state, an array of tags selected by the user for currently toggled
// 'Ecosystem Services', 'Typologies', 'Adaptation Strategies' etc...
// Some other set up could be used, but this data should be passed to all controllers.
var active_tags = [];

// FIXME: map_id is probably not the right @param to pass to a route.
// Perhaps the array of tags, concatenated? (since this should be the source of truth for API state)
// MapCtrl could split the array up again and use it to filter maps output from the API.
// 
// Perhaps not though - this should be discussed/designed.
app.config(function($locationProvider, $stateProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: require('./controllers/ExampleCtrl').inject(app)
  })
  .state('map', {
    url: '/map/:map_id',
    controller: require('./controllers/MapCtrl').inject(app),
    templateUrl: 'views/map.html'
  })
  .state('toolbox', {
    url: '/toolbox',
    controller: require('./controllers/ToolboxCtrl').inject(app),
    templateUrl: 'views/toolbox.html'
  });
  
});

app.run();
