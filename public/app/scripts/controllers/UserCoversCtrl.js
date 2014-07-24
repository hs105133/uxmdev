'use strict';
angular.module('techmApp').controller('UserCoversCtrl', function($scope, UserService, $rootScope) {     
    $scope.myCovers = UserService.covers().query({userId: $rootScope.currentUser.id});
    $scope.deleteCover = function(index, coverId){
        UserService.covers().remove({id: coverId});
        $scope.myCovers.splice(index,1);
    };
});