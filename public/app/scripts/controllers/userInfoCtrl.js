'use strict';
angular.module('techmApp').controller('userInfoCtrl', function($scope, RestService, $routeParams) {
	var userId = $routeParams.userId;

	// RestService.userService().get({id: userId}, function(res){
	// 	$scope.currentUser = res;
	// }, function(res){
	// 	console.log("errorrr");
	// })

  });