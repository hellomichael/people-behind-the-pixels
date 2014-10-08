/******************************
* Extend Scene Prototype
******************************/
var SequenceBillScott = function() {
    this.sequence = [];
    this.init();
};

SequenceBillScott.prototype = new Sequence();

/******************************
* Add Objects
******************************/
SequenceBillScott.prototype.init = function() {
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
};

/******************************
* Add Animations
******************************/
/*SequenceBillScott.prototype.rotateRing = function(ring, rotation, distance, duration, easing) {
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
var sequenceBillScott = new SequenceBillScott();

/******************************
* Add Sequences
******************************/
var speaker = new Glitch ('BILL SCOTT', 0, 0);
sequenceBillScott.addEvent('00:32:00', function() {speaker.animateIn()});
sequenceBillScott.addEvent('00:36:00', function() {speaker.animateOut()});

/******************************
* Add Sequences
******************************/
sequences.push(sequenceBillScott);