angular
    .module('result', [
        'ui.router'
    ])
    .config(function($stateProvider){
        $stateProvider.state('result',{
            url:'/result',
            component:'result'
        });
    });