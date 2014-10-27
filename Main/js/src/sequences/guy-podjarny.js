/******************************
* Extend Scene Prototype
******************************/
var SequenceGP = function() {
    this.sequence = [];
    this.init();
};

SequenceGP.prototype = new Sequence();

SequenceGP.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 1000);

    this.camera.rotation.x = Util.toRadians(-90);
    this.camera.position.y = 0;
    this.camera.position.z = 0;


    // Renderator
    renderator.reset(this.scene, this.camera,
        {
            postProcessEnabled      : true,

            blurEnabled             : false,
            blurAmount              : 3,
            blurPosition            : 0.5,

            bloomEnabled            : false,
            aaEnabled               : true
        }
    );

    // Particulator
    this.particulator = new Particulator(75, 200, new THREE.Vector3(-0.5, 0.5, -0.5), THREE.ImageUtils.loadTexture('shared/img/particle.png'), this.camera, 1);
    this.particulator.material.opacity = 0.2;
    this.scene.add(this.particulator.pointCloud);

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(-100, 1000, 600).normalize();
    this.scene.add(this.directionalLight);

    this.directionalLight2 = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight2.position.set(100, -1000, -600).normalize();
    this.scene.add(this.directionalLight2);

    this.ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(this.ambientLight);

    /******************************
    * Add Objects
    ******************************/

    // Create pyramid
    this.pyramidHeight = 10;
    this.pyramidGroup = new THREE.Object3D();

    for (var i=this.pyramidHeight; i>0; i--) {
        for (var j=0; j<i; j++) {
            for (var k=0; k<i; k++) {
                var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({color: 0x444444, opacity: 1, wireframe: false, side: THREE.DoubleSide}));
                cube.position.set(j - i/2 + 0.5, -i + (this.pyramidHeight)/2, k - i/2 + 0.5);
                this.pyramidGroup.add(cube);
            }
        }
    }

    this.pyramidGroup.scale.set(0.13, 0.13, 0.13);
    this.pyramidGroup.position.y = -1;
    this.scene.add(this.pyramidGroup);

    this.numberOfCubes = this.pyramidGroup.children.length;


    //var controls = new THREE.OrbitControls(this.camera);
};

/******************************
* Add Animations
******************************/

/******************************
* Initialize New Scene
******************************/
var sequenceGP = new SequenceGP();


/******************************
* Add Events
******************************/
var glitchGP = new Glitch ('GUY PODJARNY', 315, 15);
sequenceGP.addEvent('00:06:15', function() {glitchGP.animateIn()});
sequenceGP.addEvent('00:12:00', function() {glitchGP.animateOut()});

sequenceGP.addEvent('00:01:00', function () {
    sequenceGP.cameraMovement(sequenceGP.camera, false, 0, -28, 0, 7500, TWEEN.Easing.Quadratic.InOut, function () {

        sequenceGP.rotate(sequenceGP.pyramidGroup, 0, Util.toRadians(45), 0, 6500, TWEEN.Easing.Exponential.InOut);
        sequenceGP.rotate(sequenceGP.camera, Util.toRadians(5), 0, 0, 7500, TWEEN.Easing.Exponential.InOut);
        sequenceGP.cameraMovement(sequenceGP.camera, false, 0, 28 + 0.1, 1, 7500, TWEEN.Easing.Exponential.InOut);
    });
});

for (var i=sequenceGP.numberOfCubes-1; i>=0; i--) {
    var randomY = _.random(50, 200);

    // Set random position
    sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)].originalVertices = [
        sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)].position.x,
        sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)].position.y,
        sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)].position.z
    ];

    // Cache original position
    sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)].position.y += randomY;
}


sequenceGP.addEvent('00:12:00', function () {
    for (var i=sequenceGP.numberOfCubes-1; i>=0; i--) {
        sequenceGP.position(sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)],
        sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)].originalVertices[0],
        sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)].originalVertices[1],
        sequenceGP.pyramidGroup.children[sequenceGP.numberOfCubes - (i + 1)].originalVertices[2],
        5000, TWEEN.Easing.Quadratic.Out);
    }
});

sequenceGP.addEvent('00:19:00', function () {
    sequenceGP.cameraMovement(sequenceGP.camera, false, 0, -8, -1, 4000, TWEEN.Easing.Exponential.InOut);
});


sequenceGP.addEvent('00:19:15', function () {
    sequenceGP.rotate(sequenceGP.camera, Util.toRadians(-90), 0, 0, 4000, TWEEN.Easing.Exponential.InOut);
});



var glitchKM = new Glitch ('KATIE MILLER', -700, -400);
sequenceGP.addEvent('00:15:15', function() {glitchKM.animateIn()});
sequenceGP.addEvent('00:20:15', function() {glitchKM.animateOut()});


/******************************
* Add Sequences
******************************/
timeline.push(sequenceGP);