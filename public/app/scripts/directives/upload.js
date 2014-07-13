'use strict';
angular.module('techmApp').directive("fileUploader", ["$parse",
    function($parse) {
        return function(scope, $elem, attrs) {
            var fn = $parse(attrs.fileUploader);
            $elem.on("change", function(e) {
                fn(scope, {
                    $files: e.target.files
                });
            });
        };
    }
]);
