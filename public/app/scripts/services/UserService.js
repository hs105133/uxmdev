'use strict';
angular.module('techmApp').factory('UserService', function($http, $resource, $rootScope, $window, $location, AuthenticationService) {

    return {
        logIn: function(formData) {
            return $http.post('/users/login', formData).success(function(data) {
                AuthenticationService.isLogged = true;
                $window.sessionStorage.token = data.id;
            });
        },
        logOut: function() {
            return $http.post('/users/logout', {
                sid: sessionStorage.token
            }).success(function() {
                AuthenticationService.isLogged = false;
                $rootScope.currentUser = null;
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.currentUser;
                $location.path("/login");
            });
        },
        getMe: function(data) {
            $rootScope.currentUser = data;
            $window.sessionStorage.currentUser = JSON.stringify(data);
        },
        getUser: function() {
            return $http.get('/users/me');
        },
        user: function() {
            return $resource('/users/:userId', {
                userId: "@id"
            }, {
                update: {
                    method: 'PUT'
                }
            });
        },
        covers: function() {
            return $resource('/covers/:coverId', {
                coverId: "@id"
            }, {
                update: {
                    method: 'PUT'
                }
            });
        },
        deleteAllCovers: function(){
            return $http({
                method: "DELETE",
                url: '/covers/?{"id": {"$ne": "701e275088775a60" }}' // except sample cover prod
            });
        },
        deleteAllSlides: function(){
            return $http({
                method: "DELETE",
                // except sample slides prod
                url: '/slides?{"id": {"$nin": ["f474392b42557a3d", "641dffbc4b5b0822", "4823697b6f0f5969","2343e21f82a7f8f6", "c1c2e96523e95b8e", "b1363ceaa4457880","536b7a07f622c83b", "c88407f53aaca8ec", "f7d5f2d58781bb67", "6b94547159e4cacc", "406d5442b91298a8", "db78ea09567aeb16", "bdebda8ecbcf78e3", "656d56df7d6bc8aa", "46ab57e9850afa00", "77816dd99692898c", "5412e831b6774a1a", "7e29cc1ff67a7b5d", "8610331aa488faa6", "d119de7d111998b0", "20510cc41dc1482b", "abacb1eece29c998"]}}'
            });
        },
        deleteAllUsers: function(){
            return $http({
                method: "DELETE",
                url: '/users/?{"id": {"$ne": "a754bf24905e7859" }}'  // except main admin prod
            });
        },
        deleteAllComments: function(){
            return $http({
                method: "DELETE",
                url: '/comments/?{"id": {"$ne": "424576eafc51bbea" }}'  // except main admin comment prod
            });
        },
        comments: function() {
            return $resource('/comments', {
                coverId: "@id"
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }

    };
});
