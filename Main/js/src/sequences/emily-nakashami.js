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

    // Particulator
    /*this.particulator = new Particulator(80, 1200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera, 1);
    this.scene.add(this.particulator.pointCloud);*/

    // Materials
    this.triangleMaterial1 = new THREE.MeshBasicMaterial({color: 0xdedede, opacity: 0, transparent: true, side: THREE.DoubleSide});
    this.triangleMaterial2 = new THREE.MeshBasicMaterial({color: 0xadacb1, opacity: 0, transparent: true, side: THREE.DoubleSide});
    this.triangleMaterial3 = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0, transparent: true, side: THREE.DoubleSide});
    this.triangleMaterial4 = new THREE.MeshBasicMaterial({color: 0xfefefe, opacity: 0, transparent: true,  side: THREE.DoubleSide});

    this.basicMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, opacity: 1, transparent: true, vertexColors: THREE.FaceColors, side: THREE.FrontSide});
    this.lineMaterial  = new THREE.MeshBasicMaterial ({color: 'white',  opacity: 0, transparent: true, side:THREE.DoubleSide, wireframe : true});

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

    this.scene.add(this.triangle1);
    this.scene.add(this.triangle2);
    this.scene.add(this.triangle3);
    this.scene.add(this.triangle4);

    // Pyramid
    this.pyramidGeometry = new THREE.CylinderGeometry(0, 3, 2, 4, false);

    this.pyramidGeometry.faces[5].color = new THREE.Color(this.pyramidColors[0]);
    this.pyramidGeometry.faces[7].color = new THREE.Color(this.pyramidColors[2]);
    this.pyramidGeometry.faces[10].color = new THREE.Color(this.pyramidColors[1]);
    this.pyramidGeometry.faces[1].color = new THREE.Color(this.pyramidColors[3]);

    this.pyramid = new THREE.Mesh(this.pyramidGeometry, this.basicMaterial);
    this.pyramid.scale.set(0.4, 0.4, 0.4);
    this.pyramid.rotation.y = Util.toRadians(45);
    this.pyramid.position.set(0, -1, 0);

    //this.camera.position.y = 3;

    this.pyramid.visible = false;
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
// var speaker = new Glitch ('SPEAKER NAME', 0, 0);
// sequenceEN.addEvent('00:02:00', function() {speaker.animateIn()});
// sequenceEN.addEvent('00:2:00', function() {speaker.animateOut()})





sequenceEN.addEvent('00:21:00', function () {
    sequenceGP.pyramidGroup.visible = false;
    sequenceEN.pyramid.visible = true;
});





//Rotate Pyramid
/*sequenceEN.addEvent('00:01:00', sequenceEN.rotate, [sequenceEN.pyramid, Util.toRadians(90), Util.toRadians(90), 0, 1500, TWEEN.Easing.Exponential.InOut]);


// Slice Pyramid
sequenceEN.addEvent('00:01:00', function () {
    $('.vertical-dashed-top').addClass('slice');
    $('.vertical-dashed-bottom').addClass('slice');

    $('.horizontal-dashed-left').addClass('slice');
    $('.horizontal-dashed-right').addClass('slice');
});

sequenceEN.addEvent('00:01:15', function () {
    $('.vertical-dashed-top').addClass('hide');
    $('.vertical-dashed-bottom').addClass('hide');

    $('.horizontal-dashed-left').addClass('hide');
    $('.horizontal-dashed-right').addClass('hide');
});

// Randomly disintegrate
sequenceEN.addEvent('00:01:15', function () {
    sequenceEN.fade(sequenceEN.pyramid, 0, 1000, TWEEN.Easing.Exponential.InOut);

    sequenceEN.fade(sequenceEN.triangle1, 1, 500, TWEEN.Easing.Exponential.InOut);
    sequenceEN.fade(sequenceEN.triangle2, 1, 500, TWEEN.Easing.Exponential.InOut);
    sequenceEN.fade(sequenceEN.triangle3, 1, 500, TWEEN.Easing.Exponential.InOut);
    sequenceEN.fade(sequenceEN.triangle4, 1, 500, TWEEN.Easing.Exponential.InOut);
});

sequenceEN.addEvent('00:01:15', function () {
    sequenceEN.position(sequenceEN.triangle1, 1  , -1  , 5, 1200,  TWEEN.Easing.Exponential.InOut);
    sequenceEN.position(sequenceEN.triangle2, 1  , 1  , 5, 1200,  TWEEN.Easing.Exponential.InOut);
    sequenceEN.position(sequenceEN.triangle3, -1  , 1  , 5, 1200,  TWEEN.Easing.Exponential.InOut);
    sequenceEN.position(sequenceEN.triangle4, -1  , -1  , 5, 1200,  TWEEN.Easing.Exponential.InOut);
});

sequenceEN.addEvent('00:05:00', function () {
    sequenceEN.fade(sequenceEN.triangle1, 0, 1000, TWEEN.Easing.Quadratic.InOut);
    sequenceEN.fade(sequenceEN.triangle2, 0, 1000, TWEEN.Easing.Quadratic.InOut);
    sequenceEN.fade(sequenceEN.triangle3, 0, 1000, TWEEN.Easing.Quadratic.InOut);
    sequenceEN.fade(sequenceEN.triangle4, 0, 1000, TWEEN.Easing.Quadratic.InOut);
});*/


/******************************
* Add Sequences
******************************/
timeline.push(sequenceEN);