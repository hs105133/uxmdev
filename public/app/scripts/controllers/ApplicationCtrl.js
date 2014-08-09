'use strict';

angular.module('techmApp').controller('ApplicationCtrl', function($scope, $location, $rootScope) {
    $rootScope.$on('resetFlag', function(event) { $scope.flashMsg = false;  });
    $scope.closeAlert = function() {
        $scope.flashMsg = false;
    };
    $scope.$path = $location.path.bind($location);
});
