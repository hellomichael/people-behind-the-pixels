/******************************
* Extend Scene Prototype
******************************/
var SequenceEM = function() {
    this.sequence = [];
    this.init();
};

SequenceEM.prototype = new Sequence();

/******************************
* Create Objects
******************************/
SequenceEM.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    this.camera.position.y = 10;
    this.camera.position.z = 0;

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

    /*this.particulator = new Particulator(50, 500, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera);
    this.scene.add(this.particulator.pointCloud);*/

    /******************************
    * Add Objects
    ******************************/
    this.cube = new THREE.Mesh(new THREE.CylinderGeometry(0, 4, 4, 5), this.lightMaterial);
    this.cube.position.y = 0;

    this.scene.add(this.cube);
};

/******************************
* Create Animations
******************************/
SequenceEM.prototype.pew = function(cube, length, duration, easing) {
    new TWEEN.Tween({length: 0})
        .to({length: length}, duration)
        .onUpdate(function () {
            cube.position.z = -this.length/2;
            cube.scale.z = this.length;
        })
    .start();
};

SequenceEM.prototype.pewRotate = function(cube, duration, easing) {
    new TWEEN.Tween({rotateX: 0, rotateY: 0})
        .to({rotateX: 15, rotateY: 45}, duration)
        .onUpdate(function() {
            cube.rotation.x = Util.toRadians(this.rotateX);
            cube.rotation.y = Util.toRadians(this.rotateY);
        })
    .start();
};

/******************************
* Add Events
******************************/
var sequenceEM = new SequenceEM();

sequenceEM.addEvent('01:17:05', function () {
    sequenceEM.nextScene(sequenceEM.scene, sequenceEM.camera, true, true, 5, false);
});

sequenceEM.addEvent('01:17:15', function () {
    sequenceEM.pew(sequenceEM.cube, 250, 3000, TWEEN.Easing.Quadratic.InOut);
});

sequenceEM.addEvent('01:17:15', function () {
    sequenceEM.pewRotate(sequenceEM.cube, 20000, TWEEN.Easing.Exponential.InOut);
});

sequenceEM.addEvent('01:16:25', function () {
    sequenceEM.cameraMovement(sequenceEM.camera, false, -3, 5, 0, 10000, TWEEN.Easing.Exponential.InOut);
});

/*var erinMoore = new Glitch ('ERIN MOORE', -300, -100);
sequenceEM.addEvent('00:36:15', function() {erinMoore.animateIn()});
sequenceEM.addEvent('00:46:00', function () {
    function() {erinMoore.animateOut()})*/

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceEM);