angular
    .module('menu')
    .component('fifaMenu', {
        templateUrl: './menu.component.html',
        controller: menuController,
        controllerAs: 'vm',
        bindings: {
            Binding: '=',
        },
    });
menuController.$inject = ['$state'];
function menuController($state) {
    var vm = this;
    vm.name = "מי נגד Me?";

    vm.goToSimpleDraw = function () {
        $state.go('simpleDraw');
    };
    vm.goToByLevelDraw = function () {
        $state.go('byLevelDraw');
    };
    vm.goToHelp = function () {
        $state.go('help');
    };
    vm.goToAbout = function () {
        $state.go('about');
    };
}
