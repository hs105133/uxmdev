'use strict';
angular.module('techmApp').controller('MyCoversCtrl', function($scope, UserService, $rootScope) {
    $scope.myCovers = $rootScope.currentUser ? UserService.covers().query({
        userId: $rootScope.currentUser.id
    }) : null;
});
