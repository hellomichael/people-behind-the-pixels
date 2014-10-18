/******************************
* Extend Scene Prototype
******************************/
var SequenceYJ = function() {
    this.sequence = [];
    this.init();
};

SequenceYJ.prototype = new Sequence();

SequenceYJ.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 5, 1000);
    this.camera.position.z = 10;
    this.screenDimensions = Util.getScreenDimensions(this.camera);

    // Renderator
    renderator.reset(this.scene, this.camera,
        {
            postProcessEnabled      : true,

            blurEnabled             : false,
            blurAmount              : 2,
            blurPosition            : 0.75,

            bloomEnabled            : false,
            noiseEnabled            : true,
            aaEnabled               : true
        }
    );

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0x222222, transparent: true});
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
    var tetrahedronScale = 2;
    this.tetrahedron = new TetrahedronMesh(tetrahedronScale);
    this.tetrahedron.rotation.x = Util.toRadians(-105);
    this.tetrahedron.position.y = -this.screenDimensions[1]/tetrahedronScale + 6;
    this.scene.add(this.tetrahedron);
};

/******************************
* Create Animations
******************************/
SequenceYJ.prototype.unFold = function(tetrahedronFace, rotation, axis, duration, easing) {
    var prevRotation = 0;

    new TWEEN.Tween({rotation: 0})
        .to({rotation: rotation}, duration)
        .easing(easing)
        .onUpdate(function () {
            // Reset matrix
            tetrahedronFace.rotateOnAxis(axis, Util.toRadians(-prevRotation));

            // Set matrix
            tetrahedronFace.rotateOnAxis(axis, Util.toRadians(this.rotation));
            prevRotation = this.rotation;
        })
    .start();
};

/******************************
* Add Events
******************************/
var sequenceYJ = new SequenceYJ();

var glitchYJ = new Glitch ('YOUNGHEE JUNG', 0, -150);
sequenceYJ.addEvent('00:01:00', function() {glitchYJ.animateIn()});
sequenceYJ.addEvent('00:06:00', function() {glitchYJ.animateOut()});

sequenceYJ.addEvent('00:00:00', function () {
    sequenceYJ.unFold(sequenceYJ.tetrahedron.children[1], -109.45, Util.getVector(270), 3000, TWEEN.Easing.Exponential.InOut)
});

sequenceYJ.addEvent('00:00:00', function () {
    sequenceYJ.unFold(sequenceYJ.tetrahedron.children[2], -109.45, Util.getVector(270), 3000, TWEEN.Easing.Exponential.InOut)
});

sequenceYJ.addEvent('00:00:00', function () {
    sequenceYJ.unFold(sequenceYJ.tetrahedron.children[3], -109.45, Util.getVector(270), 3000, TWEEN.Easing.Exponential.InOut)
});

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceYJ);