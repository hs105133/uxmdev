'use strict';
angular.module('techmApp').controller('EditSlideCtrl', function($scope, $routeParams, $rootScope, $location, $http, $upload, RestService) {
    $scope.slides = {};

    $scope.coverId = $routeParams.coverId;
    $scope.$parent.flashMsg = false;

    $scope.updateRoute = function(slideId) {
        $location.path("/covers/" + $scope.coverId + "/edit-slide/" + slideId);
    };

    if ($rootScope.slides) {
        $scope.slides = $rootScope.slides;
    } else {
        $scope.slides = RestService.mySlideService().query({
            coverId: $routeParams.coverId
        }, function(res) {
            $rootScope.slides = res;
            if (res.length) $scope.updateRoute(res[0].id);
        });

    }

    /** form processing ****/
    /** duplicated in addSlideCtrl.js ***/

    var resetItems = function() {
        $scope.slides = {};
        $scope.removeDLFlag = false;
        $scope.removeImageListFlag = false;
        $scope.removeTableHeaderFlag = false;
        $scope.removeTableCellFlag = false;

        $scope.slides.dl = [
            // {
            //     dt: "term 1 ",
            //     dd: "data 1"
            // }
        ];

        $scope.slides.imageList = [
            // {
            //     imgUrl: "http://placehold.it/64x64",
            //     imgDesc: "Something about image"
            // }
        ];

        $scope.slides.table = {
            // headers: [ "header 1"],
            // rows: [["data 1"]]
            headers: [],
            rows: []
        };

        $scope.slides.bullets = [];
        $(".collapse").not(":first").removeClass("in");
    };

    $(".collapse").not(":first").addClass("in"); //need to be removed

    $scope.onFileSelect = function(files, imgIndex) {
        $scope.selectedFiles = files;
        $scope.progress = [];
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            $scope.progress[i] = -1;
            $scope.start(i, imgIndex);
        }

    };

    $scope.start = function(index, imgIndex) {
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
            $scope.slides[imgIndex].src = "store/images/" + data[0].filename;
        });
    };

    $scope.onImgListFileSelect = function(files, imgIndex, imgListIndex) {
        $scope.selectedFiles1 = files;
        $scope.slides[imgIndex].imageList[imgListIndex].progress1 = [];
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            $scope.slides[imgIndex].imageList[imgListIndex].progress1[i] = -1;
            $scope.imgListStart(i, imgIndex, imgListIndex);
        }

    };



    $scope.imgListStart = function(index, imgIndex, imgListIndex) {
        console.log(imgIndex, imgListIndex);
        $scope.slides[imgIndex].imageList[imgListIndex].progress1[index] = 0;
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
            $scope.slides[imgIndex].imageList[imgListIndex].progress1[index] = 0;
            $scope.slides[imgIndex].imageList[imgListIndex].progress1[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            // file is uploaded successfully

            if (imgListIndex !== undefined) {
                $scope.slides[imgIndex].imageList[imgListIndex].imgUrl = "store/images/" + data[0].filename;
            } else {
                $scope.slides[imgIndex].src = "store/images/" + data[0].filename;
            }

        });
    };

    // $scope.onFileSelected = function(files, imgIndex, direct) {

    //     var fd = new FormData();
    //     //Take the first selected file
    //     fd.append("file", files[0]);

    //     $http.post("/upload", fd, {
    //         headers: {
    //             'Content-Type': undefined
    //         },
    //         transformRequest: angular.identity
    //     }).success(function(data) {

    //         if(direct){
    //             $scope.slides[imgIndex].src = "../store/" + data[0].filename;
    //         } else {
    //             $scope.slides[imgIndex].imageList[imgIndex].imgUrl = "../store/" + data[0].filename;
    //         }

    //     }).error(function(data) {
    //         console.log("errr", data);
    //     });

    // };


    $scope.addDL = function(index, slide) {
        if (!$scope.slides[index].dl) {
            $scope.slides[index].dl = [];
        }
        // $scope.slides[index].dl =  $scope.slides[index].dl ? $scope.slides[index].dl : [];
        var len = $scope.slides[index].dl.length + 1;

        $scope.removeDLFlag = true;
        $scope.slides[index].dl.push({
            dt: "term " + len,
            dd: "data " + len
        });
    };

    $scope.removeDL = function(index) {
        $scope.slides[index].dl.pop();
        if ($scope.slides[index].dl.length === 1)
            $scope.removeDLFlag = false;
    };

    $scope.addImageList = function(index) {
        if (!$scope.slides[index].imageList) {
            $scope.slides[index].imageList = [];
        }
        var len = $scope.slides[index].imageList.length + 1;
        $scope.removeImageListFlag = true;
        $scope.slides[index].imageList.push({
            imgUrl: "http://placehold.it/64x64",
            imgDesc: "Something about image " + len
        });
    };

    $scope.removeImageList = function(index) {
        $scope.slides[index].imageList.pop();
        if ($scope.slides[index].imageList.length === 1)
            $scope.removeImageListFlag = false;
    };

    $scope.addTableHeader = function(index) {
        if (!$scope.slides[index].table) {
            $scope.slides[index].table = {
                headers: [],
                rows: []
            };
        }
        var len = $scope.slides[index].table.headers.length + 1;
        $scope.removeTableHeaderFlag = true;
        $scope.slides[index].table.headers.push("header " + len);

        $scope.slides[index].table.rows[0] = new Array(len);
        angular.forEach($scope.slides[index].table.rows, function(row, i) {
            if (i >= 1) {
                row[len - 1] = new Array(len);
            }
        });
    };

    $scope.removeTableHeader = function(index) {
        var len = 0;
        $scope.slides[index].table.headers.pop();
        len = $scope.slides[index].table.headers.length;

        angular.forEach($scope.slides[index].table.rows, function(row) {
            row.pop();
        });

        if ($scope.slides[index].table.headers.length === 1)
            $scope.removeTableHeaderFlag = false;
    };

    $scope.addTableRecord = function(index) {
        if (!$scope.slides[index].table) {
            $scope.slides[index].table = {
                headers: [],
                rows: []
            };
        }
        var len = $scope.slides[index].table.headers.length;
        $scope.removeTableCellFlag = true;
        $scope.slides[index].table.rows.push(new Array(len));
    };

    $scope.removeTableRecord = function(index) {
        $scope.slides[index].table.rows.pop();
        if ($scope.slides[index].table.rows.length === 1)
            $scope.removeTableCellFlag = false;
    };


    // process the form
    $scope.updateSlide = function(index, slide) {

        $scope.$parent.flashMsg = false;

        RestService.mySlideService().update(slide, function(result, error) {
            $rootScope.slides[index] = result;
            //updateSlidesForm.$setPristine();
            //$scope.slides = {};
            //updateSlidesForm.reset();
            $scope.$parent.flashMsg = index + 1;
            $("#mainContent").animate({
                scrollTop: $("#updateSlidesForm").offset().top
            }, "fast");
            //resetItems();


        }, function(error) {
            console.log("error");
        });

    };

    $scope.deleteSlide = function(index, slide) {
        RestService.mySlideService().remove({
            id: slide.id
        }, function(result, error) {
            $scope.$parent.flashMsg = index + 1;
            $rootScope.slides.splice(index, 1);
            if ($rootScope.slides.length) $scope.updateRoute($rootScope.slides[0].id);
            $("#mainContent").animate({
                scrollTop: $("#updateSlidesForm").offset().top
            }, "fast");
        });
    };

    $scope.closeAlert = function() {
        $scope.$parent.flashMsg = false;
    };

}); 
