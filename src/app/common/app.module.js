angular
    .module('app', [
        'templates',
        'components',
        'ngAnimate',
        'ui.router'       
    ])
    .config(function($stateProvider,$urlRouterProvider){     
        // $urlRouterProvider.otherwise('/menu');
        $stateProvider
        .state('app',{
            url:'/app',
            component:'app',
            redirectTo:'menu'
        });
    });