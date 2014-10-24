/******************************
* Extend Scene Prototype
******************************/
var sequenceYJ = function() {
    this.sequence = [];
    this.init();
};

sequenceYJ.prototype = new Sequence();

sequenceYJ.prototype.init = function() {
    // Scene
    this.scene = sequenceJM.scene;

    // Camera
    this.camera = sequenceJM.camera;
    this.screenDimensions = Util.getScreenDimensions(this.camera);

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
    this.tetrahedronScale = 2.5;
    this.tetrahedron = new TetrahedronMesh(this.tetrahedronScale);
    this.tetrahedron.rotation.x = Util.toRadians(-85);
    //this.tetrahedron.position.y = -this.screenDimensions[1]/tetrahedronScale;

    this.tetrahedron.children[1].rotateOnAxis(Util.getVector(270), Util.toRadians(-109.5));
    this.tetrahedron.children[2].rotateOnAxis(Util.getVector(270), Util.toRadians(-109.5));
    this.tetrahedron.children[3].rotateOnAxis(Util.getVector(270), Util.toRadians(-109.5));

    this.tetrahedron.children[1].children[0].material.opacity = 0;
    this.tetrahedron.children[2].children[0].material.opacity = 0;
    this.tetrahedron.children[3].children[0].material.opacity = 0;

    this.tetrahedron.visible = false;
    this.scene.add(this.tetrahedron);

    // Emitter
    this.emitter = new Emitter();
    this.scene.add(this.emitter.group);

    // Material
    var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('shared/img/light.png'),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false
    });

    // Add lightbeam
    this.triangleShape = new TriangleShape(2.5);
    this.extrusionSettings = {bevelEnabled: false, material: 0, amount: 1};
    this.extrusionGeometry = new THREE.ExtrudeGeometry( this.triangleShape, this.extrusionSettings );
    this.lightbeam = new THREE.Mesh(this.extrusionGeometry, material);
    this.lightbeam.rotation.x = Util.toRadians(-90);
    this.lightbeam.rotation.z = Util.toRadians(180);
    this.lightbeam.scale.set(1, 1, 0);
    this.lightbeam.visible = false;
    this.scene.add(this.lightbeam);
};

