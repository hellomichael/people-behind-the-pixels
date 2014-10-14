/******************************
* Extend Scene Prototype
******************************/
var SequenceErinMoore = function() {
    this.sequence = [];
    this.init();
};

SequenceErinMoore.prototype = new Sequence();

/******************************
* Add Objects
******************************/
SequenceErinMoore.prototype.init = function() {
    // Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 'white', transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(100, 100, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x777777);
    this.scene.add(this.ambientLight);

    /*this.particulator = new Particulator(80, 1200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera);
    this.scene.add(this.particulator.pointCloud);*/

    // Camera Positioning
    this.camera.position.y = 10;
    this.camera.position.z = 0;

    // Objects
    this.cube = new THREE.Mesh(new THREE.CylinderGeometry(0, 4, 4, 5), this.lightMaterial);
    this.cube.position.y = 0;

    this.scene.add(this.cube);
};

/******************************
* Add Animations
******************************/
SequenceErinMoore.prototype.pew = function(cube, length, duration, easing) {
    new TWEEN.Tween({length: 0})
        .to({length: length}, duration)
        .onUpdate(function () {
            cube.position.z = -this.length/2;
            cube.scale.z = this.length;
        })
    .start();
};

SequenceErinMoore.prototype.pewRotate = function(cube, duration, easing) {
    new TWEEN.Tween({rotateX: 0, rotateY: 0})
        .to({rotateX: 15, rotateY: 45}, duration)
        .onUpdate(function() {
            cube.rotation.x = Util.toRadians(this.rotateX);
            cube.rotation.y = Util.toRadians(this.rotateY);
        })
    .start();
};

/******************************
* Initialize New Scene
******************************/
var sequenceErinMoore = new SequenceErinMoore();

/******************************
* Add Sequences
******************************/
sequenceErinMoore.addEvent('00:35:10', sequenceErinMoore.nextScene, [sequenceErinMoore.scene, sequenceErinMoore.camera, true, true, 5, false]);

sequenceErinMoore.addEvent('00:35:10', sequenceErinMoore.pew, [sequenceErinMoore.cube, 250, 3000, TWEEN.Easing.Quadratic.InOut]);
sequenceErinMoore.addEvent('00:35:20', sequenceErinMoore.pewRotate, [sequenceErinMoore.cube, 20000, TWEEN.Easing.Exponential.InOut]);
sequenceErinMoore.addEvent('00:35:10', sequenceErinMoore.cameraMovement, [sequenceErinMoore.camera, false, -3, 5, 0, 10000, TWEEN.Easing.Exponential.InOut]);

var erinMoore = new Glitch ('ERIN MOORE', -300, -100);
sequenceErinMoore.addEvent('00:36:15', function() {erinMoore.animateIn()});
sequenceErinMoore.addEvent('00:46:00', function() {erinMoore.animateOut()})

/******************************
* Add Sequences
******************************/
sequences.push(sequenceErinMoore);