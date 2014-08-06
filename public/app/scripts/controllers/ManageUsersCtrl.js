'use strict';
angular.module('techmApp').controller('ManageUsersCtrl', function($scope, $rootScope, UserService) {
    $scope.users = UserService.user().query();

    $scope.removeUser = function(index, userId) {
    	$scope.$parent.flashMsg = false;
        UserService.user().remove({
            id: userId
        },function(res){
        	$scope.users.splice(index, 1);
        	$scope.$parent.flashMsg = false;
        },function(res){
        	$scope.$parent.flashMsg = res.data.message;
        });       
    };
});
