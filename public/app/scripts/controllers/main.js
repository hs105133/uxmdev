'use strict';

angular.module('techmApp')
  .controller('navbarCtrl', function($scope, $location) {
    $scope.$path = $location.path.bind($location);
});