'use strict';

angular.module('techmApp').factory("PresentationService", function($resource){
        var factory = {};
        
        factory.addCover = function(){
          return $resource('/covers/:fileId', {fileId: "@id"}, {
                      update: { method: 'PUT', params: {fileId: '@id'} } 
          });              
        };

        return factory;
        
});

