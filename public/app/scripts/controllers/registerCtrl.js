'use strict';
angular.module('techmApp').controller('RegisterCtrl', function($scope, UserService, $rootScope, $location) {
//   if (document.referrer && document.referrer !== location.href) {
//     $scope.referrer = document.referrer;
//   } else {
//     $scope.referrer = '#/';
//   }

  $scope.formData = {};

  $scope.register = function() {
    $rootScope.flashMsg = false;  
    UserService.user().save($scope.formData, function(userData){

      UserService.logIn($scope.formData).success(function(res, error){
        UserService.getMe(userData);
        $location.path("/");
      }, function(res){
        $rootScope.flashMsg = res.data.message;
      });

    }, function(res){
      $rootScope.flashMsg = "Username is already in use";
    });

  };

});