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
        // Convert timecode
        if (typeof timeCode != 'string') {
            timeCode = Util.toTimecode(timeCode);
        }


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

Sequence.prototype.nextScene = function(scene, camera, options) {
    renderator.reset(scene, camera, options);
}

Sequence.prototype.cameraMovement = function(camera, object, pedastal, dolly, zoom, duration, easing, callback) {
    var pedestalTarget = camera.position.x + pedastal;
    var dollyTarget = camera.position.y - dolly;
    var zoomTarget = camera.position.z + zoom;

/*    if (this.cameraTween) {
        this.cameraTween.stop();
    }*/

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
            }).onComplete(function() {
                if (callback) {
                    callback();
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

Sequence.prototype.pullFocus = function(renderator, blur, position, duration, easing) {
    //this.zoomAudio = new Audio('shared/audio/zoom.mp3');
    //this.zoomAudio.play();

    if (renderator.blurEnabled) {
        if (duration) {
            this.cameraTween = new TWEEN.Tween({position: renderator.hblur.uniforms[ 'r' ].value, blur: renderator.bluriness})
                .to({position: position, blur: blur}, duration)
                .easing(easing)
                .onUpdate(function () {
                    renderator.hblur.uniforms[ 'r' ].value = renderator.vblur.uniforms[ 'r' ].value = this.position;

                    renderator.bluriness = this.blur;
                    renderator.hblur.uniforms['h'].value = renderator.bluriness/window.innerWidth;
                    renderator.vblur.uniforms['v'].value = renderator.bluriness/window.innerHeight;
                })
            .start();
        }

        else {
            renderator.hblur.uniforms[ 'r' ].value = renderator.vblur.uniforms[ 'r' ].value = this.position;

            renderator.bluriness = this.blur;
            renderator.hblur.uniforms['h'].value = renderator.bluriness/window.innerWidth;
            renderator.vblur.uniforms['v'].value = renderator.bluriness/window.innerHeight;
        }
    }
}

Sequence.prototype.fade = function(object, opacity, duration, easing) {
    if (object.material.opacity === 0) {
        object.visible = true;
    }

    new TWEEN.Tween({opacity: object.material.opacity})
        .to({opacity: opacity}, duration)
        .easing(easing)
        .onUpdate(function () {
            object.material.opacity = this.opacity;
        }).onComplete(function () {
            if (opacity === 0) {
                object.visible = false;
            }
        })
    .start();
};

Sequence.prototype.hide = function(object) {
    object.position.x = -9999;
};

Sequence.prototype.show = function(object) {
    object.position.x = 0;
};

Sequence.prototype.rotate = function(object, rotationTargetX, rotationTargetY, rotationTargetZ, duration, easing) {
    new TWEEN.Tween({rotationX: object.rotation.x, rotationY: object.rotation.y, rotationZ: object.rotation.z})
        .to({rotationX: rotationTargetX, rotationY: rotationTargetY, rotationZ: rotationTargetZ}, duration)
        .easing(easing)
        .onUpdate(function () {
            object.rotation.x = this.rotationX;
            object.rotation.y = this.rotationY;
            object.rotation.z = this.rotationZ;
        })
    .start();
};

Sequence.prototype.position = function(object, positionTargetX, positionTargetY, positionTargetZ, duration, easing, callback) {
    new TWEEN.Tween({positionX: object.position.x, positionY: object.position.y, positionZ: object.position.z})
        .to({positionX: positionTargetX, positionY: positionTargetY, positionZ: positionTargetZ}, duration)
        .easing(easing)
        .onUpdate(function () {
            object.position.x = this.positionX;
            object.position.y = this.positionY;
            object.position.z = this.positionZ;
        }).onComplete(function() {
                if (callback) {
                    callback();
                }
            })
        .start();
};