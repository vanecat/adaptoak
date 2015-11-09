'use strict';

exports.inject = function(app) {
  app.factory('MapStyle', exports.factory);
  return exports.factory;
};

exports.factory = function($http, $resource) {
  return $resource('/api/mapstyle/:id'); 
};
