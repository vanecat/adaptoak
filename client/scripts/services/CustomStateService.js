'use strict';

exports.inject = function(app) {
  app.factory('CustomStateService', exports.factory);
  return exports.factory;
};

exports.factory = function() {
  var selectedTypology = [],
    selectedAdaptation = [];


  function addOrRemoveAndSortItem(arr, item, isAdd) {
    var lastI = arr.length - 1;
    for (var i = 0; i <= lastI; i++) {
      if (!isAdd) {
        if (arr[i] == item) {
          arr.splice(i, 1);
          return; // removed it ... done
        } else if (arr[i] > item) {
          return; // past the sorted item, not to be found ... done
        }
      } else {
        if (arr[i] == item) {
          return; // item already exists ... done
        } else if (arr[i] < item) {
          arr.splice(i, 0, item);
          return; // item spot found, insert ... done
        }
      }

    }
    if (isAdd) {
      arr.push(item); // item should go last ... done
    }
  }

  return {
    getSelectedTypology: function() {
      return selectedTypology;
    },
    setSelectedTypology: function(typology, isSet) {
      addOrRemoveAndSortItem(selectedTypology, typology, isSet);
    },
    getSelectedAdaptation: function() {
      return selectedAdaptation;
    },
    setSelectedAdaptation: function(adaptation, isSet) {//
      addOrRemoveAndSortItem(selectedAdaptation, adaptation, isSet); // default is to set it ON
    }
  };
};
