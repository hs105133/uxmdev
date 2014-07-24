'use strict';

angular.module('techmApp').controller('addSlideCtrl', function($scope, RestService, $rootScope, $http, $location, $routeParams, $upload) {

    $rootScope.flashMsg = false;

    $scope.setSelectedCover = function() {
        $scope.formData.coverId = $routeParams.coverId ? $routeParams.coverId : null;
    };

    $scope.updateCoverRoute = function(coverId) {
        $location.search('coverId', coverId);
    };

    var userIdQuery = $rootScope.currentUser ? {
        userId: $rootScope.currentUser.id
    } : {
        userId: {
            $exists: false
        }
    };


    RestService.myCoverService(userIdQuery).success(function(data) {
        $scope.covers = data;
        $scope.setSelectedCover();
    });

    var resetItems = function() {
        $scope.formData = {};
        $scope.removeDLFlag = false;
        $scope.removeImageListFlag = false;
        $scope.removeTableHeaderFlag = false;
        $scope.removeTableCellFlag = false;

        $scope.formData.dl = [
            // {
            //     dt: "term 1 ",
            //     dd: "data 1"
            // }
        ];

        $scope.formData.imageList = [
            // {
            //     imgUrl: "http://placehold.it/64x64",
            //     imgDesc: "Something about image"
            // }
        ];

        $scope.formData.table = {
            // headers: [ "header 1"],
            // rows: [["data 1"]]
            headers: [],
            rows: []
        };

        $scope.formData.bullets = [];
        $(".collapse").not(":first").removeClass("in");
    };

    resetItems();

    $scope.onFileSelect = function(files) {
        $scope.selectedFiles = files;
        $scope.progress = [];
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
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
            $scope.formData.src = "store/images/" + data[0].filename;
        });
    };

    $scope.onImgListFileSelect = function(files, imgIndex, imgListIndex) {
        $scope.selectedFiles1 = files;
        $scope.formData.imageList[imgListIndex].progress1 = [];
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            $scope.formData.imageList[imgListIndex].progress1[i] = -1;
            $scope.imgListStart(i, imgIndex, imgListIndex);
        }

    };



    $scope.imgListStart = function(index, imgIndex, imgListIndex) {
        console.log(imgIndex, imgListIndex);
        $scope.formData.imageList[imgListIndex].progress1[index] = 0;
        $scope.upload = $upload.upload({
            url: "/upload?subdir=images",
            method: "PUT", 
            // method: 'POST' or 'PUT',
            // headers: {'header-key': 'header-value'},
            // withCredentials: true,
            // data: {
            //     myObj: $scope.myModelObj
            // },
            file: $scope.selectedFiles1[index], // or list of files: $files for html5 only
            /* set the file formData name ('Content-Desposition'). Default is 'file' */
            //fileFormDataName: myFile, //or a list of names for multiple files (html5).
            /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
            //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
            $scope.formData.imageList[imgListIndex].progress1[index] = 0;
            $scope.formData.imageList[imgListIndex].progress1[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            
             if(imgListIndex !== undefined){
                $scope.formData.imageList[imgListIndex].imgUrl = "store/images/" + data[0].filename; 
            } else {
                $scope.formData.src = "store/images/" + data[0].filename;
            }
               
        });
    };

    // $scope.onFileSelected = function(files, imgIndex) {

    //     var fd = new FormData();
    //     //Take the first selected file
    //     fd.append("file", files[0]);

    //     $http.post("/upload", fd, {
    //         headers: {
    //             'Content-Type': undefined
    //         },
    //         transformRequest: angular.identity
    //     }).success(function(data) {

    //         console.log(imgIndex);

    //         if (imgIndex !== undefined) {
    //             $scope.formData.imageList[imgIndex].imgUrl = "../store/" + data[0].filename;
    //         } else {
    //             $scope.formData.src = "../store/" + data[0].filename;
    //         }





    //     }).error(function(data) {
    //         console.log("errr", data);
    //     });

    // };

    $scope.addDL = function(index) {
        var len = $scope.formData.dl.length + 1;
        $scope.removeDLFlag = true;
        $scope.formData.dl.push({
            dt: "term " + len,
            dd: "data " + len
        });
    };

    $scope.removeDL = function() {
        $scope.formData.dl.pop();
        if ($scope.formData.dl.length === 1)
            $scope.removeDLFlag = false;
    };

    $scope.addImageList = function(index) {
        var len = $scope.formData.imageList.length + 1;
        $scope.removeImageListFlag = true;
        $scope.formData.imageList.push({
            imgUrl: "http://placehold.it/64x64",
            imgDesc: "Something about image " + len
        });
    };

    $scope.removeImageList = function() {
        $scope.formData.imageList.pop();
        if ($scope.formData.imageList.length === 1)
            $scope.removeImageListFlag = false;
    };

    $scope.addTableHeader = function() {
        var len = $scope.formData.table.headers.length + 1;
        $scope.removeTableHeaderFlag = true;
        $scope.formData.table.headers.push("header " + len);

        $scope.formData.table.rows[0] = new Array(len);
        angular.forEach($scope.formData.table.rows, function(row, i) {
            if (i >= 1) {
                row[len - 1] = new Array(len);
            }
        });
    };

    $scope.removeTableHeader = function() {
        var len = 0;
        $scope.formData.table.headers.pop();
        len = $scope.formData.table.headers.length;

        angular.forEach($scope.formData.table.rows, function(row) {
            row.pop();
        });

        if ($scope.formData.table.headers.length === 1)
            $scope.removeTableHeaderFlag = false;
    };

    $scope.addTableRecord = function() {
        var len = $scope.formData.table.headers.length;
        $scope.removeTableCellFlag = true;
        $scope.formData.table.rows.push(new Array(len));
    };

    $scope.removeTableRecord = function() {
        $scope.formData.table.rows.pop();
        if ($scope.formData.table.rows.length === 1)
            $scope.removeTableCellFlag = false;
    };

    // $scope.addBullets = function(){ 
    //      var len = $scope.formData.bullets.length + 1;
    //      $scope.removeBulletsFlag = true; 
    //      $scope.formData.bullets.push("bollet "+len);
    // } 

    // $scope.removeBullets = function(){
    //      $scope.formData.bullets.pop();
    //      if($scope.formData.bullets.length === 1)
    //      $scope.removeBulletsFlag = false;
    // }

    // process the form
    $scope.addSlides = function() {

        // if(!addSlidesForm.$valid) {
        //   $scope.validationFailed = true;
        // } else {
        //   $scope.validationFailed = false;
        // }
        //$scope.slides = [];
        // $scope.formData.bullets = $scope.formData.bullets;

        var data = JSON.parse(JSON.stringify($scope.formData)); // clone object

        $rootScope.flashMsg = false;

        // exclude empty fields  
        Object.keys(data).forEach(function(k) {
            if (k === "table" && !data[k].headers.length) {
                delete data[k];
            } else if (k !== "table" && !data[k].length) {
                delete data[k];
            }
        });

        RestService.mySlideService().save(data, function(result, error) {
            $scope.presentationId = result.coverId;
            $scope.addSlidesForm.$setPristine();
            $scope.formData = {};
            addSlidesForm.reset(); // jshint ignore:line
            $scope.$parent.flashMsg = true;
            resetItems();
            $scope.setSelectedCover();
            $("#mainContent").animate({
                scrollTop: $("#addSlide").offset().top
            }, "fast");
        }, function(error) {
            console.log("error");
        });



    };
});
