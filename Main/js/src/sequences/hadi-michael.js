/******************************
* Extend Scene Prototype
******************************/
var SequenceHM = function() {
    this.sequence = [];
    this.init();
};

SequenceHM.prototype = new Sequence();

SequenceHM.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 5, 1000);
    this.camera.position.z = 100;
    this.screenDimensions = Util.getScreenDimensions(this.camera);

    // Renderator
    renderator.reset(this.scene, this.camera,
        {
            postProcessEnabled      : false,

            blurEnabled             : false,
            blurAmount              : false,
            blurPosition            : false,

            bloomEnabled            : false,
            aaEnabled               : false
        }
    );

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial({color: 0x222222, opacity: 1, transparent: true, side: THREE.DoubleSide});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 0x222222, opacity: 1, transparent: true, side: THREE.DoubleSide});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0x999999);
    this.directionalLight.position.set(0, 10000, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(this.ambientLight);

    /******************************
    * Add Objects
    ******************************/
    // this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.lightMaterial);
    // this.scene.add(this.cube);

    this.squareGeometry = new THREE.Geometry();
    this.squareGeometry.vertices.push( new THREE.Vector3( -1, 3, 0 ) );
    this.squareGeometry.vertices.push( new THREE.Vector3( 1.0, 1.0, 0 ) );
    this.squareGeometry.vertices.push( new THREE.Vector3( 1.0, -1.0, 0 ) );
    this.squareGeometry.vertices.push( new THREE.Vector3( -1, -3, 0 ) );

    this.squareGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    this.squareGeometry.faces.push( new THREE.Face3( 2, 0, 3 ) );
    this.square = new THREE.Mesh(this.squareGeometry, this.lightMaterial);
    this.square2 = new THREE.Mesh(this.squareGeometry, this.lightMaterial);
    this.square3 = new THREE.Mesh(this.squareGeometry, this.lightMaterial);
    this.square4 = new THREE.Mesh(this.squareGeometry, this.lightMaterial);
    // this.square2 = new THREE.Mesh(this.squareGeometry2, this.lightMaterial);
    this.scene.add(this.square);
    this.scene.add(this.square2);
    this.scene.add(this.square3);
    this.scene.add(this.square4);


    this.square.position.set(-28, 28, 0);
    this.square2.position.set(28, 28, 0);
    this.square3.position.set(-28, -28, 0);
    this.square4.position.set(28, -28, 0);
    // this.square.position.set(-1.4, 1.4, 0);
    // this.square2.position.set(1.4, 1.4, 0);
    // this.square3.position.set(-1.4, -1.4, 0);
    // this.square4.position.set(1.4, -1.4, 0);
    this.square.scale.set(20, 20, 20);
    this.square2.scale.set(20, 20, 20);
    this.square3.scale.set(20, 20, 20);
    this.square4.scale.set(20, 20, 20);
    // this.square2.material.color.setHex = '0xffffff';

    this.square.rotation.z = Util.toRadians(315);
    this.square2.rotation.z = Util.toRadians(225);
    this.square3.rotation.z = Util.toRadians(45);
    this.square4.rotation.z = Util.toRadians(135);
    // this.square4.rotation.z = Util.toRadians(0);
    console.log(this.square2.material);
};

/******************************
* Create Animations
******************************/
/*SequenceHM.prototype.animateSomething = function(object, opacity, duration, easing) {
    new TWEEN.Tween({opacity: 0})
        .to({opacity: opacity}, duration)
        .easing(easing)
        .onUpdate(function (time) {
            object.material.opacity = this.opacity;
        })
    .start();
};*/

/******************************
* Add Events
******************************/
var sequenceHM = new SequenceHM();

/******************************
* Add Events
******************************/
// var glitchWD = new Glitch ('SPEAKER NAME', 0, -150);
// sequenceHM.addEvent('00:01:00', function() {glitchWD.animateIn()});
// sequenceHM.addEvent('00:06:00', function() {glitchWD.animateOut()});

sequenceHM.addEvent('00:00:00', function () {
    // sequenceHM.animateSomething(sequenceHM.cube, 1, 1000, TWEEN.Easing.Exponential.InOut)
});


sequenceHM.addEvent('00:01:00', function () {
    sequenceHM.cameraMovement(sequenceHM.camera, false, 0, 0, -70, 14000, TWEEN.Easing.Exponential.InOut);
});
/******************************
* Add to Timeline
******************************/
timeline.push(sequenceHM);