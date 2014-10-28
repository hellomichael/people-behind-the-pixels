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
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    this.camera.setLens(18);
    this.camera.position.set(0, 0, 50);
    this.camera.rotation.y = Util.toRadians(105);

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

    this.ambientLight = new THREE.AmbientLight(0x666666);
    this.scene.add(this.ambientLight);

    // Particulator
    this.particulator = new Particulator(75, 200, new THREE.Vector3(-0.5, 0.5, -0.5), THREE.ImageUtils.loadTexture('shared/img/particle.png'), this.camera, 1);
    this.particulator.material.opacity = 0;
    this.scene.add(this.particulator.pointCloud);

    /******************************
    * Add Objects
    ******************************/
    this.asteroids1 = new AsteroidsMesh(0, 4, 0, true);
    this.asteroids2 = new AsteroidsMesh(4, 8, 0, true);

    this.asteroids3 = new AsteroidsMesh(4, 12, 90, true);
    this.asteroids4 = new AsteroidsMesh(4, 12, 240, false);

    this.asteroids5 = new AsteroidsMesh(4, 16, 180, true);

    this.asteroids6 = new AsteroidsMesh(4, 20, 270, true);
    this.asteroids7 = new AsteroidsMesh(4, 20, 75, false);
    this.asteroids8 = new AsteroidsMesh(4, 20, 0, false);

    //this.camera.lookAt(this.asteroids1.position);

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
    if (asteroids.count) {
        var asteroid1 = asteroids.children[0];
        var asteroid2 = asteroids.children[1];
        var asteroid3 = asteroids.children[2];
        var asteroid4 = asteroids.children[3];

        new TWEEN.Tween({x: asteroid1.rotation.x, y: asteroid1.rotation.y, z: asteroid1.rotation.z})
            .to({x: Util.toRadians(-360), y: Util.toRadians(-360), z: Util.toRadians(-360)}, duration)
            .onUpdate(function () {
                asteroid1.rotation.x = this.x;
                asteroid1.rotation.y = this.y;
                asteroid1.rotation.z = this.z;
            })
        .start();

        new TWEEN.Tween({x: asteroid2.rotation.x, y: asteroid2.rotation.y, z: asteroid2.rotation.z})
            .to({x: Util.toRadians(-360), y: Util.toRadians(-360), z: Util.toRadians(-360)}, duration)
            .onUpdate(function () {
                asteroid2.rotation.x = this.x;
                asteroid2.rotation.y = this.y;
                asteroid2.rotation.z = this.z;
            })
        .start();

        new TWEEN.Tween({x: asteroid3.rotation.x, y: asteroid3.rotation.y, z: asteroid3.rotation.z})
            .to({x: Util.toRadians(-360), y: Util.toRadians(-360), z: Util.toRadians(-360)}, duration)
            .onUpdate(function () {
                asteroid3.rotation.x = this.x;
                asteroid3.rotation.y = this.y;
                asteroid3.rotation.z = this.z;
            })
        .start();

        new TWEEN.Tween({x: asteroid4.rotation.x, y: asteroid4.rotation.y, z: asteroid4.rotation.z})
            .to({x: Util.toRadians(-360), y: Util.toRadians(-360), z: Util.toRadians(-360)}, duration)
            .onUpdate(function () {
                asteroid4.rotation.x = this.x;
                asteroid4.rotation.y = this.y;
                asteroid4.rotation.z = this.z;
            })
        .start();
    }
};

/******************************
* Add Events
******************************/
var sequenceTA = new SequenceTA();

sequenceTA.addEvent('00:45:02', function () {
    var options = {
        postProcessEnabled      : true,

        blurEnabled             : true,
        blurAmount              : 7,
        blurPosition            : 0.5,

        bloomEnabled            : false,
        noiseEnabled            : true,
        aaEnabled               : true
    }

    sequenceTA.nextScene(sequenceTA.scene, sequenceTA.camera, options);
})

var glitchTA = new Glitch ('TOM ARMITAGE', 0, -window.innerHeight/4 - 50);
sequenceTA.addEvent('00:45:10', function() {glitchTA.animateIn()});
sequenceTA.addEvent('00:49:20', function() {glitchTA.animateOut()})

sequenceTA.addEvent('00:46:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids1, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:46:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids2, Util.toRadians(110), 20000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:46:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids3, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:46:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids4, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:46:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids5, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:46:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids6, Util.toRadians(45), 20000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:46:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids7, Util.toRadians(75), 20000, TWEEN.Easing.Cubic.In);
});

sequenceTA.addEvent('00:46:00', function() {
    sequenceTA.rotateAsteroidsMesh(sequenceTA.asteroids8, Util.toRadians(45), 20000, TWEEN.Easing.Cubic.In);
});

// Camera
sequenceTA.addEvent('00:41:05', function() {
    sequenceTA.cameraMovement(sequenceTA.camera, false, 0, -15, -15, 7500, TWEEN.Easing.Exponential.InOut, function () {
        sequenceTA.cameraMovement(sequenceTA.camera, false, 0, 0, -5, 7500, TWEEN.Easing.Linear.None);
        sequenceTA.rotate(sequenceTA.camera, Util.toRadians(-30), 0, 0, 7500, TWEEN.Easing.Linear.None);
    });
});

sequenceTA.addEvent('00:41:20', sequenceTA.rotate, [sequenceTA.camera, Util.toRadians(-25), 0, 0, 7500, TWEEN.Easing.Exponential.InOut]);

sequenceTA.addEvent('00:43:25', function() {
    sequenceTA.fade(sequenceTA.particulator, 0.2, 2500, TWEEN.Easing.Exponential.InOut);
});

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceTA);