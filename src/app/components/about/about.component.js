    angular
        .module('components')
        .component('about', {
            templateUrl: './about.component.html',
            controller: aboutController,
            controllerAs: 'vm'
        });
    aboutController.$inject = ['$state'];
    function aboutController($state) {
        var vm = this;
        vm.name = "אודות";
        vm.Back = function(){
            $state.go('menu');
        };
    }
