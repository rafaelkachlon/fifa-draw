    angular
        .module('components')
        .component('help', {
            templateUrl: './help.component.html',
            controller: helpController,
            controllerAs: 'vm',
            bindings: {
                Binding: '=',
            },
        });

    function helpController() {
        var vm = this;
        vm.name = "עזרה";
    }
