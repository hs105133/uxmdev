'use strict';
angular.module('techmApp').controller('ManageImagesCtrl', function($scope, RestService) {
    $scope.images = RestService.imageService().query();
    $scope.deleteImage = function(index, imageId) {
    	$scope.$parent.flashMsg = false;
        RestService.imageService().remove({
            id: imageId
        }, function(res) {
        	$scope.images.splice(index, 1);
            $scope.$parent.flashMsg = false;
        },
        function(res) {
            $scope.$parent.flashMsg = res.data.message;
        });

        

    };
});
