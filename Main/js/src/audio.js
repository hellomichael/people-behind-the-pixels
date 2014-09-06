wd.audio = (function () {
	'use strict';

    // Create audio context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context;
    var startTime;

	var init = function (audioFile) {
        context = new AudioContext();
        startTime = 0;

        // Create audio request
        var request = new XMLHttpRequest();
        request.open('GET', audioFile, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) { // Play audio on callback
                console.log("Audio Loaded");
                startTime = context.currentTime;

                var source = context.createBufferSource();      // Creates a sound source
                source.buffer = buffer;                         // Tell the source which sound to play
                source.connect(context.destination);            // Connect the source to the context's destination (the speakers)
                source.start(0);
            });
        };

        request.send();
	};

    var getCurrentTime = function () {
        /**
        * WebAPI currentTime starts counting when node is initialized
        * Adjust based on when the audio actual starts playing
        */

        var currentTime = startTime;

        if (startTime) {
            currentTime = context.currentTime - startTime;
        }

        return currentTime;
    };

	return {
		init: init,
        getCurrentTime: getCurrentTime
	};
}());