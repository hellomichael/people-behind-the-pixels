'use strict';

$(window).load(function() {
    /*****************************************************
        People Behind the Pixels
    *****************************************************/
    var $splash = $('.splash-wrap');

    if (Detector.webgl && !detectIE() && window.innerWidth > 1200) {
        peopleBehindthePixels.init();

        $('.social').toggleClass('hide');

        $('#play').on('click', function(event) {
            event.preventDefault()
            $('#play').unbind('keydown');

            $('.social').addClass('hide');
            $('.splash-wrap').hide();
            $('.overlay').hide();
            $('.credits').hide();

            peopleBehindthePixels.play();
        });

        $(window).on('resize', function(event) {
            if (window.innerWidth > 1200) {
                location.reload();
            }
        });

        $('#overlay').on('click', function(event) {
            event.preventDefault()

            $('#overlay').fadeOut();
            $('.credits').fadeOut();
        });
    }

    else {
        //var warning = Detector.getWebGLErrorMessage();
        $splash.addClass('no-webgl');
    }

    /*****************************************************
        Mobile Menu
    *****************************************************/
    $('.toggle').on('click', function(event) {
        event.preventDefault()
        $(this).toggleClass('active');
        $('.mobile-menu').toggleClass('active');
        $('.social').toggleClass('hide');

        if ($(this).hasClass('active')) {
            $('body', 'html').css('overflow', 'hidden');
        }

        else {
            $('body', 'html').css('overflow', '');
        }
    });

    $('.menu-links a').on('click', function(event) {
        event.preventDefault()

        $('.content').removeClass('active');
        $('.' + $(this).attr('id')).addClass('active');
        $('.toggle').trigger('click');
    });

    // Credits
    $('#credits').on('click', function(event) {
        event.preventDefault()

        $('#overlay').fadeIn();
        $('.credits').fadeIn();
    });

    $('#close').on('click', function(event) {
        event.preventDefault()

        $('#overlay').fadeOut();
        $('.credits').fadeOut();
    });

    /*****************************************************
        Detection
    *****************************************************/
    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        return false;
    }
});