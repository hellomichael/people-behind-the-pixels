/*/******************************
* Extend Scene Prototype
******************************/
var SequenceEN = function() {
    this.sequence = [];
    this.init();
};

SequenceEN.prototype = new Sequence();

SequenceEN.prototype.init = function() {
    // Scene
    this.scene = sequenceGP.scene;
    this.camera = sequenceGP.camera;

    // Materials
    this.triangleMaterial1 = new THREE.MeshBasicMaterial({color: 0x222222, opacity: 0, transparent: true, side: THREE.DoubleSide});
    this.triangleMaterial2 = new THREE.MeshBasicMaterial({color: 0x111111, opacity: 0, transparent: true, side: THREE.DoubleSide});
    this.triangleMaterial3 = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0, transparent: true, side: THREE.DoubleSide});
    this.triangleMaterial4 = new THREE.MeshBasicMaterial({color: 0x666666, opacity: 0, transparent: true,  side: THREE.DoubleSide});

    this.basicMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, opacity: 1, transparent: true, vertexColors: THREE.FaceColors, side: THREE.FrontSide});
    this.lineMaterial  = new THREE.MeshBasicMaterial ({color: 'white',  opacity: 1, transparent: true, side:THREE.DoubleSide, wireframe : true});

    /******************************
    * Add Objects
    ******************************/
    this.pyramidColors = [0xADACB1, 0x4D4D4D, 0x000000, 0xDEDEDE];

    // Triangles
    this.triangleGeometry = new THREE.Geometry();
    this.triangleGeometry.frustumCulled = false;

    this.triangleGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
    this.triangleGeometry.vertices.push(new THREE.Vector3(-0.95, -0.95, 0.0));
    this.triangleGeometry.vertices.push(new THREE.Vector3( 0.95, -0.95, 0.0));
    this.triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

    this.triangle1 = new THREE.Mesh(this.triangleGeometry, this.lineMaterial);
    this.triangle2 = new THREE.Mesh(this.triangleGeometry, this.lineMaterial);
    this.triangle3 = new THREE.Mesh(this.triangleGeometry, this.lineMaterial);
    this.triangle4 = new THREE.Mesh(this.triangleGeometry, this.lineMaterial);

    this.triangle1.position.set(0, 0, 5);
    this.triangle2.position.set(0, 0, 5);
    this.triangle3.position.set(0, 0, 5);
    this.triangle4.position.set(0, 0, 5);

    this.triangle1.rotation.z = Util.toRadians(45);
    this.triangle2.rotation.z = Util.toRadians(135);
    this.triangle3.rotation.z = Util.toRadians(225);
    this.triangle4.rotation.z = Util.toRadians(315);


    this.triangleGroup = new THREE.Object3D();

    this.triangleGroup.add(this.triangle1);
    this.triangleGroup.add(this.triangle2);
    this.triangleGroup.add(this.triangle3);
    this.triangleGroup.add(this.triangle4);


    this.triangleGroup.rotation.x = Util.toRadians(90);
    this.triangleGroup.rotation.z = Util.toRadians(90);

    this.scene.add(this.triangleGroup);

    // Pyramid
    this.pyramidGeometry = new THREE.CylinderGeometry(0, 3, 2, 4, false);

    this.pyramidGeometry.faces[5].color = new THREE.Color(this.pyramidColors[0]);
    this.pyramidGeometry.faces[7].color = new THREE.Color(this.pyramidColors[2]);
    this.pyramidGeometry.faces[10].color = new THREE.Color(this.pyramidColors[1]);
    this.pyramidGeometry.faces[1].color = new THREE.Color(this.pyramidColors[3]);

    this.pyramid = new THREE.Mesh(this.pyramidGeometry, this.basicMaterial);
    this.pyramid.scale.set(0.3, 0.3, 0.3);
    //this.pyramid.rotation.y = Util.toRadians(45);
    this.pyramid.position.set(0, -1, 0);

    this.pyramid.visible = false;
    this.triangleGroup.visible = false;

    this.pyramid.rotation.x = Util.toRadians(-90);
    this.pyramid.rotation.y = Util.toRadians(-90);

    this.scene.add(this.pyramid);
};

