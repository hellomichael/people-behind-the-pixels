// PBTB includes
//= src/namespace.js
//= src/utilities.js
//= src/audio.js
//= src/glitch.js
//= src/renderator.js
//= src/sequence.js
//= src/polyflower.js
//= src/emitter.js
//= src/particulator.js

// Tools
//= src/tools/OBJLoader.js
//= src/Tools/OrbitControls.js

// Shader stuff
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


// People Behind the Pixels
var peopleBehindthePixels = (function () {

    'use strict';

    var sequences = [];
    var screenWidth, screenHeight;
    var renderator = new Renderator();
    var prevTimestamp = 0;


    // Initialisation
    var init = function (playtime) {

        if (playtime === undefined) playtime = 0.0;

        // Import sequences
        //= src/01-08-younghee-jung.js
        //= src/01-09-scott-thomas.js
        // = src/animatic.js
        // = src/sequence1.js
        // = src/sequence2.js

        // Load audio
        pbtp.audio.init('shared/audio/intro.mp3');

        mainLoop(0);
    };    


    var mainLoop = function(timestamp) {

        // Determine delta 
        var delta = (timestamp - prevTimestamp) / 1000.0;
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
    };

    
    return {
        init: init
    };
}());

peopleBehindthePixels.init();