'use strict';
angular.module('techmApp').controller('commentsCtrl', function($scope, UserService, $routeParams, $rootScope) {
    var coverId = $routeParams.coverId;
    $scope.cover = UserService.covers().get({id: coverId});
    $scope.comments = UserService.comments().query({coverId: coverId});
    
    $scope.commentData = {};
    $scope.commentData.coverId = coverId;
    $scope.userInfo = $rootScope.currentUser;
    
    $scope.addComment = function(){
      UserService.comments().save({ coverId: coverId, comment: $scope.comment}, function(res){
          $scope.comments.push(res);
          commentForm.reset(); // jshint ignore:line
      });
    };
});