'use strict';
angular.module('techmApp').controller('AllCoversCtrl', function($scope, RestService, UserService, $rootScope) {
    $scope.covers = UserService.covers().query();
});