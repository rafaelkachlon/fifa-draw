angular
    .module('about', [
        'ui.router'
    ])
    .config(function($stateProvider){
        $stateProvider.state('about',{
            url:'/about',
            component:'about'
        });
    });