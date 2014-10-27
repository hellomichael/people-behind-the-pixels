$(window).load(function() {
    'use strict';

    peopleBehindthePixels.init();
});


var count = 0;
$('body').click(function() {
    if (count%2 === 0) {
        $('.crash').toggleClass('animate');
    }

    else {
        $('.crash').toggleClass('animate');
    }

    count++;
});