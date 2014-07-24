'use strict';
angular.module('techmApp').controller('ApplicationCtrl', function ($scope, $rootScope) {

    $scope.closeAlert = function(){
        $scope.flashMsg = false;
    };
});