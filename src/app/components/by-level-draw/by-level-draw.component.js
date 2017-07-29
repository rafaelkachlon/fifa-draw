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

function byLevelDrawController() {
    var vm = this;
    vm.name = "הגרלה לפי רמה";
}
