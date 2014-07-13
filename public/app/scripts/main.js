(function($) {
    /*====================================
=            ON DOM READY            =
====================================*/
    'use strict';

    /*========================================
    =            CUSTOM FUNCTIONS            =
    ========================================*/
    function toggleNav() {
        if ($('#site-wrapper').hasClass('show-nav')) {
            // Do things on Nav Close
            $('#site-wrapper').removeClass('show-nav');
            // $('#mainContent').css('width', '100%');
            $('.overlay').remove();

        } else {
            // Do things on Nav Open
            $('#site-wrapper').addClass('show-nav');
            // setMainContentWidth();
            //console.log('here');
            $('#site-canvas').append('<div class="overlay"></div>');
        }

        //$('#site-wrapper').toggleClass('show-nav');
    }

    $(document).on('click', '.slideMenu', function(e) {
        toggleNav();
        e.preventDefault();
    });




    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            if ($('#site-wrapper').hasClass('show-nav')) {
                // Assuming you used the function I made from the demo
                toggleNav();
            }
        }
    });


    $('#site-canvas').on('click', '#sidebar li.hasChild > a', function(e) {
        $(this).closest('.hasChild').toggleClass('open').children('ul.acc-menu').slideToggle();
        e.preventDefault();
    });

    $('#site-canvas').on('click', '.overlay', function() {
        //$(this).remove();
        toggleNav();
    });

    $('#site-wrapper').on('submit', '#addSlides', function(e) {
        var formData = $('#addSlides').serializeJSON();
        e.preventDefault();
        console.log(formData);
    });
}(jQuery));
