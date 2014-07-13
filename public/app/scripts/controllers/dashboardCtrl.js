'use strict';
angular.module('techmApp').controller('dashboardCtrl', function($scope, RestService, UserService, $rootScope) {
   // $scope.users = RestService.userService().query();
    $scope.covers = UserService.covers().query();
    $scope.myCovers = $rootScope.currentUser ? UserService.covers().query({userId: $rootScope.currentUser.id}) : null;
});