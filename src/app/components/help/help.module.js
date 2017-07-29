angular
    .module('help', [
        'ui.router'
    ])
    .config(function ($stateProvider) {
        $stateProvider.state('help', {
            url: '/help',
            component: 'help'
        });
    });