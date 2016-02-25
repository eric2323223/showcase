'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.vis'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
    $scope.data = [1,1,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,3,3,1,3,2,2,2,2,2,2,2,2,2,2,1,2,2,1,1,1,3,2,2];

}]);