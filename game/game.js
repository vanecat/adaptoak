/**
 * Created by ivanvelev on 10/20/15.
 */
var adaptOakApp = angular.module('adaptOak', []);

adaptOakApp.factory('adaptOakService', function(){
    var selectedTypology = null;
    var selectedAdaptation = null;
    return {
        getSelectedTypology: function() {
            return selectedTypology;
        },
        setSelectedTypology: function(typology) {
            selectedTypology = typology;
        },
        getSelectedAdaptation: function() {
            return selectedAdaptation;
        },
        setSelectedAdaptation: function(adaptation) {
            selectedAdaptation = adaptation;
        }
    };
});

adaptOakApp.controller('selectionCtrl', function ($scope, adaptOakService) {
    var service = adaptOakService;

    $scope.adaptations = adaptOakData.adaptation;
    $scope.typologies = adaptOakData.typology;
    $scope.typologyAdaptationData = adaptOakData.typologyAdaptationData;

    $scope.getIconPath = getIconPath;

    $scope.isTypologyAdaptationApplicable = function (adaptation) {
        var typology = adaptOakService.getSelectedTypology();
        return !!typology &&
            !!$scope.typologyAdaptationData[typology.id] &&
            !!$scope.typologyAdaptationData[typology.id][adaptation.id];
    };


    $scope.selectTypology = function (item) {
        if (item == service.getSelectedTypology) {
            return;
        }
        service.setSelectedTypology(item);
        service.setSelectedAdaptation(null);
    };

    $scope.getTypologyState = function (typology) {
        var selectedTypology = adaptOakService.getSelectedTypology();
        if (!selectedTypology) {
            return '';
        }

        return typology.id == selectedTypology.id ? 'active' : 'inactive';
    };

    $scope.getAdaptationState = function (adaptation) {
        var selectedAdaptation = adaptOakService.getSelectedAdaptation();
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
});

adaptOakApp.controller('resultCtrl', function ($scope, adaptOakService) {
    var service = adaptOakService;

    $scope.getIconPath = getIconPath;
    $scope.hasResult = function() {
        return !!service.getSelectedAdaptation() && !!service.getSelectedTypology();
    };

    $scope.getAdaptation = service.getSelectedAdaptation;
    $scope.getTypology = service.getSelectedTypology;
    $scope.getTypologyAdaptationIconPath = function() {
        var a = service.getSelectedAdaptation();
        var t = service.getSelectedTypology();

        return getIconPath('typologyAdaptation', [t.icon, a.icon].join('+'));
    }
});

function getIconPath (type, item) {
    var iconName = typeof item == 'object' ? item.icon : item;
    return './icons/' + type + '/' + iconName + '.png';
};
