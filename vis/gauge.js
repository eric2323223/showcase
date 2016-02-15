angular.module('myApp.vis').directive('d3gauge', function() {
    return {
        restrict: 'AE',
        scope: {
            id: '@',
            size: '=',
            min: '=',
            max: '=',
            label: '=',
            value: '='
            //startColor: '@',
            //endColor: '@',
            //value: '=',
            //sections: '=',
            //border: '='
        },
        template: '<div id={{id}} class="d3-gauge"></div>',
        link: function (scope) {
            var config = {
                id: scope.id,
                size: scope.size,
                height: scope.height,
                min: scope.min,
                max: scope.max,
                label: scope.label
                //colorStart: scope.startColor,
                //colorEnd: scope.endColor,
                //inputSections: scope.sections,
                //border: scope.border === true ? true : false
            };
            var gauge = new d3.custom.gauge(d3.select('#'+scope.id), config, parseInt(scope.value));

            scope.$watch('value', function (updatedValue) {
                gauge.write(updatedValue);
            });
        }
    }

});