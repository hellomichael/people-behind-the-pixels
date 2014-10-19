/******************************
* Extend Scene Prototype
******************************/
var SequenceDH = function() {
    this.sequence = [];
    this.init();
};

SequenceDH.prototype = new Sequence();

SequenceDH.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    this.camera.setLens(35);
    this.camera.position.z = 10;
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
    this.basicMaterial = new THREE.MeshBasicMaterial({color: 0x999999, opacity: 1, transparent: true, side: THREE.DoubleSide});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 0x999999, opacity: 1, transparent: true, side: THREE.DoubleSide});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0x999999);
    this.directionalLight.position.set(0, 10000, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(this.ambientLight);

    /******************************
    * Add Objects
    ******************************/
    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 300, 300), this.lightMaterial);
    this.scene.add(this.sphere);
    this.sphere.position.y = 0;
};

/******************************
* Create Animations
******************************/
/*SequenceDH.prototype.animateSomething = function(object, opacity, duration, easing) {
    new TWEEN.Tween({opacity: 0})
        .to({opacity: opacity}, duration)
        .easing(easing)
        .onUpdate(function (time) {
            object.material.opacity = this.opacity;
        })
    .start();
};*/

SequenceDH.prototype.bounceSphere = function(sphere, position, duration, easing) {
    new TWEEN.Tween({position: sphere.position.y})
        .to({position: position}, duration)
        .easing(easing)
        .onUpdate(function () {
            sphere.position.y = this.position;
        })
        .start();
};

/******************************
* Add Events
******************************/
var sequenceDH = new SequenceDH();

/******************************
* Add Events
******************************/
sequenceDH.addEvent('00:17:15', function () {
    sequenceDH.nextScene(sequenceDH.scene, sequenceDH.camera, true, true, 0, 1);
});

/*var glitchDH = new Glitch ('SPEAKER NAME', 0, -150);*/
/*sequenceDH.addEvent('00:01:00', function() {glitchDH.animateIn()});
sequenceDH.addEvent('00:06:00', function() {glitchDH.animateOut()});*/

// Ball Drop
sequenceDH.addEvent('00:18:00', function () {
    sequenceDH.bounceSphere(sequenceDH.sphere, -4.5, 2000, TWEEN.Easing.Bounce.Out);
});

/*SequenceDH.addEvent('00:17:15', function () {
    SequenceDH.cameraMovement(SequenceDH.camera, false, 0, 10, 0, 1250, TWEEN.Easing.Exponential.InOut);
});*/

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceDH);