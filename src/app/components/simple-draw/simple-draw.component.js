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

simpleDrawController.$inject = ['$state', 'resultService', '$cookies'];

function simpleDrawController($state, resultService, $cookies) {
    var vm = this;
    vm.name = "הגרלה רגילה";
    vm.isInvalid = false;
    vm.Count = $cookies.getObject('count') ? $cookies.getObject('count') : 0;
    vm.ShowButton = false;
    vm.showPlayersError = false;
    vm.Players = $cookies.getObject('players');


    vm.Submit = function () {
        if (vm.Count != 0) {
            this.isInvalid = false;
            $cookies.remove('mode');
            $cookies.remove('count');
            $cookies.remove('players');
            vm.Players = new Array(parseInt(vm.Count));
            for (var i = 0; i < vm.Players.length; i++) {
                vm.Players[i] = { name: null };
            }
            vm.ShowButton = true;
        }
        else {
            vm.isInvalid = true;
        }
    };

    vm.AddOne = function () {
        if (vm.Count == 0) {
            vm.Count = 4;
        }
        else if (vm.Count < 20) {
            vm.Count++;
        }
    };

    vm.RemoveOne = function () {
        if (vm.Count > 4) {
            vm.Count--;
        }
    };


    vm.Shuffle = function () {
        if (vm.playersForm.$valid) {
            $cookies.put('mode', 'simple');
            $cookies.putObject('count', vm.Count);
            $cookies.putObject('players', vm.Players);
            resultService.emptyResults();
            $state.go('result');
        }
        else {
            vm.showPlayersError = true;
        }
    };
}
