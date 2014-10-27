console.log('test');

var dino = function() {
    'use strict';
    var $glasses = $('.glasses-wrap');
    setTimeout(function() {
        $glasses.css({'top': -90});
    }, 1500);
    setTimeout(function() {
        $glasses.css({'top': -40});
    }, 3000);
    setTimeout(function() {
        $glasses.css({'top': -0});
    }, 4500);
    setTimeout(function() {
        $glasses.css({'top': 50});
    }, 6000);
    setTimeout(function() {
        $('.dino-wrap').addClass('animate');
    }, 7500);

};
    dino();

