'use strict';
angular.module('techmApp').controller('ApplicationCtrl', function ($scope) {
    $scope.closeAlert = function(){
        $scope.flashMsg = false;
    };
});