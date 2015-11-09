'use strict';
require('angular');

var uiRoute = require('angular-ui-router');
var ngResource = require('angular-resource');

var app = angular.module('MyApp', [uiRoute, ngResource]);

require('./services/Auth').inject(app);
require('./services/Map').inject(app);
require('./services/MapStyle').inject(app);

require('./directives/ExampleDirective').inject(app);
require('./directives/MapDirective').inject(app);

app.config(function($locationProvider, $stateProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: require('./controllers/ExampleCtrl').inject(app)
  })
  .state('second', {
    url: '/second-page',
    controller: require('./controllers/ExampleCtrl').inject(app),
    templateUrl: 'views/secondary.html'
  })
  .state('map', {
    url: '/map/:map_id',
    controller: require('./controllers/MapCtrl').inject(app),
    templateUrl: 'views/map.html'
  });
  
});

app.run();