/******************************
* Add Animations
******************************/
SequenceEN.prototype.scale = function(line, scaleTargetX, scaleTargetY, duration, easing) {
    new TWEEN.Tween({scaleX: line.scale.x, scaleY: line.scale.y})
        .to({scaleX: scaleTargetX, scaleY: scaleTargetY}, duration)
        .easing(easing)
        .onUpdate(function () {
            line.scale.x = this.scaleX;
            line.scale.y = this.scaleY;
        })
    .start();
};

/******************************
* Initialize New Scene
******************************/
var sequenceEN = new SequenceEN();

/******************************
* Add Sequences
******************************/
//Rotate Pyramid
sequenceEN.addEvent('01:46:25', sequenceEN.rotate, [sequenceEN.pyramid, Util.toRadians(0), Util.toRadians(0), 0, 6000, TWEEN.Easing.Exponential.InOut]);

sequenceEN.addEvent('01:50:00', function () {
    sequenceGP.pyramidGroup.visible = false;
    sequenceEN.pyramid.visible = true;
});

sequenceEN.addEvent('01:48:00', function () {
    sequenceEN.cameraMovement(sequenceEN.camera, false, 0, -5, -3, 4000, TWEEN.Easing.Exponential.InOut);
});


sequenceEN.addEvent('01:48:15', function () {
    sequenceEN.rotate(sequenceEN.camera, Util.toRadians(-90), 0, 0, 4000, TWEEN.Easing.Exponential.InOut);
});

sequenceGP.addEvent('01:48:25', function() {
    sequenceGP.pullFocus(renderator, 1, 0.5, 4500, TWEEN.Easing.Quadratic.InOut);
});


var glitchEN = new Glitch ('EMILY NAKASHIMA', -400, 0);
sequenceEN.addEvent('01:50:00', function() {glitchEN.animateIn()});
sequenceEN.addEvent('01:54:15', function() {glitchEN.animateOut()})


// Slice Pyramid
sequenceEN.addEvent('01:53:00', function () {
    $('.vertical-dashed-top').addClass('slice');
    $('.vertical-dashed-bottom').addClass('slice');

    $('.horizontal-dashed-left').addClass('slice');
    $('.horizontal-dashed-right').addClass('slice');
});

sequenceEN.addEvent('01:53:15', function () {
    $('.vertical-dashed-top').addClass('hide');
    $('.vertical-dashed-bottom').addClass('hide');

    $('.horizontal-dashed-left').addClass('hide');
    $('.horizontal-dashed-right').addClass('hide');
});

// Fade
sequenceEN.addEvent('01:53:15', function () {
    sequenceEN.fade(sequenceEN.pyramid, 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceEN.fade(sequenceEN.triangle1, 1, 250, TWEEN.Easing.Exponential.InOut);
    sequenceEN.fade(sequenceEN.triangle2, 1, 250, TWEEN.Easing.Exponential.InOut);
    sequenceEN.fade(sequenceEN.triangle3, 1, 250, TWEEN.Easing.Exponential.InOut);
    sequenceEN.fade(sequenceEN.triangle4, 1, 250, TWEEN.Easing.Exponential.InOut);

});

// Position
sequenceEN.addEvent('01:53:25', function () {
    this.triangleGroup.visible = true;

    sequenceEN.position(sequenceEN.triangle1, 2  , -2  ,5, 2000,  TWEEN.Easing.Exponential.Out);
    sequenceEN.position(sequenceEN.triangle2, 2  , 2  ,5, 2000,  TWEEN.Easing.Exponential.Out);
    sequenceEN.position(sequenceEN.triangle3, -2  , 2  ,5, 2000,  TWEEN.Easing.Exponential.Out);
    sequenceEN.position(sequenceEN.triangle4, -2  , -2  ,5, 2000,  TWEEN.Easing.Exponential.Out);
});


// Fade
sequenceEN.addEvent('01:53:25', function () {
    sequenceEN.fade(sequenceEN.triangle1, 0, 2000, TWEEN.Easing.Quadratic.InOut);
    sequenceEN.fade(sequenceEN.triangle2, 0, 2000, TWEEN.Easing.Quadratic.InOut);
    sequenceEN.fade(sequenceEN.triangle3, 0, 2000, TWEEN.Easing.Quadratic.InOut);
    sequenceEN.fade(sequenceEN.triangle4, 0, 2000, TWEEN.Easing.Quadratic.InOut);
});


/******************************
* Add Sequences
******************************/
timeline.push(sequenceEN);