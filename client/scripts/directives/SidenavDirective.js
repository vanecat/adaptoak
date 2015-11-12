/**
 * Created by ivanvelev on 11/11/15.
 */
'use strict';

exports.inject = function(app) {
  app.directive('sidenav', exports.directive);
  return exports.directive;
};

exports.directive = function() {
  function link(scope, element, attrs) {
    //
  }

  return {
    restrict: 'A',
    templateUrl: 'views/sidenav.html',
    link: link
  }
};
