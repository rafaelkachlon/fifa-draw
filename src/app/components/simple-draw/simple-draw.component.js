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
            var counter = 0;
            if (vm.Players) {
                //check if user inserted name for all players
                for (var i = 0; i < vm.Players.length; i++) {
                    if (vm.Players[i].name != "") {
                        counter++;
                    }
                }
            }
            if (counter == vm.Players.length) {
                $cookies.putObject('count', vm.Count);
                $cookies.putObject('players', vm.Players);
                resultService.emptyResults();
                var arr = vm.randomizeResults(vm.Players);
                while (arr.length != 0) {
                    var couple = {};
                    if (arr.length == 1) {
                        couple = {};
                        couple.first = arr[arr.length - 1].name;
                        couple.second = null;
                        resultService.pushResult(couple);
                        arr.pop();
                    }
                    else {
                        couple = {};
                        couple.first = arr[arr.length - 1].name;
                        couple.second = arr[arr.length - 2].name;
                        resultService.pushResult(couple);
                        arr.pop();
                        arr.pop();
                    }
                }
                $state.go('result');
            }
            else {
                vm.showPlayersError = true;
            }

        }
        else {
            console.log('invalid');
            vm.showPlayersError = true;
        }
    };

    vm.randomizeResults = function (array) {
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
