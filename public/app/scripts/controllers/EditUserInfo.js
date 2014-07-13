'use strict';
angular.module('techmApp').controller('EditUserInfo', function($scope, UserService, $routeParams, $rootScope, $location, $upload) {
    $scope.formData = $rootScope.currentUser;
    $scope.updateUserInfo = function() {
        UserService.user().save($scope.formData, function(res) {
            UserService.getMe(res);
            $location.path("/myprofile");
        });
    };

    // duplicated in createPresentationCtrl.js, need to be converted in service
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
            // method: 'POST' or 'PUT',
            // headers: {'header-key': 'header-value'},
            // withCredentials: true,
            // data: {
            //     myObj: "hemant Singh"
            // },
            file: $scope.selectedFiles[index], // or list of files: $files for html5 only
            /* set the file formData name ('Content-Desposition'). Default is 'file' */
            //fileFormDataName: myFile, //or a list of names for multiple files (html5).
            /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
            //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
            $scope.progress[index] = 0;
            $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            $scope.formData.profilepic = "store/images/" + data[0].filename;
            // not so cool need to be optimized
            UserService.user().update({ id: $scope.currentUser.id, profilepic : "store/images/" + data[0].filename}, function(data, error) {
            	UserService.getMe(data);
            });
        });
    };

});
