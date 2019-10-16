angular
    .module('components')
    .component('byLevelDraw', {
        templateUrl: './by-level-draw.component.html',
        controller: byLevelDrawController,
        controllerAs: 'vm',
        bindings: {
            Binding: '=',
        },
    });

byLevelDrawController.$inject = ['$state', 'resultService', '$cookies'];

function byLevelDrawController($state, resultService, $cookies) {
    var vm = this;
    vm.name = "הגרל בין רמות";
    vm.CountPro = $cookies.getObject('countPro') ? $cookies.getObject('countPro') : 0;
    vm.CountAmateur = $cookies.getObject('countAmateur') ? $cookies.getObject('countAmateur') : 0;
    vm.PlayersPro = $cookies.getObject('playersPro');;
    vm.PlayersAmateur = $cookies.getObject('playersAmateur');


    vm.AddOnePro = function () {
        if (vm.CountPro == 0) {
            vm.CountPro = 2;
        }
        else if (vm.CountPro < 10) {
            vm.CountPro++;
        }
    };

    vm.RemoveOnePro = function () {
        if (vm.CountPro > 2) {
            vm.CountPro--;
        }
    };

    vm.AddOneAmateur = function () {
        if (vm.CountAmateur == 0) {
            vm.CountAmateur = 2;
        }
        else if (vm.CountAmateur < 10) {
            vm.CountAmateur++;
        }
    };

    vm.RemoveOneAmateur = function () {
        if (vm.CountAmateur > 2) {
            vm.CountAmateur--;
        }
    };

    vm.Submit = function () {
        if (vm.CountPro != 0 && vm.CountAmateur != 0) {
            this.isInvalid = false;
            $cookies.remove('mode');
            $cookies.remove('countPro');
            $cookies.remove('countAmateur');
            $cookies.remove('playersPro');
            $cookies.remove('playersAmateur');
            vm.PlayersPro = new Array(parseInt(vm.CountPro));
            vm.PlayersAmateur = new Array(parseInt(vm.CountAmateur));
            for (var i = 0; i < vm.PlayersPro.length; i++) {
                vm.PlayersPro[i] = { name: "" };
            }
            for (i = 0; i < vm.PlayersAmateur.length; i++) {
                vm.PlayersAmateur[i] = { name: "" };
            }
            vm.ShowButton = true;
            vm.IsValid = true;
        }
        else {
            vm.isInvalid = true;
        }
    };

    vm.Shuffle = function () {
        if (vm.playersForm.$valid) {
            resultService.emptyResults();
            $cookies.put('mode', 'level');
            $cookies.putObject('countPro', vm.CountPro);
            $cookies.putObject('countAmateur', vm.CountAmateur);
            $cookies.putObject('playersPro', vm.PlayersPro);
            $cookies.putObject('playersAmateur', vm.PlayersAmateur);
            $state.go('result');
        }
        else {
            vm.showPlayersError = true;
        }
    };

    vm.RandomizeResults = function (array) {

        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };
}
