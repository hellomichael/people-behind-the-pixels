pbtp.audio = (function () {
	'use strict';

    // Create audio context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context, source, gainNode, startTime, muted;


	var init = function (audioFile) {
        context = new AudioContext();
        startTime = 0;
        muted = false;

        // Create audio request
        var request = new XMLHttpRequest();
        request.open('GET', audioFile, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) { // Play audio on callback
                console.log("Audio Loaded");
                startTime = context.currentTime;

                source = context.createBufferSource();      // Creates a sound source
                source.buffer = buffer;                         // Tell the source which sound to play
                source.connect(context.destination);            // Connect the source to the context's destination (the speakers)
                source.start(0);

                gainNode = context.createGain();

                if (muted) {
                    mute();
                }
            });
        };

        request.send();
	};


    var play = function (playtime) {
            
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

    var mute = function () {
        if (startTime) {
            gainNode.gain.value = -1;
            source.connect(gainNode);
            gainNode.connect(context.destination);
        }

        else {
            muted = true;
        }
    };

	return {
		init: init,
        getCurrentTime: getCurrentTime,
        mute: mute
	};
}());