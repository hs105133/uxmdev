'use strict';
angular.module('techmApp').controller('dashboardCtrl', function($scope, $rootScope, UserService) {
    $scope.covers = UserService.covers().query();
    $scope.myCovers = $rootScope.currentUser ? UserService.covers().query({
        userId: $rootScope.currentUser.id
    }) : null;
});
