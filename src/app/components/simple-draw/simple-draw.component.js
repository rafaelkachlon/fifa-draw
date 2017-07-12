    angular
        .module('components')
        .component('simpleDraw', {
            templateUrl: './simple-draw.component.html',
            controller: simpleDrawController,
            controllerAs: 'vm',
            bindings: {
                Binding: '=',
            },
        });

    function simpleDrawController() {
        var vm = this;
        vm.name = "הגרלה רגילה";
    }
