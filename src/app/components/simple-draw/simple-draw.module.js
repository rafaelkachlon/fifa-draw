angular
    .module('simpleDraw', [
        'ui.router'
    ])
    .config(function ($stateProvider) {
        $stateProvider.state('simpleDraw', {
            url: '/simpleDraw',
            component: 'simpleDraw'
        });
    });