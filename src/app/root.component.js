    angular
        .module('root')
        .component('root', {
            templateUrl: './root.component.html',
            controller: rootController,
            controllerAs: 'vm',
            bindings: {
                Binding: '=',
            },
        });

    function rootController() {
        var vm = this;
    }
