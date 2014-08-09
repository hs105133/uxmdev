'use strict';
angular.module('techmApp').controller('CleanupCtrl', function($scope, $rootScope, UserService) {

    $scope.removeAllCovers = function() {
        $scope.$parent.flashMsg = false;
        UserService.deleteAllCovers().success(function(res){
            $scope.alertClass = "alert-success";
            $scope.$parent.flashMsg = "You have successfully deleted all covers";
        }).error(function(res){
            $scope.alertClass = "alert-danger";
            $scope.$parent.flashMsg = res.message;
        });
    };    

    $scope.removeAllSlides = function() {
        $scope.$parent.flashMsg = false;
        UserService.deleteAllSlides().success(function(res){
            $scope.alertClass = "alert-success";
            $scope.$parent.flashMsg = "You have successfully deleted all slides";
        }).error(function(res){
            $scope.alertClass = "alert-danger";
            $scope.$parent.flashMsg = res.message;
        });
    };    

    $scope.removeAllUsers = function() {
        $scope.$parent.flashMsg = false;
        UserService.deleteAllUsers().success(function(res){
            $scope.alertClass = "alert-success";
            $scope.$parent.flashMsg = "You have successfully deleted all users";
        }).error(function(res){
            $scope.alertClass = "alert-danger";
            $scope.$parent.flashMsg = res.message;
        });
    };
    $scope.removeAllComments = function() {
        $scope.$parent.flashMsg = false;
        UserService.deleteAllComments().success(function(res){
            $scope.alertClass = "alert-success";
            $scope.$parent.flashMsg = "You have successfully deleted all comments";
        }).error(function(res){
            $scope.alertClass = "alert-danger";
            $scope.$parent.flashMsg = res.message;
        });
    };
});
