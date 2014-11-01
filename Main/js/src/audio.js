pbtp.audio = (function () {
	'use strict';

    // Create audio context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context, source, gainNode, startTime, muted, seekTime, effects, loaded;

	var init = function (audioFile) {
        context = new AudioContext();
        startTime = 0;
        seekTime = 0;
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

                $('#play').html('Play film <img src="shared/img/play.svg" alt="">');
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

            $('.social').addClass('hide');
            $('.outer').hide();
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