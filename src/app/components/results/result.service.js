angular
    .module('result')
    .service('resultService', resultService);

resultService.$inject = ['$cookies'];

function resultService($cookies) {
    var results = [];

    function getResults() {
        return results;
    }
    function pushResult(result) {
        results.push(result);
    }

    function emptyResults() {
        results = [];
    }

    function resultsAreNotEmpty() {
        var players = $cookies.getObject('players');
        var playersPro = $cookies.getObject('playersPro');
        if (players || playersPro) {
            makeCouples();
        }
        return results.length > 0;
    }

    function makeCouples() {
        var mode = $cookies.get('mode');
        if (mode === 'simple') {
            var players = $cookies.getObject('players');
            players = randomizeResults(players);
            handleSimpleDraw(players)
        }
        else if (mode === 'level') {
            var playersPro = $cookies.getObject('playersPro');
            var playersAmateur = $cookies.getObject('playersAmateur');
            playersPro = randomizeResults(playersPro);
            playersAmateur = randomizeResults(playersAmateur);
            handleByLevelDraw(playersAmateur, playersPro);
        }
    }
    function randomizeResults(array) {
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

    }

    function handleSimpleDraw(array) {
        while (array.length != 0) {
            var couple = {};
            if (array.length == 1) {
                couple = {};
                couple.first = array[array.length - 1].name;
                couple.second = null;
                results.push(couple);
                array.pop();
            }
            else {
                couple = {};
                couple.first = array[array.length - 1].name;
                couple.second = array[array.length - 2].name;
                results.push(couple);
                array.pop();
                array.pop();
            }
        }
    }

    function handleByLevelDraw(arrPro, arrAmateur) {
        while (arrPro.length != 0 || arrAmateur.length != 0) {
            var couple = {};
            if (arrPro.length == 1 || arrAmateur.length == 1) {

                if (arrPro.length == 1 && arrAmateur.length == 1) {

                    couple = {};
                    couple.first = arrPro[arrPro.length - 1].name;
                    couple.second = arrAmateur[arrAmateur.length - 1].name;
                    results.push(couple);
                    arrPro.pop();
                    arrAmateur.pop();
                }

                else if (arrPro.length <= 1 && arrAmateur.length == 0) {
                    couple = {};
                    couple.first = arrPro[arrPro.length - 1].name;
                    couple.second = null;
                    results.push(couple);
                    arrPro.pop();
                }
                else if (arrPro.length == 0 && arrAmateur.length <= 1) {
                    couple = {};
                    couple.first = arrAmateur[arrAmateur.length - 1].name;
                    couple.second = null;
                    results.push(couple);
                    arrAmateur.pop();
                }
                else if (arrPro.length > 1 && arrAmateur.length == 1) {
                    couple = {};
                    couple.first = arrPro[arrPro.length - 1].name;
                    couple.second = arrAmateur[arrAmateur.length - 1].name;
                    results.push(couple);
                    arrPro.pop();
                    arrAmateur.pop();
                }
                else if (arrPro.length == 1 && arrAmateur.length > 1) {
                    couple = {};
                    couple.first = arrPro[arrPro.length - 1].name;
                    couple.second = arrAmateur[arrAmateur.length - 1].name;
                    results.push(couple);
                    arrPro.pop();
                    arrAmateur.pop();
                }
            }
            else {
                if (arrPro.length > 0 && arrAmateur.length > 0) {
                    couple = {};
                    couple.first = arrPro[arrPro.length - 1].name;
                    couple.second = arrAmateur[arrAmateur.length - 1].name;
                    results.push(couple);
                    arrPro.pop();
                    arrAmateur.pop();
                }
                else {
                    if (arrPro.length == 0) {
                        if (arrAmateur.length > 1) {
                            couple = {};
                            couple.first = arrAmateur[arrAmateur.length - 1].name;
                            couple.second = arrAmateur[arrAmateur.length - 2].name;
                            results.push(couple);
                            arrAmateur.pop();
                            arrAmateur.pop();
                        }
                        else {
                            couple = {};
                            couple.first = arrAmateur[arrAmateur.length - 1].name;
                            couple.second = null;
                            results.push(couple);
                            arrAmateur.pop();
                        }
                    }
                    else if (arrAmateur.length == 0) {
                        if (arrPro.length > 1) {
                            couple = {};
                            couple.first = arrPro[arrPro.length - 1].name;
                            couple.second = arrPro[arrPro.length - 2].name;
                            results.push(couple);
                            arrPro.pop();
                            arrPro.pop();
                        }
                        else {
                            Scouple = {};
                            couple.first = arrPro[arrPro.length - 1].name;
                            couple.second = null;
                            results.push(couple);
                            arrPro.pop();
                        }
                    }
                }

            }
        }
    }

    return {
        getResults: getResults,
        pushResult: pushResult,
        emptyResults: emptyResults,
        resultsAreNotEmpty: resultsAreNotEmpty,
        RandomizeResults: randomizeResults
    };
}