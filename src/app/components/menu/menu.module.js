angular
    .module('menu', [
        'ui.router'
    ])
    .config(function($stateProvider){
        $stateProvider.state('menu',{
            url:'/menu',
            component:'fifaMenu'
        });
    });