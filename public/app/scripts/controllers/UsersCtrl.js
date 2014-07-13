'use strict';
angular.module('techmApp').controller('UsersCtrl', function($scope, UserService, $rootScope) {
   $scope.users = UserService.user().query();
});