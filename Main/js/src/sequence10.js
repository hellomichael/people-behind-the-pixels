/******************************
* Extend Scene Prototype
******************************/
var Sequence10 = function() {
    this.sequence = [];
    this.init();
};

Sequence10.prototype = new Sequence();

/******************************
* Add Objects
******************************/
Sequence10.prototype.init = function() {
    // Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 50);
    renderator.reset(this.scene, this.camera);

    // Camera Positioning
    this.camera.position.z = 10;

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(100, 100, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ring1 = new Ring(0, 0);
    this.ring2 = new Ring(0, 0);
    this.ring3 = new Ring(0, 0);
    this.ring4 = new Ring(0, 0);

    this.scene.add(this.ring1);
    this.scene.add(this.ring2);
    this.scene.add(this.ring3);
    this.scene.add(this.ring4);
};

/******************************
* Add Animations
******************************/
Sequence10.prototype.rotateRing = function(ring, rotation, distance, duration, easing) {
    new TWEEN.Tween({rotation: 0})
        .to({rotation: rotation}, duration)
        .easing(easing)
        .onUpdate(function (time) {
            // Oscillating distance
            ring.children[0].position.x = Math.sin(time * 180 * Math.PI / 180) * distance;
            ring.children[1].position.x = Math.sin(time * 180 * Math.PI / 180) * distance;
            ring.children[2].position.x = Math.sin(time * 180 * Math.PI / 180) * distance;

            // Rotation
            ring.rotation.z = this.rotation;
        })
    .start();

    new TWEEN.Tween({opacity: 0, opacityHide: 1})
        .to({opacity: 0.5, opacityHide: 0}, duration/5)
        .delay(duration/8)
        .onUpdate(function (time) {
            ring.children[0].material.opacity = this.opacityHide;
            ring.children[1].material.opacity = this.opacityHide;
            ring.children[2].material.opacity = this.opacity;
        })
    .start();
};

/******************************
* Initialize New Scene
******************************/
var sequence10 = new Sequence10();

/******************************
* Add Sequences
******************************/
var speaker = new Glitch ('JERIAMIAH LEE', 0, 0);
sequence10.addEvent('00:16:00', function() {speaker.animateIn()});
sequence10.addEvent('00:22:00', function() {speaker.animateOut()})

sequence10.addEvent('00:11:00', sequence10.rotateRing, [sequence10.ring1, 5000*Math.PI/180, 0.3, 20000, TWEEN.Easing.Quadratic.Out]);
sequence10.addEvent('00:11:05', sequence10.rotateRing, [sequence10.ring2, -4000*Math.PI/180, -0.3, 20000, TWEEN.Easing.Quadratic.Out]);
sequence10.addEvent('00:11:10', sequence10.rotateRing, [sequence10.ring3, 4000*Math.PI/180, 0.3, 20000, TWEEN.Easing.Quadratic.Out]);
sequence10.addEvent('00:11:15', sequence10.rotateRing, [sequence10.ring4, -5000*Math.PI/180, -0.3, 20000, TWEEN.Easing.Quadratic.Out]);

sequence10.addEvent('00:10:00', sequence10.cameraZoom, [sequence10.camera, 13, 20000, TWEEN.Easing.Quadratic.InOut]);



/******************************
* Add Sequences
******************************/
sequences.push(sequence10);