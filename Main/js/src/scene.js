wd.scenes = (function() {
	'use strict';

    /**
    * Creates new scene
    * @param {name}
    * @return {scene}
    */
	var scene = function(name) {
        this.name = name;
        this.sequence = [];
	};

    scene.prototype = {
        constructor: scene,

        addSequence: function(timeCode, callback) {
             this.sequence.push([timeCode, callback]);

             //_.sortBy(this.sequence, function(sequence){return wd.utilities.convertToSeconds(sequence[0]);});  // Sort sequences so we can add animations in any order
        },
        playSequence: function(currentTime) {
            // If the sequence still unplayed animations
            if (this.sequence.length) {
                // First element in the sequence is the keyframe
                var keyFrame = wd.utilities.convertToSeconds(this.sequence[0][0]);

                // If the current time is the same time as the keyframe
                if (currentTime >= keyFrame) {
                    this.sequence[0][1](); // Play first scene
                    this.sequence.shift(); // Remove first scene
                }
            }
        }
    };

	return {
		scene: scene
	};
}());