/**
* Creates new scene
* @param {name, args}
* args for previous three.js scene
* @return {scene}
*/
var Sequence = function() {
    this.sequence = [];
    this.init();
};

Sequence.prototype = {
    constructor: Sequence,

    init: function () {
    },

    addSequence: function(timeCode, callback, args) {
        /**
        * Callback can be string for extended prototype function, or a function itself
        */

        if (_.isFunction(callback)) {
            this.sequence.push([timeCode, callback, args]);
            this.sortSequence();
        }
    },

    sortSequence: function() {
        var sortedSequence = _(this.sequence).sortBy(function(sequence){
            return pbtp.utilities.convertToSeconds(sequence[0]);
        });

        this.sequence = sortedSequence;
    },

    playSequence: function(currentTime) {
        // If the sequence still unplayed animations
        if (this.sequence.length) {
            // First element in the sequence is the keyframe
            var keyFrame = pbtp.utilities.convertToSeconds(this.sequence[0][0]);
            // If the current time is the same time as the keyframe

            if (currentTime >= keyFrame) {
                this.sequence[0][1].apply(this, this.sequence[0][2]); // Play first scene
                this.sequence.shift(); // Remove first scene
            }
        }
    }
};

Sequence.prototype.cameraZoom = function(camera, z, duration, easing) {
    if (this.cameraTween) {
        this.cameraTween.stop();
    }

    // Tween
    if (duration) {
        this.cameraTween = new TWEEN.Tween({zoom: camera.position.z})
            .to({zoom: z}, duration)
            .easing(easing)
            .onUpdate(function () {
                camera.position.z = this.zoom;
            })
        .start();
    }

    // Jump
    else {
        camera.position.z = z;
    }
};