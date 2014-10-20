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
    this.hemisphereLeft = new THREE.Mesh(new THREE.SphereGeometry(0.15, 300, 300, Math.PI*2, Math.PI/2), this.lightMaterial);
    this.hemisphereRight = new THREE.Mesh(new THREE.SphereGeometry(0.15, 300, 300, Math.PI/2, Math.PI), this.lightMaterial);

    this.sphere = new THREE.Object3D();
    this.sphere.add(this.hemisphereLeft);
    this.sphere.add(this.hemisphereRight);

    this.scene.add(this.sphere);
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

sequenceDH.addEvent('00:17:05', function () {
    sequenceDH.nextScene(sequenceDH.scene, sequenceDH.camera, true, true, 0, 1);
});

var glitchDH = new Glitch ('DAN HON', 0, 75);
/*sequenceDH.addEvent('00:20:15', function() {glitchDH.animateIn()});
sequenceDH.addEvent('00:26:15', function() {glitchDH.animateOut()})*/


/*var glitchDH = new Glitch ('SPEAKER NAME', 0, -150);*/
/*sequenceDH.addEvent('00:01:00', function() {glitchDH.animateIn()});
sequenceDH.addEvent('00:06:00', function() {glitchDH.animateOut()});*/

// Ball Drop
sequenceDH.addEvent('00:17:05', function () {
    sequenceDH.bounceSphere(sequenceDH.sphere, -this.screenDimensions[1]/2, 1450, TWEEN.Easing.Exponential.InOut);
});

/*SequenceDH.addEvent('00:17:15', function () {
    SequenceDH.cameraMovement(SequenceDH.camera, false, 0, 10, 0, 1250, TWEEN.Easing.Exponential.InOut);
});*/

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceDH);