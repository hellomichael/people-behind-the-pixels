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

    /**
    * Deep clone array w/ objects
    * @param {degree}
    * @return {radians}
    */
    var cloneArray = function(array){
        return JSON.parse(JSON.stringify(array));
    };

    /**
    * Converts Screen/Width into a Three.js unit, based on 1 unit squares
    * @param {screen, width}
    * http://stackoverflow.com/questions/13350875/three-js-width-of-view/13351534#13351534
    * http://stackoverflow.com/questions/15331358/three-js-get-object-size-with-respect-to-camera-and-object-position-on-screen
    */
    var getScreenDimensions = function(camera, position, dimension) {
        var vFOV = Util.toRadians(camera.fov);
        var aspect = window.innerWidth/window.innerHeight;
        var distance = camera.position.z - position - dimension;
        var screenHeight = 2 * Math.tan(vFOV/2) * (distance); //1.1 is arbitrary
        var screenWidth = screenHeight * aspect;

        return [screenWidth, screenHeight];
    };

    /**
    * Get the vector coordinates of an angle
    * @param {angle}
    * return Vector
    */
    var getVector = function(angle){
        return new THREE.Vector3(Math.sin(Util.toRadians(angle)), Math.cos(Util.toRadians(angle)));
    };

	return {
		toTimecode: toTimecode,
        toSeconds: toSeconds,
        toRadians: toRadians,
        getScreenDimensions: getScreenDimensions,
        cloneArray: cloneArray,
        getVector: getVector
	};
}());