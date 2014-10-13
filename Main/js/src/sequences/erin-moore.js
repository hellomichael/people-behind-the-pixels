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
    renderator.reset(this.scene, this.camera,
        {
            postRenderEnabled: true,
            blurEnabled: true,
            blurAmount: 5
        }
    );

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 'white', transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(100, 100, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0xAAAAAA);
    this.scene.add(this.ambientLight);

    this.particulator = new Particulator(80, 1200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera);
    this.scene.add(this.particulator.pointCloud);

    // Camera Positioning
    this.camera.position.y = 10;
    this.camera.position.z = 0;

    // Objects
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 1), this.lightMaterial);


    this.cube.rotation.y = Util.toRadians(0);
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
var speaker = new Glitch ('ERIN MOORE', -300, -100);
sequenceErinMoore.addEvent('00:04:00', function() {speaker.animateIn()});
sequenceErinMoore.addEvent('00:09:00', function() {speaker.animateOut()})

sequenceErinMoore.addEvent('00:00:15', sequenceErinMoore.pew, [sequenceErinMoore.cube, 250, 1000, TWEEN.Easing.Exponential.In]);

sequenceErinMoore.addEvent('00:00:20', sequenceErinMoore.pewRotate, [sequenceErinMoore.cube, 15000, TWEEN.Easing.Exponential.InOut]);
sequenceErinMoore.addEvent('00:00:20', sequenceErinMoore.cameraMovement, [sequenceErinMoore.camera, false, -5, 5, 0, 15000, TWEEN.Easing.Exponential.InOut]);

/******************************
* Add Sequences
******************************/
sequences.push(sequenceErinMoore);