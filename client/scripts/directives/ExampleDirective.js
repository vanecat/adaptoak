'use strict';

exports.inject = function(app) {
  app.directive('example', exports.directive);
  return exports.directive;
};

exports.directive = function() {
  return {
    restrict: 'E',
    template: '<ul><li><em>A simple list</em></li><li><em>But I can be anything you want.</em></li></ul>'
  };
};
