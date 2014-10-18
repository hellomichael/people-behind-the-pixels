/******************************
* Extend Scene Prototype
******************************/
var SequenceJA = function() {
    this.sequence = [];
    this.init();
};

SequenceJA.prototype = new Sequence();

SequenceJA.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 50);
    this.camera.position.z = 10;
    this.screenDimensions = Util.getScreenDimensions(this.camera);

    // Renderator
    renderator.reset(this.scene, this.camera,
        {
            postProcessEnabled      : true,

            blurEnabled             : true,
            blurAmount              : 3,
            blurPosition            : 0.3,

            bloomEnabled            : false,
            aaEnabled               : false
        }
    );

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});
    this.edgeMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true, wireframe: true});
    this.wireFrameMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true, wireframe: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0x999999);
    this.directionalLight.position.set(0, 10000, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(this.ambientLight);

    // Particulator
    this.particulator = new Particulator(80, 1200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera);
    this.scene.add(this.particulator.pointCloud);

    /******************************
    * Add Objects
    ******************************/
    this.icosahedron = new IcosahedronMesh(this.screenDimensions[0]*0.4, this.screenDimensions[1]*0.5, 0, this.screenDimensions[1]/2);
    this.icosahedron2 = new IcosahedronMesh(-10, -0.5, -15, 0.6);

    this.scene.add(this.icosahedron);
    this.scene.add(this.icosahedron2);
};

/******************************
* Create Animations
******************************/
SequenceJA.prototype.rotateIcosahedron = function(icosahedron, rotation, duration, easing) {
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
* Add Events
******************************/
var sequenceJA = new SequenceJA();

var glitchJA = new Glitch ('JAKE ARCHIBALD', -50, 100);
sequenceJA.addEvent('00:02:00', function() {glitchJA.animateIn()});
sequenceJA.addEvent('00:07:00', function() {glitchJA.animateOut()})

sequenceJA.addEvent('00:00:00', function () {
    sequenceJA.rotateIcosahedron(sequenceJA.icosahedron, Util.toRadians(180), 30000, TWEEN.Easing.Linear.None);
});

sequenceJA.addEvent('00:00:00', function () {
    sequenceJA.rotateIcosahedron(sequenceJA.icosahedron2, Util.toRadians(180), 30000, TWEEN.Easing.Linear.None);
});


//sequenceJA.addEvent('00:02:00', sequenceJA.cameraMovement, [sequenceJA.camera, false, 5, 1.5, -9, 3000, TWEEN.Easing.Exponential.InOut]);

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJA);