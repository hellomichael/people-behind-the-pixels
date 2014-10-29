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

    //this.camera.rotation.x = Util.toRadians(-45);
    this.camera.position.y = 0;
    this.camera.position.z = 0;

    // Audio
    this.spaceAudio = new Audio('shared/audio/space.mp3');
    this.lightWooshAudio = new Audio('shared/audio/light-woosh.mp3')

    // Particulator
    this.particulator = new Particulator(75, 150, new THREE.Vector3(-0.5, 0.5, -0.5), THREE.ImageUtils.loadTexture('shared/img/particle.png'), this.camera, 1);
    this.particulator.material.opacity = 0;
    this.scene.add(this.particulator.pointCloud);

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(-100, 1000, 600).normalize();
    this.scene.add(this.directionalLight);

    /*this.directionalLight2 = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight2.position.set(100, -1000, -600).normalize();
    this.scene.add(this.directionalLight2);*/

    this.ambientLight = new THREE.AmbientLight(0x888888);
    this.scene.add(this.ambientLight);

    /******************************
    * Add Objects
    ******************************/
    // Create pyramid
    this.pyramidHeight = 10;
    this.pyramidGroup = new THREE.Object3D();

    for (var i=this.pyramidHeight; i>0; i--) {

        var pyramidPlane = new THREE.Object3D();

        for (var j=0; j<i; j++) {
            for (var k=0; k<i; k++) {
                var cube = new CubeMesh(1);
                cube.position.set(j - i/2 + 0.5, -i + (this.pyramidHeight)/2, k - i/2 + 0.5);
                pyramidPlane.add(cube);
            }

            this.pyramidGroup.add(pyramidPlane);
        }
    }

    this.pyramidGroup.scale.set(0.13, 0.13, 0.13);
    this.pyramidGroup.position.y = -1;
    this.scene.add(this.pyramidGroup);

    this.numberOfCubes = this.pyramidGroup.children.length;

    //var controls = new THREE.OrbitControls(this.camera);
};

/******************************
* Initialize New Scene
******************************/
var sequenceGP = new SequenceGP();

sequenceGP.addEvent('01:26:10', function () {
    var options = {
        postProcessEnabled      : true,

        blurEnabled             : true,
        blurAmount              : 5,
        blurPosition            : 0.5,

        bloomEnabled            : false,
        noiseEnabled            : true,
        aaEnabled               : true
    }

    sequenceGP.nextScene(sequenceGP.scene, sequenceGP.camera, options);

    sequenceGP.fade(sequenceGP.particulator, 0.4, 1500, TWEEN.Easing.Bounce.InOut);
});


/******************************
* Add Events
******************************/
sequenceGP.addEvent('01:27:12', function () {
    // this.spaceAudio.play();
    this.lightWooshAudio.play();
});

sequenceGP.addEvent('01:34:00', function () {
    this.spaceAudio.play();
    // this.lightWooshAudio.play();
});


sequenceGP.addEvent('01:23:10', function () {
    sequenceGP.camera.rotation.x = Util.toRadians(-180);

    sequenceGP.rotate(sequenceGP.camera, Util.toRadians(-90), 0, 0, 7500, TWEEN.Easing.Exponential.InOut);

    sequenceGP.cameraMovement(sequenceGP.camera, false, 0, -26, 0, 10000, TWEEN.Easing.Exponential.InOut, function () {
        sequenceGP.rotate(sequenceGP.pyramidGroup, 0, Util.toRadians(45), 0, 7500, TWEEN.Easing.Exponential.InOut);
        sequenceGP.rotate(sequenceGP.camera, Util.toRadians(5), 0, 0, 7500, TWEEN.Easing.Exponential.InOut);
        sequenceGP.cameraMovement(sequenceGP.camera, false, 0, 26 + 0.6, 3, 7500, TWEEN.Easing.Exponential.InOut);
    });
});

// Add cubes randomly
for (var i=sequenceGP.pyramidHeight-1; i>=0; i--) {
    for (var j=sequenceGP.pyramidGroup.children[i].children.length-1; j>=0; j--) {
        var randomY = _.random(50, 200);

        // Set random position
        sequenceGP.pyramidGroup.children[i].children[j].originalVertices = [
            sequenceGP.pyramidGroup.children[i].children[j].position.x,
            sequenceGP.pyramidGroup.children[i].children[j].position.y,
            sequenceGP.pyramidGroup.children[i].children[j].position.z
        ];

        // Cache original position
        sequenceGP.pyramidGroup.children[i].children[j].position.y += randomY;
    }
}

