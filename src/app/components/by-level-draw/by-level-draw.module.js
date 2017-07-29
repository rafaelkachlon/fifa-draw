angular
    .module('byLevelDraw', [
        'ui.router'
    ])
    .config(function ($stateProvider) {
        $stateProvider.state('byLevelDraw', {
            url: '/byLevelDraw',
            component: 'byLevelDraw'
        });
    });