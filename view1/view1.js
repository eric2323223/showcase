'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.vis'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$interval',  function($scope, $interval) {
  $scope.randomNumber = 10;
      $interval(function () {
        $scope.randomNumber = Math.floor(Math.random()*501)
      }, 2000);
}]);