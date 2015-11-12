'use strict';

exports.inject = function(app) {
  app.directive('addthis', exports.directive);
  return exports.directive;
};

// TODO: It may make sense to mo
exports.directive = function() {
  return {
    restrict: 'A',
    template: '<ul class="addthis"><li>Fb</li><li>Tw</li><li>e-mail</li><li>+</li></ul>',
  }
};
