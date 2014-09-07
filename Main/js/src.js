//= src/namespace.js
//= src/utilities.js
//= src/audio.js
//= src/scene.js
//= src/canvas.js

// Global variables
var peopleBehindthePixels = (function () {
    'use strict';

    // Global Variables
    var fps = 60;
    var scenes= [];

    // Initialize Animations
    var init = function () {
        // Load audio
        pbtp.audio.init('shared/audio/nightcall.mp3');

        // Import Scenes
        //= src/scene1.js
        //= src/scene2.js

        // Draw onto the Canvas
        (function draw() {
            setTimeout(function() {
                requestAnimationFrame(draw);
                animateSequence(pbtp.audio.getCurrentTime());
            }, 1000/fps);
        })();
    };

    var animateSequence = function (currentTime) {
        /**
        * Calls function when audio reaches timecode
        * @param {Seconds}
        * @return {Callback}
        */

        /**
        * Refactoring
        * Only playSequence once a previos sequence is finished
        */

        for (var i=0; i<scenes.length; i++) {
            scenes[i].playSequence(currentTime);
        }
    };

    return {
        init: init
    };
}());

peopleBehindthePixels.init();