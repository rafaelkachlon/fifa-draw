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

        vm.GoToSimpleDraw = function(){
            $state.go('simpleDraw');
        };
         vm.GoToByLevelDraw = function(){
            $state.go('byLevelDraw');
        };
         vm.GoToHelp = function(){
            $state.go('help');
        };
         vm.GoToAbout = function(){
            $state.go('about');
        };
    }
