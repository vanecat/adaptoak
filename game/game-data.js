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
