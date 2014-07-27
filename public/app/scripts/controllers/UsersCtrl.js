'use strict';
angular.module('techmApp').controller('UsersCtrl', function($scope, UserService) {
    $scope.users = UserService.user().query();
});
