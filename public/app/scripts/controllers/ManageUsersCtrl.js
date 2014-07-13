'use strict';
angular.module('techmApp').controller('ManageUsersCtrl', function($scope, UserService, $rootScope) {
   $scope.users = UserService.user().query();
   
    $scope.removeUser = function(index, userId){
        UserService.user().remove({id: userId});
        $scope.users.splice(index,1);
    };   
});