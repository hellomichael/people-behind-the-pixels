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
    var renderer, camera, scene;

    // Initialize Animations
    var init = function () {
        // Load audio
        pbtp.audio.init('shared/audio/nightcall.mp3');

        // Three.js Objects
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        scene = new THREE.Scene(); // New scene
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000); // New camera
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

        renderer.render(scene, camera);
        TWEEN.update(currentTimeAnimation);
    };

    return {
        init: init
    };
}());

peopleBehindthePixels.init();