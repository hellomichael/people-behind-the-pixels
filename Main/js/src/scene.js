/**
* Creates new scene
* @param {name}
* @return {scene}
*/
var Scene = function(name) {
    this.name = name;
    this.sequence = [];
};

Scene.prototype = {
    constructor: Scene,

    addSequence: function(timeCode, callback) {
        /**
        * Callback can be string for extended prototype function, or a function itself
        */

        if (_.isFunction(callback)) {
            callback();
        }

        else if (typeof callback === 'string' || callback instanceof String) {
            this.sequence.push([timeCode, this[callback]]);
        }

        //_.sortBy(this.sequence, function(sequence){return pbtp.utilities.convertToSeconds(sequence[0]);});  // Sort sequences so we can add animations in any order
    },
    playSequence: function(currentTime) {
        // If the sequence still unplayed animations
        if (this.sequence.length) {
            // First element in the sequence is the keyframe
            var keyFrame = pbtp.utilities.convertToSeconds(this.sequence[0][0]);

            // If the current time is the same time as the keyframe
            if (currentTime >= keyFrame) {
                this.sequence[0][1](); // Play first scene
                this.sequence.shift(); // Remove first scene
            }
        }
    }
};