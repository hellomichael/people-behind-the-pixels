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
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 'white', transparent: true});
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
/*SequenceSpeakerName.prototype.animateSomething = function(object, opacity, duration, easing) {
    new TWEEN.Tween({opacity: 0})
        .to({opacity: opacity}, duration)
        .easing(easing)
        .onUpdate(function (time) {
            object.material.opacity = this.opacity;
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
sequenceSpeakerName.addEvent('00:06:00', function() {speaker.animateIn()});
sequenceSpeakerName.addEvent('00:12:00', function() {speaker.animateOut()})

//sequenceJessicaHische.addEvent('00:02:15', sequenceJessicaHische.cameraMovement, [sequenceJessicaHische.camera, false, 110, 0, 0, 7700, TWEEN.Easing.Quadratic.InOut]);

/******************************
* Add Sequences
******************************/
sequences.push(sequenceSpeakerName);