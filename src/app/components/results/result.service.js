    angular
        .module('result')
        .service('resultService', resultService);

    resultService.$inject = ['$state'];
    function resultService($state) {
        var results = [];

        function getResults(){
            return results;
        }
        function pushResult(result){
            results.push(result);
        }

        function emptyResults(){
            results = [];
        }

        function resultsAreNotEmpty(){
        return results.length>0;
        } 
            
        return {
            getResults:getResults,
            pushResult:pushResult,
            emptyResults:emptyResults,
            resultsAreNotEmpty:resultsAreNotEmpty
        }
        };