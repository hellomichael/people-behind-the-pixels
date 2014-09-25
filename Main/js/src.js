//= src/namespace.js
//= src/utilities.js
//= src/audio.js

//= src/shaders/CopyShader.js
//= src/shaders/EffectComposer.js
//= src/shaders/MaskPass.js
//= src/shaders/ConvolutionShader.js
//= src/shaders/BloomPass.js
//= src/shaders/RenderPass.js
//= src/shaders/ShaderPass.js
//= src/shaders/FilmPass.js
//= src/shaders/FilmShader.js
//= src/shaders/FXAAShader.js
//= src/shaders/BokehShader.js
//= src/shaders/BokehPass.js

//= src/shaders.js
//= src/renderator.js

// Global variables
var peopleBehindthePixels = (function () {
    'use strict';

    // Global variables
    var sequences = [];
    var screenWidth, screenHeight;
    var renderator, prevTimestamp, delta;

    // Initialize Animations
    var init = function () {
        // Load audio
        pbtp.audio.init('shared/audio/boop.mp3');

        // Import Scenes
        //= src/sequence.js
        //= src/sequence1.js
        //= src/sequence2.js

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

        // Calculate delta for renderator
        if (currentTimeAnimation == undefined)
            prevTimestamp = currentTimeAnimation = 0;
        delta = (currentTimeAnimation - prevTimestamp) / 1000.0;
        prevTimestamp = currentTimeAnimation;
        renderator.render(delta);

        // Refactor to only play one scene at a time
        for (var i=0; i<sequences.length; i++) {
            sequences[i].playSequence(currentTimeAudio);
        }

        // Update global tweening object
        TWEEN.update(currentTimeAnimation);
    };

    return {
        init: init
    };
}());

peopleBehindthePixels.init();