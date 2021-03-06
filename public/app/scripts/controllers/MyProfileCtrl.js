'use strict';
angular.module('techmApp').controller('MyProfileCtrl', function($scope, $rootScope, $location, $routeParams, UserService) {

    var userId = $routeParams.userId;

    if (userId && (!$rootScope.currentUser || $rootScope.currentUser.id !== userId)) {
        UserService.user().get({
            id: userId
        }, function(res) {
            $scope.otherUser = true;
            $scope.userInfo = res;
        });
    } else {
        $scope.otherUser = false;
        $scope.userInfo = $rootScope.currentUser;
    }
});
