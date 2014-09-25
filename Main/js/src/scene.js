/**
* Creates new scene
* @param {name, args}
* args for previous three.js scene
* @return {scene}
*/
var Scene = function(args) {
    this.sequence = [];
    this.args = args || false;

    this.renderer;
    this.scene;
    this.camera;

    this.init();
};

Scene.prototype = {
    constructor: Scene,

    init: function () {
        // Check each argument to see if previous scene is passed along
        // Otherwise create new three.js objects (haven't done this yet)
        if (this.args) {
            this.renderer = this.args.renderer;
            this.scene =  this.args.scene;
            this.camera = this.args.camera;
        }

        this.initObjects();
    },

    initObjects: function () {

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
    },

    renderScene: function () {
        // Always make sure canvas is full screen
        if (resize) {
            this.renderer.setSize(screenWidth, screenHeight, false);
            this.camera.aspect = screenWidth/screenHeight;
            this.camera.updateProjectionMatrix();
            resize = false;
        }

        this.renderer.render(this.scene, this.camera);
    }
};