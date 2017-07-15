    angular
        .module('app')
        .component('backButton', {
            templateUrl: './back-button.component.html',
            controller: backButtonController,
            controllerAs: 'vm'
        });
    backButtonController.$inject = ['$state'];
    function backButtonController($state) {
        var vm = this;
        vm.Back = function(){
            $state.go('menu');
        };
    }