sequenceGP.addEvent('01:37:00', function () {
    for (var i=sequenceGP.pyramidHeight-1; i>=0; i--) {
        for (var j=sequenceGP.pyramidGroup.children[i].children.length-1; j>=0; j--) {
            sequenceGP.position(sequenceGP.pyramidGroup.children[i].children[j],
            sequenceGP.pyramidGroup.children[i].children[j].originalVertices[0],
            sequenceGP.pyramidGroup.children[i].children[j].originalVertices[1],
            sequenceGP.pyramidGroup.children[i].children[j].originalVertices[2],
            6000, TWEEN.Easing.Quadratic.Out);
        }
    }
});

// Pull focus
sequenceGP.addEvent('01:36:25', function() {
    sequenceGP.pullFocus(renderator, 2, 0.4, 4500, TWEEN.Easing.Quadratic.InOut);
});


var glitchGP = new Glitch ('GUY PODJARNY', 400, 0);
sequenceGP.addEvent('01:28:00', function() {glitchGP.animateIn()});
sequenceGP.addEvent('01:32:10', function() {glitchGP.animateOut()});

var glitchJC = new Glitch ('JONATHON COLMAN', 400, 0);
sequenceGP.addEvent('01:32:10', function() {glitchJC.animateIn()});
sequenceGP.addEvent('01:36:10', function() {glitchJC.animateOut()});

var glitchKM = new Glitch ('KATIE MILLER', 0, 325);
sequenceGP.addEvent('01:36:10', function() {glitchKM.animateIn()});
sequenceGP.addEvent('01:40:20', function() {glitchKM.animateOut()});


var glitchJCO = new Glitch ('JULIO CESAR ODY', 0, -125);
sequenceGP.addEvent('01:41:05', function() {glitchJCO.animateIn()});
sequenceGP.addEvent('01:46:20', function() {glitchJCO.animateOut()});


// Rotate randomly
for (var i=sequenceGP.pyramidHeight-1; i>=0; i--) {
    sequenceGP.addEvent(103, sequenceGP.rotate, [sequenceGP.pyramidGroup.children[i], 0, Util.toRadians(_.random(-2, 2) * 90 || 90), 0, 2000, TWEEN.Easing.Exponential.InOut]);
    sequenceGP.addEvent(105, sequenceGP.rotate, [sequenceGP.pyramidGroup.children[i], 0, Util.toRadians(_.random(-2, 2) * 90 || 90), 0, 2000, TWEEN.Easing.Exponential.InOut]);
    sequenceGP.addEvent(107, sequenceGP.rotate, [sequenceGP.pyramidGroup.children[i], 0, Util.toRadians(_.random(-2, 2) * 90 || 90), 0, 2000, TWEEN.Easing.Exponential.InOut]);
    sequenceGP.addEvent(109, sequenceGP.rotate, [sequenceGP.pyramidGroup.children[i], 0, Util.toRadians(_.random(-2, 2) * 90 || 90), 0, 2000, TWEEN.Easing.Exponential.InOut]);
    //sequenceGP.addEvent(115, sequenceGP.rotate, [sequenceGP.pyramidGroup.children[i], 0, Util.toRadians(_.random(-2, 2) * 90 || 90), 0, 2000, TWEEN.Easing.Exponential.InOut]);
    //sequenceGP.addEvent(118, sequenceGP.rotate, [sequenceGP.pyramidGroup.children[i], 0, Util.toRadians(_.random(-2, 2) * 90 || 90), 0, 2000, TWEEN.Easing.Exponential.InOut]);
    //sequenceGP.addEvent(121, sequenceGP.rotate, [sequenceGP.pyramidGroup.children[i], 0, Util.toRadians(_.random(-2, 2) * 90 || 90), 0, 2000, TWEEN.Easing.Exponential.InOut]);
}

/*var glitchKM = new Glitch ('KATIE MILLER', -700, -400);
sequenceGP.addEvent('01:15:15', function() {glitchKM.animateIn()});
sequenceGP.addEvent('01:20:15', function() {glitchKM.animateOut()});*/


/******************************
* Add Sequences
******************************/
timeline.push(sequenceGP);