/**
 * Created by ivanvelev on 11/11/15.
 */
'use strict';

exports.inject = function(app) {
  app.directive('sidenavItem', exports.directive);
  return exports.directive;
};

exports.directive = function($state) {
  function log(t) {
    console.log('sidenav item: ' + t);
  }

  function link(scope, element, attrs, content) {

    if ($state.is(attrs.uiSref)) {
      element.addClass('active');
    } else {
      element.removeClass('active');
    }

    element.data('title', element.html());
    element.html('');
    element.attr('title', element.data('title'));

    log(attrs.uiSref)
  }

  return {
    restrict: 'A',
    link: link
  }
};
