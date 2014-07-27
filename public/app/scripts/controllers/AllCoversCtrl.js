'use strict';
angular.module('techmApp').controller('AllCoversCtrl', function($scope, $rootScope, RestService, UserService) {
    $scope.covers = UserService.covers().query();
});
