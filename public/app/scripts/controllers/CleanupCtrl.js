'use strict';
angular.module('techmApp').controller('CleanupCtrl', function($scope, $rootScope, UserService) {

    function removeAllResource(url, flashMessage) {
        $scope.$parent.flashMsg = false;
        UserService.deleteAllResource(url).success(function(res){
            $scope.alertClass = "alert-success";
            $scope.$parent.flashMsg = flashMessage;
        }).error(function(res){
            $scope.alertClass = "alert-danger";
            $scope.$parent.flashMsg = res.message;
        });
    };    

    $scope.removeAllCovers = function() {
        removeAllResource('/covers/?{"id": {"$ne": "701e275088775a60" }}', "You have successfully deleted all covers");
    };   

    $scope.removeAllSlides = function() {
        removeAllResource('/slides?{"id": {"$nin": ["f474392b42557a3d", "641dffbc4b5b0822", "4823697b6f0f5969","2343e21f82a7f8f6", "c1c2e96523e95b8e", "b1363ceaa4457880","536b7a07f622c83b", "c88407f53aaca8ec", "f7d5f2d58781bb67", "6b94547159e4cacc", "406d5442b91298a8", "db78ea09567aeb16", "bdebda8ecbcf78e3", "656d56df7d6bc8aa", "46ab57e9850afa00", "77816dd99692898c", "5412e831b6774a1a", "7e29cc1ff67a7b5d", "8610331aa488faa6", "d119de7d111998b0", "20510cc41dc1482b", "abacb1eece29c998"]}}', "You have successfully deleted all slides");
    };    

    $scope.removeAllUsers = function() {
        removeAllResource('/users/?{"id": {"$ne": "a754bf24905e7859" }}', "You have successfully deleted all users");
    };
    $scope.removeAllComments = function() {
        removeAllResource('/comments/?{"id": {"$ne": "424576eafc51bbea" }}', "You have successfully deleted all comments")
    };
});
