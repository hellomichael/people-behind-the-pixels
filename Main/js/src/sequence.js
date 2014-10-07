
// Sequence base class
var Sequence = function() {
    
    this.events = [];
    this.init();

};


Sequence.prototype = {

    constructor: Sequence,


    init: function () {
    },


    addEvent: function(timeCode, callback, args) {
        
        // Callback can be string for extended prototype function, or a function itself        
        if (_.isFunction(callback)) {

            this.events.push([timeCode, callback, args]);
            this.sortEvents();            
        }
    },


    sortEvents: function() {
        var sortedSequence = _(this.events).sortBy(function(events){
            return pbtp.utilities.convertToSeconds(events[0]);
        });

        this.events = sortedSequence;
    },


    update: function(delta) {

    },


    play: function(currentTime) {

        if (this.events.length) {
        
            // First element in the sequence is the keyframe
            var timeCode = pbtp.utilities.convertToSeconds(this.events[0][0]);
        
            // If the current time is the same time as the keyframe
            if (currentTime >= timeCode) {

                // Play first event and remove from queue
                this.events[0][1].apply(this, this.events[0][2]);                
                this.events.shift(); 
            }
        }
    }
};


Sequence.prototype.cameraZoom = function(camera, z, duration, easing, lookat) {
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

                //camera.lookAt(lookat.position);
            })
        .start();
    }

    // Jump
    else {
        camera.position.z = z;
    }
};