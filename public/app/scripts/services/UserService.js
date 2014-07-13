'use strict';
angular.module('techmApp').factory('UserService', function($http, $resource, $rootScope, $window, $location, AuthenticationService) {

    return {
        logIn: function(formData) {
            return $http.post('/users/login', formData).success(function(data){
                AuthenticationService.isLogged = true;
                $window.sessionStorage.token = data.id; 
            });
        },
        logOut: function() {
            return $http.post('/users/logout', {sid: sessionStorage.token}).success(function(){
                AuthenticationService.isLogged = false;
                $rootScope.currentUser = null;
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.currentUser;
                $location.path("/login");
            });
        },
        getMe: function(data){
            $rootScope.currentUser = data;
            $window.sessionStorage.currentUser = JSON.stringify(data);
        },
        getUser: function() {
            return $http.get('/users/me');
        },        
        user: function(){
           return $resource('/users/:userId', {userId: "@id"}, {
                       update: { method: 'PUT' } 
           });              
        },
        covers: function(){
          return $resource('/covers/:coverId', {coverId: "@id"}, {
                      update: { method: 'PUT'}
          });              
        },
        comments: function(){
          return $resource('/comments', {coverId: "@id"}, {
                      update: { method: 'PUT'}
          });              
        }

    };
});