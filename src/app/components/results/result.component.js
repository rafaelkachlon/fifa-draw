angular
    .module('components')
    .component('result', {
        templateUrl: './result.component.html',
        controller: resultController,
        controllerAs: 'vm'
    });

resultController.$inject = ['$state', 'resultService','$timeout'];

function resultController($state, resultService,$timeout) {
    if (resultService.resultsAreNotEmpty() ||true) {
        var vm = this;
        vm.name = "והרי תוצאות";
        vm.couples = [];

        vm.$onInit = function () {
            $timeout(function(){
            vm.couples = resultService.getResults();
            console.log(vm.couples);
            },1000)
        };
    }
    else {
        $state.go('menu');
    }
}
