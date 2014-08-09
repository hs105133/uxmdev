'use strict';
angular.module('techmApp').controller('RegisterCtrl', function($scope, $rootScope, $location, UserService) {
    //   if (document.referrer && document.referrer !== location.href) {
    //     $scope.referrer = document.referrer;
    //   } else {
    //     $scope.referrer = '#/';
    //   }

    $scope.formData = {};
    $scope.$parent.flashMsg = false;

    $scope.register = function() {
        $scope.$parent.flashMsg = false;
        if ($location.path() === '/add-admin') {
            $scope.formData.role = "Admin";
        }
        UserService.user().save($scope.formData, function(userData) {

            UserService.logIn($scope.formData).success(function(res, error) {   
                if ($location.path() === '/add-admin') {
                    $scope.alertClass = "alert-success"; 
                    $scope.$parent.flashMsg = "Admin User created successfully";
                    $scope.formData = {};
                    $scope.signupForm.$setPristine();
                    signupForm.reset(); // jshint ignore:line
                } else {
                    UserService.getMe(userData);
                    $location.path("/");                    
                }
            }, function(res) {
                $scope.alertClass = "alert-danger";
                $scope.$parent.flashMsg = res.data.message;
            });

        }, function(res) {
            $scope.alertClass = "alert-danger";
            $scope.$parent.flashMsg = res.data.errors ? "Username is already in use" : res.data.message;
        });

    };

});
