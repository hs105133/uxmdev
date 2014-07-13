'use strict';

angular.module('techmApp').controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService', '$rootScope', function($scope, $location, $window, UserService, $rootScope) {

    $scope.logIn = function(){ 
            UserService.logIn($scope.formData).success(function(data) {

               UserService.getUser().success(function(res){
                 UserService.getMe(res);
                 $location.path("/");
               });
                
            }).error(function(res, status) {
                $rootScope.flashMsg = res.message;
            });
    };

    $scope.logout = function() {
            $rootScope.flashMsg = false;
            UserService.logOut();
    };

    $rootScope.closeAlert = function(){
        $rootScope.flashMsg = false;
    };
}]);