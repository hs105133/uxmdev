'use strict';
angular.module('techmApp').controller('EditCoverCtrl', function($scope, UserService, $rootScope, $http, $routeParams, $location, $upload) {

    $scope.formData = UserService.covers().get({id: $routeParams.coverId});
    $rootScope.flashMsg = false;

    $scope.onFileSelect = function($files) {
        $scope.selectedFiles = $files;
        $scope.progress = [];
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.progress[i] = -1;
            $scope.start(i);
        }

    };

    $scope.start = function(index) {
        $scope.progress[index] = 0;
        $scope.upload = $upload.upload({
            url: "/upload?subdir=images",
            file: $scope.selectedFiles[index],
        }).progress(function(evt) {
            $scope.progress[index] = 0;
            $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            $scope.formData.coverImg = "store/images/" + data[0].filename;
        });
    };
    // process the form
    $scope.updateCover = function() {

        $rootScope.flashMsg = false;

        if(!$scope.formData.coverImg){
            $scope.formData.coverImg = "http://placehold.it/300x300";
        }

        UserService.covers().update($scope.formData, function(data, error) {

            $rootScope.flashMsg = true;

        }, function(error) {
            console.log("error");
        });

    };
    
    // duplicated in UsersCoverCtrl.js
    $scope.deleteCover = function(coverId){
        UserService.covers().remove({ id: coverId}, function(result, error) {
            $location.path("/");
        });
    };    

});
