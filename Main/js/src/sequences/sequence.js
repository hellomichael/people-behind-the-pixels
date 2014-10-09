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
            return Util.toSeconds(events[0]);
        });

        this.events = sortedSequence;
    },


    update: function(delta) {

    },

    play: function(currentTime) {
        if (this.events.length) {

            // First element in the sequence is the keyframe
            var timeCode = Util.toSeconds(this.events[0][0]);

            // If the current time is the same time as the keyframe
            if (currentTime >= timeCode) {

                // Play first event and remove from queue
                this.events[0][1].apply(this, this.events[0][2]);
                this.events.shift();
            }
        }
    }
};


Sequence.prototype.cameraMovement = function(camera, object, pedastal, dolly, zoom, duration, easing) {
    var pedestalTarget = camera.position.x + pedastal;
    var dollyTarget = camera.position.y - dolly;
    var zoomTarget = camera.position.z + zoom;

    if (this.cameraTween) {
        this.cameraTween.stop();
    }

    // Camera movement
    if (duration) {
        this.cameraTween = new TWEEN.Tween({pedestal: camera.position.x, dolly: camera.position.y, zoom: camera.position.z})
            .to({pedestal: pedestalTarget, dolly: dollyTarget, zoom: zoomTarget}, duration)
            .easing(easing)
            .onUpdate(function () {
                camera.position.x = this.pedestal;
                camera.position.y = this.dolly;
                camera.position.z = this.zoom;

                // Add look at object
                if (object) {
                    camera.lookAt(object.position);
                }
            })
        .start();
    }

    // Camera cut
    else {
        camera.position.x = pedestalTarget;
        camera.position.y = dollyTarget;
        camera.position.z = zoomTarget;

        camera.lookAt(object.position);
    }
};