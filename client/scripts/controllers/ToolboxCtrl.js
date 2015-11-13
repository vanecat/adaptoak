'use strict';

exports.inject = function(app) {
  app.controller('ToolboxCtrl', exports.controller);
  return exports.controller;
};

exports.controller = function($scope, CustomStateService) {

  $scope.tagModel = "DefaultTag";
  $scope.$watch('tagModel', function(newVal, oldVal) {
    if (newVal != oldVal) {
      CustomStateService.setSelectedAdaptation(oldVal, false);
    }
    CustomStateService.setSelectedAdaptation(newVal, true);

    // Update in Controller View
    $scope.currentTag = newVal;
  });
};
