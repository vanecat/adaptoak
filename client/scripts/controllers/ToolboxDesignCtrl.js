'use strict';

exports.inject = function(app) {
  app.controller('ToolboxDesignSelectionCtrl', exports.controller);
  return exports.controller;
};

exports.controller = function($scope, CustomStateService) {


  function getIconPath (type, item) {
    var iconName = typeof item == 'object' ? item.icon : item;
    return '/static/images/icons/' + type + '/' + iconName + '.png';
  }

  /**
   * Created by ivanvelev on 10/20/15.
   */
  var adaptOakData = {
    'typology': {
      'building': {
        'label': 'Building',
        'icon': 'building',
        'iconFormat': 'png'
      },
      'fwyUnderpass': {
        'label' : 'FWY Underpass',
        'icon' : 'fwy-underpass',
        'iconFormat': 'png'
      },
      'parkingLot': {
        'label': 'Parking Lot',
        'icon' : 'parking-lot',
        'iconFormat': 'png'
      },
      'railroad': {
        'label': 'Railroad',
        'icon' : 'railroad',
        'iconFormat': 'png'
      },
      'street': {
        'label': 'Street',
        'icon': 'street',
        'iconFormat': 'png'
      },
      'workingWaterfront': {
        'label': 'Waterfront',
        'icon' : 'working-waterfront',
        'iconFormat': 'png'
      }
    },
    'adaptation': {
      'forest': {
        'label': 'Forest',
        'icon': 'forest',
        'iconFormat': 'png'
      },
      'livingWall': {
        'label': 'Living Wall',
        'icon': 'living-wall',
        'iconFormat': 'png'
      },
      'porousPavement': {
        'label': 'Porous Pavement',
        'icon': 'porous-pavement',
        'iconFormat': 'png'
      },
      'reef': {
        'label': 'Reef',
        'icon': 'reef',
        'iconFormat': 'png'
      },
      'swale': {
        'label': 'Swale',
        'icon': 'swale',
        'iconFormat': 'png'
      },
      'wetland': {
        'label': 'Wetland',
        'icon': 'wetland',
        'iconFormat': 'png'
      }
    },
    'typologyAdaptationData': {
      'building': {
        'livingWall': {}
      },
      'fwyUnderpass': {
        'swale': {},
        'forest': {}
      },
      'workingWaterfront': {
        'reef': {}
      },
      'street': {
        'porousPavement': {}
      },
      'railroad': {
        'forest':{},
        'wetland':{}
      },
      'parkingLot': {
        'wetland': {}
      }

    }
  };
// Fix up objects to contain their own id's

  for (var tId in adaptOakData.typology) {
    adaptOakData.typology[tId]['id'] = tId;
  }
  for (var aId in adaptOakData.adaptation) {
    adaptOakData.adaptation[aId]['id'] = aId;
  }


  var service = CustomStateService;

  $scope.adaptations = adaptOakData.adaptation;
  $scope.typologies = adaptOakData.typology;
  $scope.typologyAdaptationData = adaptOakData.typologyAdaptationData;

  $scope.getIconPath = getIconPath;

  $scope.isTypologyAdaptationApplicable = function (adaptation) {
    var typology = service.getSelectedTypology();
    return !!typology &&
      !!$scope.typologyAdaptationData[typology.id] &&
      !!$scope.typologyAdaptationData[typology.id][adaptation.id];
  };


  $scope.selectTypology = function (item) {
    console.log('select typology' + item.)
    if (item == service.getSelectedTypology()) {
      return;
    }
    service.setSelectedTypology(item);
    service.setSelectedAdaptation(null);
  };

  $scope.getTypologyState = function (typology) {
    var selectedTypology = service.getSelectedTypology();
    if (!selectedTypology) {
      return '';
    }

    return typology.id == selectedTypology.id ? 'active' : 'inactive';
  };

  $scope.getAdaptationState = function (adaptation) {
    var selectedAdaptation = service.getSelectedAdaptation();
    if (!selectedAdaptation) {
      return '';
    }

    return adaptation.id == selectedAdaptation.id ? 'active' : 'inactive';
  };

  $scope.selectAdaptation = function (item) {
    service.setSelectedAdaptation(item)
  };

  $scope.hasCompleteSelection = function () {
    return !!service.getSelectedAdaptation() && !!service.getSelectedTypology();
  };

  $scope.getAdaptation = service.getSelectedAdaptation;
  $scope.getTypology = service.getSelectedTypology;
  $scope.getTypologyAdaptationIconPath = function() {
    var a = service.getSelectedAdaptation();
    var t = service.getSelectedTypology();

    return getIconPath('typologyAdaptation', [t.icon, a.icon].join('+'));
  }
};



