/******************************
* Extend Scene Prototype
******************************/
var Sequence1 = function() {
    this.sequence = [];
    this.init();
};

Sequence1.prototype = new Sequence();

/******************************
* Add Objects
******************************/
Sequence1.prototype.init = function() {
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
};

/******************************
* Add Animations
******************************/
/*Sequence1.prototype.rotateRing = function(ring, rotation, distance, duration, easing) {
    new TWEEN.Tween({opacity: 0, opacityHide: 1})
        .to({opacity: 0.5, opacityHide: 0}, duration/5)
        .delay(duration/8)
        .onUpdate(function (time) {
            ring.children[0].material.opacity = this.opacityHide;
            ring.children[1].material.opacity = this.opacityHide;
            ring.children[2].material.opacity = this.opacity;
        })
    .start();
};*/

/******************************
* Initialize New Scene
******************************/
var sequence1 = new Sequence1();

/******************************
* Add Sequences
******************************/
var speaker = new Glitch ('Glitch', 0, 0);
sequence1.addEvent('00:16:00', function() {speaker.animateIn()});
sequence1.addEvent('00:22:00', function() {speaker.animateOut()})

//sequence1.addEvent('00:10:00', sequence1.cameraZoom, [sequence1.camera, 13, 20000, TWEEN.Easing.Quadratic.InOut]);


/******************************
* Add Sequences
******************************/
sequences.push(sequence1);