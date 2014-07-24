'use strict';

angular.module('techmApp').controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService', '$rootScope', function($scope, $location, $window, UserService, $rootScope) {
    $scope.$parent.flashMsg = false;
    $scope.logIn = function(){ 
            $scope.$parent.flashMsg = false;
            UserService.logIn($scope.formData).success(function(data) {
                
               UserService.getUser().success(function(res){
                 UserService.getMe(res);
                 $location.path("/");
               });
                
            }).error(function(res, status) {
               $scope.$parent.flashMsg = res.message;
            });
    };

    $scope.logout = function() {
            $scope.$parent.flashMsg = false;
            UserService.logOut();
    };

}]);