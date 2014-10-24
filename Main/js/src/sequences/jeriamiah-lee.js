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
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    this.camera.position.z = 10;

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(100, 100, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0xFFFFFF);
    this.scene.add(this.ambientLight);

    /******************************
    * Add Objects
    ******************************/
    this.ring1 = new RingMesh(0, 0, 5, 3);
    this.ring2 = new RingMesh(0, 0, 5, 3);
    this.ring3 = new RingMesh(0, 0, 5, 3);
    this.ring4 = new RingMesh(0, 0, 5, 3);
    this.ring5 = new RingMesh(0, 0, 5, 3);

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
        .delay(Math.random() * 3000 + 5000)
        .onUpdate(function (time) {
            ring.children[0].material.opacity = this.opacityHide;
            ring.children[1].material.opacity = this.opacityHide;
            ring.children[2].material.opacity = this.opacity;
        })
    .start();
};

/******************************
* Add Events
******************************/
var sequenceJL = new SequenceJL();

sequenceJL.addEvent('01:04:00', function () {
    var options = {
        postProcessEnabled      : true,

        blurEnabled             : true,
        blurAmount              : 2,
        blurPosition            : 0.6,

        bloomEnabled            : false,
        aaEnabled               : true
    }

    sequenceJL.nextScene(sequenceJL.scene, sequenceJL.camera, options);
})

var glitchJL = new Glitch ('JERIAMIAH LEE', 0, 0);
sequenceJL.addEvent('01:06:00', function() {glitchJL.animateIn()});
sequenceJL.addEvent('01:11:00', function() {glitchJL.animateOut()});

sequenceJL.addEvent('01:04:01', function() {
    sequenceJL.rotateRing(sequenceJL.ring1, Util.toRadians(Math.random() * 4095), 0.2, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:04:04', function() {
    sequenceJL.rotateRing(sequenceJL.ring2, Util.toRadians(Math.random() * -4095), -0.2, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:04:10', function() {
    sequenceJL.rotateRing(sequenceJL.ring3, Util.toRadians(Math.random() * 4095), 0.25, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:04:15', function() {
    sequenceJL.rotateRing(sequenceJL.ring4, Util.toRadians(Math.random() * -4095), -0.25, 10000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJL.addEvent('01:04:04', function() {
    sequenceJL.rotateRing(sequenceJL.ring5, Util.toRadians(Math.random() * 4095), -0.2, 10000, TWEEN.Easing.Quadratic.InOut);
});


/*sequenceJL.addEvent('00:00:01', function() {
    sequenceJL.cameraMovement(sequenceJL.camera, false, 0, 0, -1.5, 15000, TWEEN.Easing.Quadratic.InOut);
});
*/
/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJL);