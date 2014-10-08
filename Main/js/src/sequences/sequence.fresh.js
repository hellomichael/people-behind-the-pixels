/******************************
* Extend Scene Prototype
******************************/
var SequenceSpeakerName = function() {
    this.sequence = [];
    this.init();
};

SequenceSpeakerName.prototype = new Sequence();

/******************************
* Add Objects
******************************/
SequenceSpeakerName.prototype.init = function() {
    // Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 50);
    renderator.reset(this.scene, this.camera);

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({color: 'white'});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(100, 100, 100).normalize();
    this.scene.add(this.directionalLight);

    // Camera Positioning
    this.camera.position.z = 10;

    // Objects
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.lightMaterial);
    this.scene.add(this.cube);
};

/******************************
* Add Animations
******************************/
/*SequenceSpeakerName.prototype.rotateRing = function(ring, rotation, distance, duration, easing) {
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
var sequenceSpeakerName = new SequenceSpeakerName();

/******************************
* Add Sequences
******************************/
var speaker = new Glitch ('SPEAKER NAME', 0, 0);
sequenceSpeakerName.addEvent('00:16:00', function() {speaker.animateIn()});
sequenceSpeakerName.addEvent('00:22:00', function() {speaker.animateOut()})

//sequenceSpeakerName.addEvent('00:10:00', sequenceSpeakerName.cameraMovement, [sequenceSpeakerName.camera, 13, 20000, TWEEN.Easing.Quadratic.InOut]);


/******************************
* Add Sequences
******************************/
sequences.push(sequenceSpeakerName);