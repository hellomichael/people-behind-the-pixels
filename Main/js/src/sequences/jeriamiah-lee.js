/******************************
* Extend Scene Prototype
******************************/
var SequenceJL = function() {
    this.sequence = [];
    this.init();
};

SequenceJL.prototype = new Sequence();

SequenceJL.prototype.init = function() {
    // Scene
    this.scene = sequenceDB.scene;

    // Camera
    this.camera = sequenceDB.camera;

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});

    /******************************
    * Add Objects
    ******************************/
    this.ring1 = new RingMesh(0, 0, 8, 5);
    this.ring2 = new RingMesh(0, 0, 8, 5);
    this.ring3 = new RingMesh(0, 0, 8, 5);
    this.ring4 = new RingMesh(0, 0, 8, 5);
    this.ring5 = new RingMesh(0, 0, 8, 5);

    this.ring1.rotation.x = Util.toRadians(90);
    this.ring2.rotation.x = Util.toRadians(90);
    this.ring3.rotation.x = Util.toRadians(90);
    this.ring4.rotation.x = Util.toRadians(90);
    this.ring5.rotation.x = Util.toRadians(90);

    this.scene.add(this.ring1);
    this.scene.add(this.ring2);
    this.scene.add(this.ring3);
    this.scene.add(this.ring4);
    this.scene.add(this.ring5);
};

/******************************
* Create Animations
******************************/
SequenceJL.prototype.rotateRing = function(ring, rotation, distance, duration, easing) {
    new TWEEN.Tween({rotation: 0})
        .to({rotation: rotation}, duration)
        .easing(easing)
        .onUpdate(function (time) {
            // Oscillating distance
            ring.children[0].position.x = Math.sin(time * Util.toRadians(180)) * distance;
            ring.children[1].position.x = Math.sin(time * Util.toRadians(180)) * distance;
            ring.children[2].position.x = Math.sin(time * Util.toRadians(180)) * distance;

            // Rotation
            ring.rotation.z = this.rotation;
        })
    .start();

    new TWEEN.Tween({opacity: 0, opacityHide: 1})
        .to({opacity: 0.25, opacityHide: 0}, 3000)
        .delay(Math.random() * 3000 + 7000)
        .onUpdate(function (time) {
            ring.children[0].material.opacity = this.opacityHide;
            ring.children[1].material.opacity = this.opacityHide;
            ring.children[2].material.opacity = this.opacity;
        })
    .start();
};

SequenceJL.prototype.update = function(delta) {
    sequenceTA.particulator.update(delta);
};


/******************************
* Add Events
******************************/
var sequenceJL = new SequenceJL();

var glitchJL = new Glitch ('JERIAMIAH LEE', 0, 0);
sequenceJL.addEvent('01:03:15', function() {glitchJL.animateIn()});
sequenceJL.addEvent('01:08:15', function() {glitchJL.animateOut()});

sequenceJL.addEvent('01:00:15', function() {
    sequenceJL.rotateRing(sequenceJL.ring1, Util.toRadians(Math.random() * 4095), 0.3, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:00:20', function() {
    sequenceJL.rotateRing(sequenceJL.ring2, Util.toRadians(Math.random() * -4095), -0.3, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:00:25', function() {
    sequenceJL.rotateRing(sequenceJL.ring3, Util.toRadians(Math.random() * 4095), 0.3, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:01:00', function() {
    sequenceJL.rotateRing(sequenceJL.ring4, Util.toRadians(Math.random() * -4095), -0.3, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:01:05', function() {
    sequenceJL.rotateRing(sequenceJL.ring5, Util.toRadians(Math.random() * 4095), -0.3, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:01:10', function() {
    sequenceJL.fade(sequenceDB.asteroids1.children[4], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceDB.asteroids2.children[4], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceDB.asteroids3.children[4], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceDB.asteroids5.children[4], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceDB.asteroids6.children[4], 0, 1500, TWEEN.Easing.Bounce.InOut);

    sequenceJL.fade(sequenceJL.ring1.children[0], 1, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring2.children[0], 1, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring3.children[0], 1, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring4.children[0], 1, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring5.children[0], 1, 1500, TWEEN.Easing.Bounce.InOut);

    sequenceJL.fade(sequenceJL.ring1.children[1], 1, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring2.children[1], 1, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring3.children[1], 1, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring4.children[1], 1, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring5.children[1], 1, 1500, TWEEN.Easing.Bounce.InOut);
});

/*sequenceJL.addEvent('01:01:10', function() {
    sequenceJL.cameraMovement(sequenceJL.camera, false, 0, -5, 0, 15000, TWEEN.Easing.Linear.None);
});*/

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJL);