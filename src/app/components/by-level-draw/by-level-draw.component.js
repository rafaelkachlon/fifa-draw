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

byLevelDrawController.$inject = ['$state', 'resultService'];

function byLevelDrawController($state, resultService) {
    var vm = this;
    vm.name = "הגרל בין רמות";
    vm.countPro = 0;
    vm.countAmateur = 0;
    vm.playersPro = null;
    vm.playersAmateur = null;


    vm.addOnePro = function () {
        if (vm.CountPro == 0) {
            vm.CountPro = 2;
        }
        else if (vm.CountPro < 10) {
            vm.CountPro++;
        }
    };

    vm.removeOnePro = function () {
        if (vm.CountPro > 2) {
            vm.CountPro--;
        }
    };

    vm.addOneAmateur = function () {
        if (vm.CountAmateur == 0) {
            vm.CountAmateur = 2;
        }
        else if (vm.CountAmateur < 10) {
            vm.CountAmateur++;
        }
    };

    vm.removeOneAmateur = function () {
        if (vm.CountAmateur > 2) {
            vm.CountAmateur--;
        }
    };

    vm.submit = function () {
        if (vm.CountPro != 0 && vm.CountAmateur != 0) {
            this.isInvalid = false;

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

    vm.shuffle = function () {

        var counterPro = 0;
        var counterAmateur = 0;
        if (vm.PlayersPro && vm.PlayersAmateur) {
            for (var i = 0; i < vm.PlayersPro.length; i++) {
                if (vm.PlayersPro[i].name != "") {
                    counterPro++;
                }
            }
            for (i = 0; i < vm.PlayersAmateur.length; i++) {
                if (vm.PlayersAmateur[i].name != "") {
                    counterAmateur++;
                }
            }
        }
        if (counterPro == vm.PlayersPro.length && counterAmateur == vm.PlayersAmateur.length) {

            resultService.emptyResults();
            var arrPro = vm.randomizeResults(vm.PlayersPro);
            var arrAmateur = vm.randomizeResults(vm.PlayersAmateur);
            while (arrPro.length != 0 || arrAmateur.length != 0) {
                var couple = {};
                if (arrPro.length == 1 || arrAmateur.length == 1) {

                    if (arrPro.length == 1 && arrAmateur.length == 1) {

                        couple = {};
                        couple.first = arrPro[arrPro.length - 1].name;
                        couple.second = arrAmateur[arrAmateur.length - 1].name;
                        resultService.pushResult(couple);
                        arrPro.pop();
                        arrAmateur.pop();
                    }

                    else if (arrPro.length <= 1 && arrAmateur.length == 0) {
                        couple = {};
                        couple.first = arrPro[arrPro.length - 1].name;
                        couple.second = null;
                        resultService.pushResult(couple);
                        arrPro.pop();
                    }
                    else if (arrPro.length == 0 && arrAmateur.length <= 1) {
                        couple = {};
                        couple.first = arrAmateur[arrAmateur.length - 1].name;
                        couple.second = null;
                        resultService.pushResult(couple);
                        arrAmateur.pop();
                    }
                    else if (arrPro.length > 1 && arrAmateur.length == 1) {
                        couple = {};
                        couple.first = arrPro[arrPro.length - 1].name;
                        couple.second = arrAmateur[arrAmateur.length - 1].name;
                        resultService.pushResult(couple);
                        arrPro.pop();
                        arrAmateur.pop();
                    }
                    else if (arrPro.length == 1 && arrAmateur.length > 1) {
                        couple = {};
                        couple.first = arrPro[arrPro.length - 1].name;
                        couple.second = arrAmateur[arrAmateur.length - 1].name;
                        resultService.pushResult(couple);
                        arrPro.pop();
                        arrAmateur.pop();
                    }
                }
                else {
                    if (arrPro.length > 0 && arrAmateur.length > 0) {
                        couple = {};
                        couple.first = arrPro[arrPro.length - 1].name;
                        couple.second = arrAmateur[arrAmateur.length - 1].name;
                        resultService.pushResult(couple);
                        arrPro.pop();
                        arrAmateur.pop();
                    }
                    else {
                        if (arrPro.length == 0) {
                            if (arrAmateur.length > 1) {
                                couple = {};
                                couple.first = arrAmateur[arrAmateur.length - 1].name;
                                couple.second = arrAmateur[arrAmateur.length - 2].name;
                                resultService.pushResult(couple);
                                arrAmateur.pop();
                                arrAmateur.pop();
                            }
                            else {
                                couple = {};
                                couple.first = arrAmateur[arrAmateur.length - 1].name;
                                couple.second = null;
                                resultService.pushResult(couple);
                                arrAmateur.pop();
                            }
                        }
                        else if (arrAmateur.length == 0) {
                            if (arrPro.length > 1) {
                                couple = {};
                                couple.first = arrPro[arrPro.length - 1].name;
                                couple.second = arrPro[arrPro.length - 2].name;
                                resultService.pushResult(couple);
                                arrPro.pop();
                                arrPro.pop();
                            }
                            else {
                                Scouple = {};
                                couple.first = arrPro[arrPro.length - 1].name;
                                couple.second = null;
                                resultService.pushResult(couple);
                                arrPro.pop();
                            }
                        }
                    }

                }
            }
            $state.go('result');
        }
        else {
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
