'use strict';

angular.module('techmApp').factory("RestService", function($resource, $routeParams, $http){
        var factory = {};
        
        factory.userService = function(){
           return $resource('/users/:userId', {userId: "@id"}, {
                       update: { method: 'PUT' } 
           });              
        };

        factory.coverService = function(){
          return $resource('/covers/:coverId', {coverId: "@id"}, {
                      update: { method: 'PUT'}
          });              
        };

        factory.myCoverService = function(params){
         return $http({
                url: "/covers/?"+ JSON.stringify(params),
                method: "GET"          
            });              
        };

        factory.mySlideService = function(){
           return $resource('/slides', {id: "@id"}, {
                       update: { method: 'PUT', params: {id: '@id'} } 
           });              
        };

        factory.slideService = function(){
          return $http({
                url: "/covers/"+$routeParams.coverId+"/?" + JSON.stringify({$fields: {myslides:1}}),
                method: "GET"          
            });
        };
 
        factory.imageService = function(){
           return $resource('/upload/:id', {id: '@id'}, {
                       update: { method: 'PUT' } 
           });              
        };
        
        // factory.slideService = function(){
        //   return $resource('/slides', {id: "@id"}, {
        //               update: { method: 'PUT', params: {id: '@id'} } 
        //   });              
        // };

        
        return factory;
        
});

