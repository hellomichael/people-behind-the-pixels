/*jslint browser: true*/
/*global AudioContext:false */
/*global Util:false */
/*global pbtp:false */

'use strict';

pbtp.audio = (function () {
    // Create audio context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context, source, gainNode, startTime, muted, seekTime, loaded;

	var init = function (audioFile) {
        context = new AudioContext();
        startTime = 0;
        seekTime = 0.5;
        muted = false;
        loaded = false;

        // Create audio request
        var request = new XMLHttpRequest();
        request.open('GET', audioFile, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) { // Play audio on callback
                loaded = true;

                source = context.createBufferSource();      // Creates a sound source
                source.buffer = buffer;                         // Tell the source which sound to play
                source.loop = false;
                source.connect(context.destination);            // Connect the source to the context's destination (the speakers)

                gainNode = context.createGain();

                if (muted) {
                    mute();
                }

                $('#play').removeClass('disabled').html('Play film <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve"><path fill="#FFFFFF" d="M15,2.7c6.8,0,12.3,5.5,12.3,12.3S21.8,27.3,15,27.3S2.7,21.8,2.7,15S8.2,2.7,15,2.7 M15,0.5 C7,0.5,0.5,7,0.5,15S7,29.5,15,29.5S29.5,23,29.5,15S23,0.5,15,0.5L15,0.5z"/><polygon fill="#FFFFFF" points="10.8,8.7 22.5,15 10.8,21.3 "/></svg>');

                //play();
            });
        };

        request.send();
	};

    var isLoaded = function () {
        return loaded;
    };

    var play = function () {
        if (loaded) {
            startTime = context.currentTime;
            source.start(0, seekTime);
        }
    };

    var seek = function (currentTime) {
        seekTime = Util.toSeconds(currentTime);

        if (loaded) {
            source.stop();
            source.start(0, seekTime);
        }
    };

    var getCurrentTime = function () {
        /**
        * WebAPI currentTime starts counting when node is initialized
        * Adjust based on when the audio actual starts playing
        */

        var currentTime = startTime;

        if (startTime) {
            currentTime = context.currentTime - startTime + seekTime;
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
        mute: mute,
        seek: seek,
        play: play,
        isLoaded: isLoaded,
        getCurrentTime: getCurrentTime
	};
}());