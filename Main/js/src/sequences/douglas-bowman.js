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
    this.camera.position.y = 2;
    this.camera.position.z = -4;

    this.screenDimensions = Util.getScreenDimensions(this.camera, 0, 4);
    this.camera.setLens(18);

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
    this.particulator = new Particulator(75, 200, new THREE.Vector3(-1, 1, -1), THREE.ImageUtils.loadTexture('shared/img/particle.png'), this.camera, 1);
    this.particulator.material.opacity = 0.3;
    this.scene.add(this.particulator.pointCloud);

    /******************************
    * Add Objects
    ******************************/
    this.asteroids1 = new AsteroidsMesh(4, 5, 0, true);
    this.asteroids2 = new AsteroidsMesh(4, 8, 0, true);

    this.asteroids3 = new AsteroidsMesh(4, 11, 90, true);
    this.asteroids4 = new AsteroidsMesh(4, 11, 240, false);

    this.asteroids5 = new AsteroidsMesh(4, 14, 180, true);

    this.asteroids6 = new AsteroidsMesh(4, 17, 270, true);
    this.asteroids7 = new AsteroidsMesh(4, 17, 75, false);
    this.asteroids8 = new AsteroidsMesh(4, 17, 0, false);

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
var sequenceDB = new SequenceDB();

sequenceDB.addEvent('00:53:22', function () {
    var options = {
        postProcessEnabled      : true,

        blurEnabled             : true,
        blurAmount              : 8,
        blurPosition            : 0.5,

        bloomEnabled            : false,
        noiseEnabled            : true,
        aaEnabled               : true
    }

    sequenceDB.nextScene(sequenceDB.scene, sequenceDB.camera, options);
})

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.fade(sequenceDB.particulator, 0.2, 2500, TWEEN.Easing.Exponential.InOut);
});

// Pull focus
sequenceDB.addEvent('00:55:05', function() {
    sequenceDB.pullFocus(renderator, 0, 0.5, 4500, TWEEN.Easing.Quadratic.InOut);
});

var glitchDB = new Glitch ('DOUGLAS BOWMAN', -400, 135);
sequenceDB.addEvent('00:50:05', function() {glitchDB.animateIn()});
sequenceDB.addEvent('00:55:15', function() {glitchDB.animateOut()})

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids1, Util.toRadians(115), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids2, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids3, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids4, Util.toRadians(50), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids5, Util.toRadians(90), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids6, Util.toRadians(50), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids7, Util.toRadians(45), 20000, TWEEN.Easing.Cubic.In);
});

sequenceDB.addEvent('00:50:00', function() {
    sequenceDB.rotateAsteroidsMesh(sequenceDB.asteroids8, Util.toRadians(45), 20000, TWEEN.Easing.Cubic.In);
});

// Camera Out
sequenceDB.addEvent('00:58:00', function() {
    sequenceDB.cameraMovement(sequenceDB.camera, false, 0, -25, 4, 3000, TWEEN.Easing.Exponential.InOut);
});

sequenceDB.addEvent('00:57:25', sequenceDB.rotate, [sequenceDB.camera, Util.toRadians(-90), 0, 0, 3000, TWEEN.Easing.Exponential.InOut]);


var glitchST = new Glitch ('SCOTT THOMAS', 315, 0);
sequenceDB.addEvent('00:56:00', function() {glitchST.animateIn()});
sequenceDB.addEvent('01:00:10', function() {glitchST.animateOut()});

sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids3.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids7.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids6.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids8.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids8.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids4.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids3.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids2.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids2.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids2.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids5.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids1.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids6.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids3.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids7.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids1.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids4.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids4.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids2.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids3.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids5.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids1.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids5.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids8.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids6.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids4.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids8.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids6.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids5.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids6.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids6.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids7.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids1.children[3], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids7.children[0], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids6.children[2], 0, 1000, TWEEN.Easing.Bounce.InOut);});
sequenceDB.addEvent('01:00:10', function() {sequenceDB.fade(sequenceDB.asteroids6.children[1], 0, 1000, TWEEN.Easing.Bounce.InOut);});

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceDB);