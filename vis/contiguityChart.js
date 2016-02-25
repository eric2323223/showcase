angular.module('myApp.vis').directive('contiguityChart', function() {
    return {
        restrict: 'AE',
        scope: {
            id: '@',
            height: '=',
            width: '=',
            value: '='
            //startColor: '@',
            //endColor: '@',
            //value: '=',
            //sections: '=',
            //border: '='
        },
        template: '<div id={{id}}></div>',
        link: function (scope) {

            var config = {
                id: scope.id,
                width: scope.width,
                height: scope.height,
                //colorStart: scope.startColor,
                //colorEnd: scope.endColor,
                //inputSections: scope.sections,
                //border: scope.border === true ? true : false
            };


            var contiguityChart = new D3contiguityChart(d3.select('#'+scope.id), config, parseInt(scope.value));

            scope.$watch('value', function (updatedValue) {
                contiguityChart.render(updatedValue);
            });
        }
    }

});