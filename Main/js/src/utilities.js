Util = (function() {
	'use strict';

    /**
    * Converts seconds to Timecode format
    * Uses After Effects Timecode (30 FPS) - 60:60:30
    * @param {Seconds}
    * @return {Timecode}
    */
	var toTimecode = function(seconds) {
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
    var toSeconds = function(timecode) {
        var sec = timecode.split(':');

        var minutes = parseInt(sec[0]);
        var seconds = parseInt(sec[1]);
        var milliseconds = parseInt(sec[2]);

        return (minutes * 60) + (seconds) + milliseconds/30;
    };

    /**
    * Converts Degrees to Radians
    * @param {degree}
    * @return {radians}
    */
    var toRadians = function(degree){
        return degree * Math.PI/180;
    };

    /*
        // Size of object in relation to screen width

        /*var vFOV = camera.fov * Math.PI / 180; 
        var ratio = 2 * Math.tan( vFOV / 2 );
        var screen = ratio * (window.innerWidth / window.innerHeight) ; 
        var size = getCompoundBoundingBox( object ).max.y;
        var dist = (size/screen) / 4; 
    */
    

	return {
		toTimecode: toTimecode,
        toSeconds: toSeconds,
        toRadians: toRadians
	};
}());