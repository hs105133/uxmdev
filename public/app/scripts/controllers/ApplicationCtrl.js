'use strict';

angular.module('techmApp').controller('ApplicationCtrl', function($scope, $location) {
    $scope.closeAlert = function() {
        $scope.flashMsg = false;
    };

    $scope.$path = $location.path.bind($location);
});
