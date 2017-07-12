angular
    .module('root', ['app'      
    ])
    .config(function($stateProvider,$urlRouterProvider){     
        $urlRouterProvider.otherwise('/app');
        // $stateProvider
        // .state('menu', {
        //     url: '/menu',
        //     component: 'menu'
        // });
    });