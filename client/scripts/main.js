'use strict';

require('angular');

var uiRoute = require('angular-ui-router');
var uiBootstrap = require('angular-ui-bootstrap');
var app = angular.module('MyApp', [uiRoute, uiBootstrap]);

require('./services/Auth').inject(app);
require('./directives/ExampleDirective').inject(app);
require('./directives/Map').inject(app);

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
    url: '/map',
    controller: require('./controllers/ExampleCtrl').inject(app),
    templateUrl: 'views/map.html'
  });
  
});

app.run();
