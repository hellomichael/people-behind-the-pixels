//= src/namespace.js
//= src/utilities.js
//= src/audio.js
//= src/scene.js
//= src/canvas.js

// Global variables
var peopleBehindthePixels = (function () {
    'use strict';

    // Global variables
    var fps = 60;
    var scenes = [];

    // Three.js variables
    var renderer, canvas, camera, scene, screenWidth, screenHeight;

    // Initialize Animations
    var init = function () {
        // Load audio
        pbtp.audio.init('shared/audio/nightcall.mp3');

        // Screen 
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;

        // Three.js Objects
        canvas = document.getElementById('canvas');
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        renderer.setSize(screenWidth, screenHeight);

        scene = new THREE.Scene(); // New scene
        camera = new THREE.PerspectiveCamera(45, screenWidth/screenHeight, 1, 1000); // New camera
        camera.position.z = 500;

        // Import Scenes
        //= src/scene1.js

        // Draw onto the Canvas
        (function draw(currentTimeAnimation) {
            setTimeout(function() {
                // Request new frame
                requestAnimationFrame(draw);
                animateSequence(pbtp.audio.getCurrentTime(), currentTimeAnimation);
            }, 1000/fps);
        })();
    };

    var animateSequence = function (currentTimeAudio, currentTimeAnimation) {
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
            scenes[i].playSequence(currentTimeAudio);
        }

        // Always make sure canvas is full screen
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        
        camera.aspect = screenWidth/screenHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(screenWidth, screenHeight);

        // Three.js Objects
        renderer.render(scene, camera);
        TWEEN.update(currentTimeAnimation);
    };

    return {
        init: init
    };
}());

peopleBehindthePixels.init();