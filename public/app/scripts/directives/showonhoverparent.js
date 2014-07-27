'use strict';
angular.module('techmApp').directive('showOnHoverParent',
    function() {
        return {
            link: function(scope, element, attrs) {
                element.closest("aside").on('mouseenter', function() {
                    element.addClass('show');
                });
                element.closest("aside").on('mouseleave', function() {
                    element.removeClass('show');
                });
            }
        };
    });
