'use strict';

angular.module('techmApp').factory("AuthService", function($resource){
        var factory = {};
        
        factory.login = function(){
           return $resource('/users/login', {id: "@id"}, {
                       update: { method: 'PUT' } 
           });              
        };

        factory.getUser = function(){
           return $resource('/users/me', {}, {
                       update: { method: 'PUT' } 
           });              
        };

        factory.logout = function(){
           return $resource('/users/logout', {id: "@id"}, {});              
        };
        
        // factory.coverService = function(){
        //   return $resource('/covers', {id: "@id"}, {
        //               update: { method: 'PUT', params: {id: '@id'} } 
        //   });              
        // };

        // factory.slideService = function(){
        //   return $resource('/slides', {id: "@id"}, {
        //               update: { method: 'PUT', params: {id: '@id'} } 
        //   });              
        // };

        
        return factory;
        
});

