'use strict';
angular.module('techmApp').controller('MyCoversCtrl', function($scope, RestService, UserService, $rootScope) {
    $scope.myCovers = $rootScope.currentUser ? UserService.covers().query({userId: $rootScope.currentUser.id}) : null;
});