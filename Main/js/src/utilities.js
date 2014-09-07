pbtp.utilities = (function() {
	'use strict';

    /**
    * Converts seconds to Timecode format
    * Uses After Effects Timecode (30 FPS) - 60:60:30
    * @param {Seconds}
    * @return {Timecode}
    */
	var convertToTimecode = function(seconds) {
        var min = Math.floor(seconds / 60);
        var sec =  Math.floor(seconds - min * 60);
        var milli = Math.floor((seconds - Math.floor(seconds)) * 30);

        // Prefix w/ 0s
        if (min < 10) {
            min = '0' + min;
        }

        if (sec < 10) {
            sec = '0' + sec;
        }

        if (milli < 10) {
            milli = '0' + milli;
        }

        return min + ':' + sec + ':' + milli;
	};

    /**
    * Converts Timecode to Seconds
    * Uses After Effects Timecode (30 FPS) - 60:60:30
    * @param {Timecode}
    * @return {Seconds}
    */
    var convertToSeconds = function(Timecode) {
        var sec = Timecode.split(':');

        var minutes = parseInt(sec[0]);
        var seconds = parseInt(sec[1]);
        var milliseconds = parseInt(sec[2]);

        return (minutes * 60) + (seconds) + milliseconds/30;
    };

	return {
		convertToTimecode: convertToTimecode,
        convertToSeconds: convertToSeconds
	};
}());