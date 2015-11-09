'use strict';

exports.inject = function(app) {
  app.factory('Map', exports.factory);
  return exports.factory;
};

exports.factory = function($http, $resource) {
  // FIXME: How do I concatenate multiple ?filter[tags]=foo&filter[tags]=bar etc...
  return $resource('/api/map/:id'); 
};
