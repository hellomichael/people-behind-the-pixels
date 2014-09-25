//= src/namespace.js
//= src/utilities.js
//= src/audio.js

// Global variables
var peopleBehindthePixels = (function () {
    'use strict';

    // Global variables
    var fps = 60;
    var scenes = [];
    var resize = true;
    var screenWidth, screenHeight;

    // Initialize Animations
    var init = function () {
        // Load audio
        pbtp.audio.init('shared/audio/boop.mp3');

        // Screen
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;

        // Import Scenes

        //= src/scene.js
        //= src/scene1.js
        //= src/scene2.js

        window.onresize = function(event) {
            screenWidth = window.innerWidth;
            screenHeight = window.innerHeight;
            resize = true;
        };

        // Draw onto the Canvas
        (function draw(currentTimeAnimation) {
            // Request new frame
            requestAnimationFrame(draw);
            animateSequence(pbtp.audio.getCurrentTime(), currentTimeAnimation);
        })();
    };

    var animateSequence = function (currentTimeAudio, currentTimeAnimation) {
        /**
        * Calls function when audio reaches timecode
        * @param {Seconds}
        * @return {Callback}
        */

        // Refactor to only play one scene at a time
        for (var i=0; i<scenes.length; i++) {
            scenes[i].playSequence(currentTimeAudio);
            scenes[i].renderScene();
        }
        // Update global tweening object
        TWEEN.update(currentTimeAnimation);
    };

    return {
        init: init
    };
}());

peopleBehindthePixels.init();