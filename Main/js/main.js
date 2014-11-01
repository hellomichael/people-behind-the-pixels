var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if(!is_chrome) {
    document.getElementsByTagName('body')[0].className +=' not-chrome';
}

$(window).load(function() {
    'use strict';

    peopleBehindthePixels.init();

    if(is_chrome) {
        document.getElementById('play').addEventListener('click', function(event) {
            document.getElementById('play').removeEventListener('keydown');

            peopleBehindthePixels.play();
        });

        window.addEventListener('resize', function(event) {
            if (window.innerWidth > 900) {
                location.reload();
            }
        });
    }

    $('.open-popup-link').magnificPopup({
      type:'inline',
      midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
});