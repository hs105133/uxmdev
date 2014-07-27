'use strict';
angular.module('techmApp').controller('ManageImagesCtrl', function($scope, RestService) {
    $scope.images = RestService.imageService().query();
    $scope.deleteImage = function(index, imageId) {
        RestService.imageService().remove({
            id: imageId
        }, function(data) {
            console.log(data);
        });

        $scope.images.splice(index, 1);

    };
});
