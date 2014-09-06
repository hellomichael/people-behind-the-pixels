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
    var sequence = [];
    var scene1;

    // Initialize Animations
    var init = function () {
        // Load audio
        wd.audio.init('shared/audio/nightcall.mp3');

        // Load sequences
        scene1 = new wd.scenes.scene('Scene 1');
        scene1.addSequence('00:01:00', function() {console.log('Scene 1 - Sequence 1');});
        scene1.addSequence('00:06:02', function() {console.log('Scene 1 - Sequence 2');});
        scene1.addSequence('00:11:23', function() {console.log('Scene 1 - Sequence 3');});

        // Draw onto the Canvas
        (function draw() {
            setTimeout(function() {
                requestAnimationFrame(draw);
                animateSequence(wd.audio.getCurrentTime());
            }, 1000/fps);
        })();
    };

    var animateSequence = function (currentTime) {
        /**
        * Calls function when audio reaches timecode
        * @param {Seconds}
        * @return {Callback}
        */

        scene1.playSequence(currentTime);
    };

    return {
        init: init
    };
}());

peopleBehindthePixels.init();