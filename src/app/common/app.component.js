    angular
        .module('app')
        .component('app', {
            templateUrl: './app.component.html',
            controller: appController,
            controllerAs: 'vm',
        });

    function appController() {
        var vm = this;
    }
