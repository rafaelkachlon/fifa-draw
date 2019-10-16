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
        if(players){
         randomizeResults(players);
        }
        return results.length > 0;
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
        // return array;
    }

    return {
        getResults: getResults,
        pushResult: pushResult,
        emptyResults: emptyResults,
        resultsAreNotEmpty: resultsAreNotEmpty,
        RandomizeResults: randomizeResults
    };
}