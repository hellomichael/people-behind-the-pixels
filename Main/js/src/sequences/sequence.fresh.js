/******************************
* Extend Scene Prototype
******************************/
var SequenceWD = function() {
    this.sequence = [];
    this.init();
};

SequenceWD.prototype = new Sequence();

SequenceWD.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 5, 1000);
    this.camera.position.z = 10;

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
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.lightMaterial);
    this.scene.add(this.cube);
};

/******************************
* Create Animations
******************************/
/*SequenceWD.prototype.animateSomething = function(object, opacity, duration, easing) {
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
var sequenceWD = new SequenceWD();

/******************************
* Add Events
******************************/
var glitchWD = new Glitch ('SPEAKER NAME', 0, -150);
sequenceWD.addEvent('00:01:00', function() {glitchWD.animateIn()});
sequenceWD.addEvent('00:06:00', function() {glitchWD.animateOut()});

sequenceWD.addEvent('00:00:00', function () {
    sequenceWD.animateSomething(sequenceWD.cube, 1, 1000, TWEEN.Easing.Exponential.InOut);
});

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceWD);