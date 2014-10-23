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
    /*this.particulator = new Particulator(80, 1200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0xAAAAAA), this.camera);
    this.scene.add(this.particulator.pointCloud);*/

    // Add lightbeam
    var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('shared/img/light.png'),
        transparent: true,
        opacity: 1,
        depthWrite: false,
        depthTest: false
    });

    this.triangleShape = new TriangleShape(2.5);
    this.extrusionSettings = {bevelEnabled: false, material: 0, amount: 1};
    this.extrusionGeometry = new THREE.ExtrudeGeometry( this.triangleShape, this.extrusionSettings );
    this.lightbeam = new THREE.Mesh(this.extrusionGeometry, material);

    //this.lightbeam.rotation.x = Util.toRadians(-90);
    this.lightbeam.rotation.z = Util.toRadians(180);


    this.lightbeam.position.z = -40;
    this.lightbeam.position.y = 0;
    this.lightbeam.scale.set(20, this.screenDimensions[1], 20);
    this.scene.add(this.lightbeam);


    /******************************
    * Add Objects
    ******************************/
    this.icosahedron = new IcosahedronMesh(this.screenDimensions[0]*0.3, this.screenDimensions[1]*0.5, 0, this.screenDimensions[1]/2);
    this.scene.add(this.icosahedron);
};

/******************************
* Add Events
******************************/
var sequenceJA = new SequenceJA();

sequenceJA.addEvent('00:37:25', function () {
    var options = {
        postProcessEnabled      : true,

        blurEnabled             : true,
        blurAmount              : 5,
        blurPosition            : 0.3,

        bloomEnabled            : false,
        aaEnabled               : true
    }

    sequenceJA.nextScene(sequenceJA.scene, sequenceJA.camera, options);
});

var glitchJA = new Glitch ('JAKE ARCHIBALD', -400, -100);
sequenceJA.addEvent('00:38:00', function() {glitchJA.animateIn()});
sequenceJA.addEvent('00:43:00', function() {glitchJA.animateOut()})

sequenceJA.addEvent('00:32:00', function () {
    sequenceJA.rotate(sequenceJA.icosahedron, Util.toRadians(-180), Util.toRadians(-180), Util.toRadians(-180), 40000, TWEEN.Easing.Linear.None);
});

sequenceJA.addEvent('00:36:00', sequenceJA.cameraMovement, [sequenceJA.camera, false, 0, 7, 0, 10000, TWEEN.Easing.Linear.None]);

sequenceJA.addEvent('00:42:05', sequenceJA.rotate, [sequenceJA.camera, 0, Util.toRadians(-150), Util.toRadians(20), 6000, TWEEN.Easing.Exponential.InOut]);

sequenceJA.addEvent('00:41:25', sequenceJA.fade, [sequenceJA.lightbeam, 0, 6000, TWEEN.Easing.Exponential.InOut]);


/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJA);