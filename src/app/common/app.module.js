angular
    .module('app', [
        'templates',
        'components',
        'ngAnimate',
        'ui.router',
        'ngCookies'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                component: 'app',
                redirectTo: 'menu'
            });
    });