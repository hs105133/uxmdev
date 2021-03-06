'use strict';

angular.module('techmApp', ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'ngResource', 'angularFileUpload', 'FBAngular'])

.config(function($locationProvider, $routeProvider, $httpProvider) {

    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('TokenInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'dashboard.html',
            title: 'Dashboard'
        })
        .when('/create-cover', {
            templateUrl: 'views/create-cover.html',
            controller: 'createPresentationCtrl',
            title: 'Create Cover'
        })
        .when('/covers/:coverId/edit-cover', {
            templateUrl: 'views/edit-cover.html',
            controller: 'EditCoverCtrl',
            title: 'Edit Cover',
            requiredLogin: true
        })
        .when('/covers/:coverId/comments', {
            templateUrl: 'views/comments.html',
            controller: 'CommentsCtrl',
            title: 'Comments'
        })
        .when('/covers/:coverId/edit-slide/:slideId?', {
            templateUrl: 'views/edit-slide.html',
            controller: 'EditSlideCtrl',
            title: 'Edit Slide',
            requiredLogin: true
        })
        .when('/addslide/:coverId?', {
            templateUrl: 'views/addslide.html',
            controller: 'addSlideCtrl',
            title: 'Add Slide',
            reloadOnSearch: false
        })
        .when('/quickslide/:coverId?', {
            templateUrl: 'views/quickslide.html',
            controller: 'addSlideCtrl',
            title: 'Add Slide Quickly',
            reloadOnSearch: false
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersCtrl',
            title: 'All Users'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AdminUserCtrl',
            title: 'Login Form'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'RegisterCtrl',
            title: 'Signup Form'
        })
        .when('/add-admin', {
            templateUrl: 'views/signup.html',
            controller: 'RegisterCtrl',
            title: 'Add Admin User'
        })
        .when('/myprofile', {
            templateUrl: 'views/myprofile.html',
            title: 'User Profile',
            requiredLogin: true,
            controller: 'MyProfileCtrl'
        })
        .when('/users/:userId', {
            templateUrl: 'views/myprofile.html',
            title: 'User Profile',
            controller: 'MyProfileCtrl'
        })
        .when('/manage-covers', {
            templateUrl: 'views/manage-cover.html',
            title: 'All Presentation Cover',
            controller: 'UserCoversCtrl',
            requiredLogin: true
        })
        .when('/cleanup', {
            templateUrl: 'views/cleanup.html',
            title: 'Cleanup Presentation',
            controller: 'CleanupCtrl',
            requiredLogin: true
        })
        .when('/edit-profile', {
            templateUrl: 'views/edit-profile.html',
            title: 'Edit Profile',
            controller: 'EditUserInfo',
            requiredLogin: true
        })
        .when('/covers', {
            templateUrl: 'views/covers.html',
            controller: 'AllCoversCtrl',
            title: 'All Covers'
        })
        .when('/mycovers', {
            templateUrl: 'views/mycovers.html',
            controller: 'MyCoversCtrl',
            title: 'My All Presentation'
        })
        .when('/covers/:coverId', {
            templateUrl: 'views/presentation.html',
            controller: 'presentationCtrl',
            title: 'Presentation'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            title: 'Contact Us'
        })
        .when('/manage-images', {
            templateUrl: 'views/manage-images.html',
            controller: 'ManageImagesCtrl',
            title: 'Manage Image',
            requiredLogin: true
        })
        .when('/manage-users', {
            templateUrl: 'views/manage-users.html',
            controller: 'ManageUsersCtrl',
            title: 'Manage Users',
            requiredLogin: true
        })
        .otherwise('/');

})
.directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function() {
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
})
.run(function( $rootScope, $location, $route, AuthenticationService, $window) {
    $rootScope.location = $window.location;
    $rootScope.isViewLoading = false;

    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        $rootScope.isViewLoading = true;
        $rootScope.$broadcast('resetFlag');
        if (nextRoute.requiredLogin && !$window.sessionStorage.token) {
            $location.path('/login');
        } else {
            $rootScope.currentUser = $window.sessionStorage.currentUser ? JSON.parse($window.sessionStorage.currentUser) : null;
        }

    });

    $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
        $rootScope.isViewLoading = false;
        $rootScope.pageTitle = $route.current.title;
    });
});
