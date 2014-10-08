/******************************
* Extend Scene Prototype
******************************/
var SequenceJakeArchibald = function() {
    this.sequence = [];
    this.init();
};

SequenceJakeArchibald.prototype = new Sequence();

/******************************
* Add Objects
******************************/
SequenceJakeArchibald.prototype.init = function() {
    // Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 50);
    renderator.reset(this.scene, this.camera);

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({color: 'white'});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true,});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});
    this.edgeMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true, wireframe: true});
    this.wireFrameMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true, wireframe: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(0, 0.5, 0).normalize();
    this.scene.add(this.directionalLight);

    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(0, -0.05, 0).normalize();
    this.scene.add(this.directionalLight);

    this.particulator = new Particulator(80, 1200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera);
    this.scene.add(this.particulator.pointCloud);

    // Camera Positioning
    this.camera.position.z = 10;

    // Calculate width/height of screen
    // (http://stackoverflow.com/questions/13350875/three-js-width-of-view/13351534#13351534)
    var vFOV = Util.toRadians(this.camera.fov);
    var aspect = window.innerWidth/window.innerHeight;

    // Calculate edges of the screen
    this.screenHeight = 2 * Math.tan(vFOV/2) * (this.camera.position.z - 0);
    this.screenWidth = this.screenHeight * aspect;

    // Objects
    this.icosahedron = new Icosahedron(this.screenWidth*0.4, this.screenHeight*0.5, 0, this.screenHeight/2);
    this.icosahedron2 = new Icosahedron(-10, -0.5, -15, 0.6);

    this.scene.add(this.icosahedron);
    this.scene.add(this.icosahedron2);
};

/******************************
* Add Animations
******************************/
SequenceJakeArchibald.prototype.rotateIcosahedron = function(icosahedron, rotation, duration, easing) {
    new TWEEN.Tween({rotation: 0})
        .to({rotation: rotation}, duration)
        .onUpdate(function () {
            icosahedron.rotation.x = this.rotation;
            icosahedron.rotation.y = this.rotation;
            icosahedron.rotation.z = this.rotation;
        })
    .start();
};

/******************************
* Initialize New Scene
******************************/
var sequenceJakeArchibald = new SequenceJakeArchibald();

/******************************
* Add Sequences
******************************/
var speaker = new Glitch ('JAKE ARCHIBALD', -50, 100);
sequenceJakeArchibald.addEvent('00:02:00', function() {speaker.animateIn()});
sequenceJakeArchibald.addEvent('00:07:00', function() {speaker.animateOut()})

sequenceJakeArchibald.addEvent('00:00:00', sequenceJakeArchibald.rotateIcosahedron, [sequenceJakeArchibald.icosahedron, Util.toRadians(180), 30000, TWEEN.Easing.Exponential.Out]);
sequenceJakeArchibald.addEvent('00:00:00', sequenceJakeArchibald.rotateIcosahedron, [sequenceJakeArchibald.icosahedron2, Util.toRadians(180), 30000, TWEEN.Easing.Exponential.Out]);

sequenceJakeArchibald.addEvent('00:02:00', sequenceJakeArchibald.cameraMovement, [sequenceJakeArchibald.camera, false, 5, 1.5, -9, 3000, TWEEN.Easing.Exponential.InOut]);

/******************************
* Add Sequences
******************************/
sequences.push(sequenceJakeArchibald);