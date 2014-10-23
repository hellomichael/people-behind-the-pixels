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
//= src/hexgrid.js

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

var disc2 = THREE.ImageUtils.loadTexture("shared/img/disc2.png");

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
        // = src/01-08-younghee-jung.js
        // = src/01-09-scott-thomas.js
        // = src/01-15-sarah-mei.js
        // = src/01-16-julio-cesar-ody.js
        //= src/01-17-guy-podjarny.js
        // = src/01-23-mark-dalgesh.js
        // = src/01-26-paul-theriault.js


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