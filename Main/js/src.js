// People Behind the Pixels
    //= src/namespace.js
    //= src/utilities.js
    //= src/renderator.js
    //= src/particulator.js
    //= src/audio.js
    //= src/glitch.js

// Objects
    //= src/objs/ring.js
    //= src/objs/icosahedron.js
    //= src/objs/asteroids.js

// Shaders and Passes
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
    //= src/shaders/HorizontalBlurShader.js
    //= src/shaders/VerticalBlurShader.js
    //= src/shaders/HorizontalTiltShiftShader.js
    //= src/shaders/VerticalTiltShiftShader.js

var peopleBehindthePixels = (function () {
    'use strict';

    var sequences = [];
    var renderator = new Renderator();
    var prevTimestamp;
    var delta;
    var $stats;

    // Initialisation
    var init = function (playtime) {
        if (playtime === undefined) playtime = 0.0;

        // Import sequences
            //= src/sequences/sequence.js

            // src/sequences/tobias-rebell.js
            // src/sequences/matt-webb.js
            // src/sequences/jake-archibald.js

            // src/sequences/jeriamiah-lee.js
            //= src/sequences/bill-scott.js

        // Load audio
        pbtp.audio.init('shared/audio/music.mp3');
        //pbtp.audio.seek('00:08:00');
        //pbtp.audio.mute();

        // Display Stats
        $stats = $('#stats');

        mainLoop(0);
    };


    var mainLoop = function(timestamp) {
        // Determine delta
        if (timestamp == undefined) {
            prevTimestamp = timestamp = 0;
        }

        delta = (timestamp - prevTimestamp) / 1000.0;
        prevTimestamp = timestamp;

        // Updates
        updateSequence(pbtp.audio.getCurrentTime(), delta);
        TWEEN.update(timestamp);

        // Render
        renderator.render(delta);

        // Set callback
        requestAnimationFrame(mainLoop);
    };


    var updateSequence = function (currentTimeAudio, delta) {
        // Refactor to only play one scene at a time
        for (var i = 0; i < sequences.length; i++) {
            sequences[i].update(delta);
            sequences[i].play(currentTimeAudio);
        }

        // Add timecode to page
        $stats.html(Util.toTimecode(currentTimeAudio));
    };


    return {
        init: init
    };
}());