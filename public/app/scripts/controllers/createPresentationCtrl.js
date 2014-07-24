'use strict';
angular.module('techmApp').controller('createPresentationCtrl', function($scope, PresentationService, $http, $rootScope, $upload) {
    //page.setPage("Create Cover");
    $scope.formData = {};
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
            url: "/upload?subdir=images", //upload.php script, node.js route, or servlet url

            // method: 'POST' or 'PUT',
            // headers: {'header-key': 'header-value'},
            // withCredentials: true,
            // data: {
            //     myObj: $scope.myModelObj
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
            $scope.formData.coverImg = "store/images/" + data[0].filename;
        });
    };

    // $scope.onFileSelected = function(files) {

    //     var fd = new FormData();
    //     //Take the first selected file
    //     fd.append("file", files[0]);

    //     $http.post("/upload?subdir=images", fd, {
    //         headers: {
    //             'Content-Type': undefined
    //         },
    //         transformRequest: angular.identity
    //     }).success(function(data) {



    //         $scope.formData.coverImg = "store/images/" + data[0].filename;



    //     }).error(function(data) {
    //         console.log("errr", data);
    //     });

    // };

    // process the form
    $scope.addCover = function() {

        $rootScope.flashMsg = false;

        if (!$scope.formData.coverImg) {
            $scope.formData.coverImg = "http://placehold.it/300x300";
        }

        PresentationService.addCover().save($scope.formData, function(data, error) {
            console.log("success", data);

            $scope.addCoverForm.$setPristine();
            $scope.formData = {};
            $scope.selectedFiles = [];
            addCoverForm.reset(); // jshint ignore:line
            $scope.$parent.flashMsg = true;

            // if (!data.success) {
            //             // if not successful, bind errors to error variables
            //             $scope.errorName = "Username nOt valid";
            //                 } else {
            //             // if successful, bind success message to message
            //             $scope.message = "LOgin Success";
            //             }

        }, function(error) {
            console.log("error");
        });

    };

});
