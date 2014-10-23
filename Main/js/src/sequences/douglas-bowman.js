/******************************
* Extend Scene Prototype
******************************/
var SequenceDB = function() {
    this.sequence = [];
    this.init();
};

SequenceDB.prototype = new Sequence();

SequenceDB.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);
    this.camera.setLens(18);
    this.camera.position.y = 2;
    this.camera.position.z = -3;

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

    this.ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(this.ambientLight);

    // Particulator
    /*this.particulator = new Particulator(50, 200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera);
    this.scene.add(this.particulator.pointCloud);*/

    /******************************
    * Add Objects
    ******************************/
    this.asteroids1 = new AsteroidsMesh(4, 4, 0, true);
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
SequenceDB.prototype.rotateAsteroidsMesh = function(asteroids, spin, duration, easing) {
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
var sequenceDB = new SequenceDB();

sequenceDB.addEvent('00:49:05', function () {
    var options = {
        postProcessEnabled      : true,

        blurEnabled             : true,
        blurAmount              : 2,
        blurPosition            : 0.6,

        bloomEnabled            : false,
        aaEnabled               : true
    }

    sequenceDB.nextScene(sequenceDB.scene, sequenceDB.camera, options);
})

var glitchDB = new Glitch ('DOUGLAS BOWMAN', -400, 120);
sequenceDB.addEvent('00:54:00', function() {glitchDB.animateIn()});
sequenceDB.addEvent('00:60:00', function() {glitchDB.animateOut()})

sequenceDB.addEvent('00:48:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids1, Util.toRadians(115), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:48:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids2, Util.toRadians(180), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:48:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids3, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:48:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids4, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:48:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids5, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:48:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids6, Util.toRadians(180), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:48:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids7, Util.toRadians(45), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:48:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids8, Util.toRadians(45), 20000, TWEEN.Easing.Cubic.In);
});

// Camera
sequenceDB.addEvent('00:60:00', function() {
    sequenceDB.cameraMovement(sequenceDB.camera, false, 0, -50, 3, 3000, TWEEN.Easing.Exponential.InOut);
});

sequenceDB.addEvent('00:59:25', sequenceDB.rotate, [sequenceDB.camera, Util.toRadians(-90), 0, 0, 3000, TWEEN.Easing.Exponential.InOut]);





sequenceDB.addEvent('01:02:03', function() {
    sequenceDB.fade(sequenceDB.asteroids1.children[0], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids1.children[1], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids1.children[2], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids1.children[3], 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceDB.fade(sequenceDB.asteroids2.children[0], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids2.children[1], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids2.children[2], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids2.children[3], 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceDB.fade(sequenceDB.asteroids3.children[0], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids3.children[1], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids3.children[2], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids3.children[3], 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceDB.fade(sequenceDB.asteroids4.children[0], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids4.children[1], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids4.children[2], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids4.children[3], 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceDB.fade(sequenceDB.asteroids5.children[0], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids5.children[1], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids5.children[2], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids5.children[3], 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceDB.fade(sequenceDB.asteroids6.children[0], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids6.children[1], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids6.children[2], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids6.children[3], 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceDB.fade(sequenceDB.asteroids7.children[0], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids7.children[1], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids7.children[2], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids7.children[3], 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceDB.fade(sequenceDB.asteroids8.children[0], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids8.children[1], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids8.children[2], 0, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceDB.fade(sequenceDB.asteroids8.children[3], 0, 1000, TWEEN.Easing.Exponential.InOut);

    // Pull focus
    sequenceDB.pullFocus(renderator, 0, 0.5, 1500, TWEEN.Easing.Quadratic.InOut);
});






/******************************
* Add to Timeline
******************************/
timeline.push(sequenceDB);