/******************************
* Create Animations
******************************/
sequenceYJ.prototype.unFold = function(tetrahedronFace, rotation, axis, duration, easing) {
    var prevRotation = -109.45;

    new TWEEN.Tween({rotation: prevRotation})
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

sequenceYJ.prototype.rotateTetrahedron = function(tetrahedron, rotation, duration, easing) {
    new TWEEN.Tween({rotation: tetrahedron.rotation.x})
        .to({rotation: rotation}, duration)
        .easing(easing)
        .onUpdate(function () {
            tetrahedron.rotation.x = this.rotation;
        })
    .start();
};

sequenceYJ.prototype.lightBeam = function(lightBeam, scale, duration, easing) {
    lightBeam.visible = true;

    new TWEEN.Tween({scale: 0, opacity: 0})
        .to({scale: scale, opacity: 1}, duration)
        .easing(easing)
        .onUpdate(function () {
            lightBeam.scale.set(1, 1, this.scale);
            lightBeam.material.opacity = this.opacity;
        })
    .start();
};

sequenceYJ.prototype.update = function(delta) {
    this.emitter.update(delta);
};

/******************************
* Add Events
******************************/
var sequenceYJ = new sequenceYJ();

/*sequenceYJ.addEvent('00:23:00', function () {
    sequenceJM.nextScene(sequenceJM.scene, sequenceJM.camera, false, false, false, false);
});*/

/*var glitchYJ = new Glitch ('YOUNGHEE JUNG', 0, -150);
sequenceYJ.addEvent('00:05:00', function() {glitchYJ.animateIn()});
sequenceYJ.addEvent('00:10:00', function() {glitchYJ.animateOut()});*/

var glitchJM = new Glitch ('JOHNNY MACK', 0, 145);
sequenceJM.addEvent('00:23:15', function() {glitchJM.animateIn()});
sequenceJM.addEvent('00:27:20', function() {glitchJM.animateOut()});


var glitchYJ = new Glitch ('YOUNGHEE JUNG', 300, -175);
sequenceYJ.addEvent('00:32:00', function() {glitchYJ.animateIn()});
sequenceYJ.addEvent('00:37:15', function() {glitchYJ.animateOut()});

// Fade with Tetrahedron
sequenceYJ.addEvent('00:28:25', function () {
    this.tetrahedron.visible = true;

    sequenceYJ.fade(sequenceYJ.tetrahedron.children[1].children[0], 1, 250, TWEEN.Easing.Linear.None);
    sequenceYJ.fade(sequenceYJ.tetrahedron.children[2].children[0], 1, 250, TWEEN.Easing.Linear.None);
    sequenceYJ.fade(sequenceYJ.tetrahedron.children[3].children[0], 1, 250, TWEEN.Easing.Linear.None);
});

for (var i=0; i<sequenceJM.lines.length; i++) {
    sequenceJM.addEvent('00:28:25', sequenceJM.fade, [sequenceJM.lines[i], 0, 250, TWEEN.Easing.Linear.None]);
}

// Move camera
sequenceYJ.addEvent('00:28:00', sequenceYJ.rotate, [sequenceYJ.camera, Util.toRadians(-20), 0, 0, 5000, TWEEN.Easing.Exponential.InOut]);
sequenceYJ.addEvent('00:28:00', sequenceYJ.cameraMovement, [sequenceYJ.camera, false, 0, -sequenceYJ.screenDimensions[1]/sequenceYJ.tetrahedronScale - 1, 2, 5000, TWEEN.Easing.Exponential.InOut]);
sequenceYJ.addEvent('00:28:00', function () {
    sequenceYJ.rotateTetrahedron(sequenceYJ.tetrahedron, Util.toRadians(-90), 5000, TWEEN.Easing.Exponential.InOut);
});

/*sequenceYJ.addEvent('00:28:20', function () {
    sequenceYJ.position(sequenceYJ.tetrahedron, 0, -3, 0, 10000, TWEEN.Easing.Exponential.InOut);
    sequenceYJ.position(sequenceYJ.lightbeam, 0, -3, 0, 10000, TWEEN.Easing.Exponential.InOut);
});*/


// Open flower
sequenceYJ.addEvent('00:30:20', function () {
    sequenceYJ.unFold(sequenceYJ.tetrahedron.children[1], 0, Util.getVector(270), 2000, TWEEN.Easing.Exponential.InOut);
    sequenceYJ.unFold(sequenceYJ.tetrahedron.children[2], 0, Util.getVector(270), 2000, TWEEN.Easing.Exponential.InOut);
    sequenceYJ.unFold(sequenceYJ.tetrahedron.children[3], 0, Util.getVector(270), 2000, TWEEN.Easing.Exponential.InOut);
});

sequenceYJ.addEvent('00:30:15', function () {
    sequenceYJ.fade(sequenceYJ.tetrahedron.children[1].children[1], 1, 750, TWEEN.Easing.Quadratic.InOut);
    sequenceYJ.fade(sequenceYJ.tetrahedron.children[2].children[1], 1, 750, TWEEN.Easing.Quadratic.InOut);
    sequenceYJ.fade(sequenceYJ.tetrahedron.children[3].children[1], 1, 750, TWEEN.Easing.Quadratic.InOut);
});

// Light
sequenceYJ.addEvent('00:30:15', function () {
    sequenceYJ.lightBeam(sequenceYJ.lightbeam, this.screenDimensions[1]/2 + 4, 2500, TWEEN.Easing.Exponential.InOut);
});

// Flickr
for (var i=0; i<150; i++) {
    sequenceYJ.addEvent(31.75 + i*0.10, function () {
        sequenceYJ.fade(sequenceYJ.lightbeam, Math.random() * 0.2 + 0.8, 25, TWEEN.Easing.Exponential.InOut);
    });
}


// Pull focus
sequenceYJ.addEvent('00:31:10', sequenceYJ.pullFocus, [renderator, 3, 0.5, 4500, TWEEN.Easing.Quadratic.InOut]);


//sequenceYJ.addEvent('00:34:25', sequenceYJ.cameraMovement, [sequenceYJ.camera, false, 0, 0, 1, 20000, TWEEN.Easing.Exponential.InOut]);

sequenceYJ.addEvent('00:30:15', function () {
    sequenceYJ.emitter.trigger();
});

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceYJ);