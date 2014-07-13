'use strict';
angular.module('techmApp').controller('formCtrl', function($scope, AuthService, $rootScope, $location) {

    $rootScope.userLoaded = false;
    $rootScope.closeAlert = function(){
    	$rootScope.flashMsg = false;
    };

    function getMe() {
        console.log($rootScope.currentUser);
    	AuthService.getUser().get(function(user){
    		$rootScope.currentUser = user;
    		$rootScope.userLoaded = true;
    		$location.path("/");
    		//$scope.$apply();
    	});

	        // dpd.users.me(function(user) {
        //     $rootScope.currentUser = user;
        //     $rootScope.userLoaded = true;
        //     $scope.$apply();
        // });
    }
  // getMe();


    // $scope.showLogin = function(val) {
    //     $scope.loginVisible = val;
    //     if (val) {
    //         $scope.username = '';
    //         $scope.password = '';
    //     }
    // };

    $scope.login = function() {

    	AuthService.login().save($scope.formData, function(res, error){
    		console.log(res);
    		//$location.path("/");
    		getMe();
    	}, function(res){
    		$rootScope.flashMsg = res.data.message;
    		//".alert").
    		//$location.path("login");
    	});

        // dpd.users.login({
        //     username: $scope.username,
        //     password: $scope.password
        // }, function(session, error) {
        //     if (error) {
        //         alert(error.message);
        //     } else {
        //         $scope.showLogin(false);
        //         getMe();

        //         $scope.$apply();
        //     }
        // });
    };

    $scope.logout = function() {
    	console.log($rootScope.currentUser);
    	AuthService.logout().save({},function(user){
    		$rootScope.currentUser = null;
    		$location.path("/");
    		//$scope.$apply();
    	});        
    	// dpd.users.logout(function() {
        //     $rootScope.currentUser = null;
        //     $scope.$apply();
        // });
    };


    // $scope.formData = {};

    // // process the form
    // $scope.processForm = function() {

    //     console.log($scope.formData);
    //     AuthService.login().save($scope.formData, function(data, error){
    //         console.log("success", data); 
    //         localStorage.sessionId = data.id;

    //         	// if (!data.success) {
    //       //             // if not successful, bind errors to error variables
    //       //             $scope.errorName = "Username nOt valid";
    //       //                 } else {
    //       //             // if successful, bind success message to message
    //       //             $scope.message = "LOgin Success";
    //       //             }

    //     }, function(error){
    //        console.log("error"); 
    //     });

    // };

    // $scope.logoutMe = function(){
    //     var sessionId = localStorage.sessionId;

    //     AuthService.logout().save({id: sessionId },function(data){
    //         console.log(data);

    //         localStorage.removeItem('sessionId');
    //     });
    // }

    function checkXSDevice() {
        if ($(window).width() < 480) {
            $(".formWrapper").find("div").first().removeClass("verticalcenter");
        } else {
            $(".formWrapper").find("div").first().addClass("verticalcenter");
        }
    }


    $(window).resize(function() {
        checkXSDevice();
    });

    checkXSDevice();


});
