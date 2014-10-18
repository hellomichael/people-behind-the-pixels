/******************************
* Extend Scene Prototype
******************************/
var SequenceTA = function() {
    this.sequence = [];
    this.init();
};

SequenceTA.prototype = new Sequence();

SequenceTA.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 100);
    this.camera.setLens(18);
    this.camera.position.set(15, 10, 75);

    // Renderator
    renderator.reset(this.scene, this.camera,
        {
            postProcessEnabled      : true,

            blurEnabled             : true,
            blurAmount              : 3,
            blurPosition            : false,

            bloomEnabled            : false,
            noiseEnabled            : false,
            aaEnabled               : false
        }
    );

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(0, 1000, 0).normalize();
    this.scene.add(this.directionalLight);

    this.directionalLight2 = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight2.position.set(0, -1000, 0).normalize();
    this.scene.add(this.directionalLight2);

    // Particulator
    this.particulator = new Particulator(50, 200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera);
    this.scene.add(this.particulator.pointCloud);

    /******************************
    * Add Objects
    ******************************/
    this.asteroids1 = new AsteroidsMesh(0, 4, 0, true);
    this.asteroids2 = new AsteroidsMesh(4, 8, 0, true);

    this.asteroids3 = new AsteroidsMesh(3, 12, 90, true);
    this.asteroids4 = new AsteroidsMesh(3, 12, 240, false);

    this.asteroids5 = new AsteroidsMesh(4, 16, 180, true);

    this.asteroids6 = new AsteroidsMesh(3, 20, 270, true);
    this.asteroids7 = new AsteroidsMesh(4, 20, 75, false);
    this.asteroids8 = new AsteroidsMesh(3, 20, 0, false);

    this.camera.lookAt(this.asteroids1.position);

    this.scene.add(this.asteroids1);
    this.scene.add(this.asteroids2);
    this.scene.add(this.asteroids3);
    this.scene.add(this.asteroids4);
    this.scene.add(this.asteroids5);
    this.scene.add(this.asteroids6);
    this.scene.add(this.asteroids7);
    this.scene.add(this.asteroids8);
};

/******************************
* Create Animations
******************************/
SequenceTA.prototype.rotateAsteroidsMesh = function(asteroids, spin, duration, easing) {
    var spinTarget = asteroids.rotation.z + spin;
    var randomWobble = _.random(-0.75, 0.75);

    new TWEEN.Tween({spin: asteroids.rotation.z})
        .to({spin: spinTarget}, duration)
        .onUpdate(function (time) {
            asteroids.rotation.z = this.spin;

            asteroids.rotation.x = Util.toRadians(Math.sin(time*10 * Util.toRadians(180)) * randomWobble + 90);
        })
    .start();

    // Tween each asteroid
    for (var i=1; i < asteroids.children.length-1; i++) {
        var asteroid = asteroids.children[i];

        new TWEEN.Tween({x: asteroid.rotation.x, y: asteroid.rotation.y, z: asteroid.rotation.z})
            .to({x: Util.toRadians(-720), y: Util.toRadians(-720), z: Util.toRadians(-720)}, duration)
            .onUpdate(function () {
                asteroid.rotation.x = this.x;
                asteroid.rotation.y = this.y;
                asteroid.rotation.z = this.z;
            })
        .start();
    }
};

/******************************
* Add Events
******************************/
var sequenceTA = new SequenceTA();


var glitchTA = new Glitch ('TOM ARMITAGE', 0, -window.innerHeight/4 - 50);
sequenceTA.addEvent('00:06:00', function() {glitchTA.animateIn()});
sequenceTA.addEvent('00:12:00', function() {glitchTA.animateOut()})

sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids1, Util.toRadians(0), 30000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids2, Util.toRadians(180), 30000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids3, Util.toRadians(90), 30000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids4, Util.toRadians(90), 30000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids5, Util.toRadians(90), 30000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids6, Util.toRadians(45), 30000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids7, Util.toRadians(45), 30000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids8, Util.toRadians(45), 30000, TWEEN.Easing.Cubic.In);
});


sequenceTA.addEvent('00:00:00', function() {
    sequenceTA.cameraMovement(sequenceTA.camera, sequenceTA.asteroids1, 15, -10, -75, 10000, TWEEN.Easing.Exponential.InOut);
});


/******************************
* Add to Timeline
******************************/
timeline.push(sequenceTA);