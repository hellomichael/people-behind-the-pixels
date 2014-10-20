/******************************
* Extend Scene Prototype
******************************/
var SequenceMW = function() {
    this.sequence = [];
    this.init();
};

SequenceMW.prototype = new Sequence();

SequenceMW.prototype.init = function() {
    // Previous scene objects being reused
    this.scene = sequenceTR.scene;

    // Audio
    this.spaceAudio = new Audio('shared/audio/space.mp3');
    this.rocksAudio = new Audio('shared/audio/rocks.mp3');

    // Materials
    this.basicMaterial = new THREE.MeshBasicMaterial({color: 0x999999, opacity: 1, transparent: true, side: THREE.DoubleSide});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 0x999999, opacity: 0, transparent: true, side: THREE.DoubleSide});

    /******************************
    * Add Objects
    ******************************/
    // Cube Group
    this.cubeGroup = new THREE.Object3D();

    // Cube
    this.cubeDimensions = sequenceTR.cubeDimensions;
    this.cube = new THREE.Mesh(new THREE.BoxGeometry(this.cubeDimensions, this.cubeDimensions, this.cubeDimensions), this.lightMaterial);
    this.cubeGroup.add(this.cube);

    // Sphere
    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 300, 300), this.lightMaterial);
    this.sphere.visible = false;
    this.cubeGroup.add(this.sphere);

    // Fragments
    var loader = new THREE.objLoader();
    var that = this; //cache

    loader.load("shared/js/objs/Fragments.obj", function (obj) {
        that.fragments = obj;
        that.fragments.scale.set(0.5, 0.5, 0.5);

        for (var i=0; i<that.fragments.children.length; i++) {
            that.fragments.children[i].material = that.lightMaterial;
            that.fragments.children[i].visible = false;
        }

        that.cubeGroup.add(that.fragments);
    });

    // Triangles
    this.triangles = new THREE.Object3D();

    for (var i=0; i<18; i++) {
        this.triMesh = this.CreatePolyOutline(3, 7, 0.15);
        this.triMesh.position.z = (i) * 4 + 10;
        this.triangles.children.push(this.triMesh);
    }

    this.scene.add(this.triangles);

    // Grid
    this.grid = new THREE.Object3D();
    this.grid.rotation.z = Util.toRadians(45);
    this.grid.add(this.cubeGroup);

    // Camera
    this.camera = sequenceTR.camera;
    this.scene.add(this.grid);
};

/******************************
* Create Animations
******************************/
SequenceMW.prototype.showCube = function(cubeGroup, opacity, duration, easing) {
    var cube = cubeGroup.children[0];
    var sphere = cubeGroup.children[1];

    new TWEEN.Tween({opacity: 0})
        .to({opacity: opacity}, duration)
        .easing(easing)
        .onUpdate(function () {
            cube.material.opacity = this.opacity;
            sphere.material.opacity = this.opacity;
        })
    .start();
};

SequenceMW.prototype.positionCubeGroup = function(cubeGroup, position, duration, easing) {
    this.spaceAudio.play();

    var cubeGroupTarget = cubeGroup.position.z + position;

    new TWEEN.Tween({position: cubeGroup.position.z})
        .to({position: cubeGroupTarget}, duration)
        .easing(easing)
        .onUpdate(function () {
            cubeGroup.position.z = this.position;
        })
        .start();
};

SequenceMW.prototype.rotateCubeGroup = function(cubeGroup, rotation, duration, easing) {
    var cube = cubeGroup.children[0];
    var fragments = cubeGroup.children[2];

    // Cube
    new TWEEN.Tween({index: i, rotation: 0})
            .to({rotation: rotation}, duration)
            .easing(easing)
            .onUpdate(function () {
                cube.rotation.x = this.rotation;
                cube.rotation.y = this.rotation;
                cube.rotation.z = this.rotation;
            })
        .start();

    // Fragments
    for (var i=0; i<cubeGroup.children[2].children.length; i++) {
        new TWEEN.Tween({index: i, rotation: 0})
            .to({rotation: rotation}, duration)
            .easing(easing)
            .onUpdate(function () {
                fragments.children[this.index].rotation.x = this.rotation;
                fragments.children[this.index].rotation.y = this.rotation;
                fragments.children[this.index].rotation.z = this.rotation;
            })
        .start();
    }
};

SequenceMW.prototype.explodeCubeGroup = function(cubeGroup, duration, easing) {
    this.rocksAudio.play();

    var cube = cubeGroup.children[0];
    var sphere = cubeGroup.children[1];
    var fragments = cubeGroup.children[2];

    // Hide cube
    cube.visible = false;
    sphere.visible = true;

    for (var i=0; i<fragments.children.length; i++) {
        fragments.children[i].visible = true;

        new TWEEN.Tween({
            index: i,
            x: fragments.children[i].position.x,
            y: fragments.children[i].position.y,
            z: fragments.children[i].position.z})

            .to({
                x: fragments.children[i].position.x + -60 + Math.random()*120,
                y: fragments.children[i].position.y + -60 + Math.random()*120,
                z: -600

            }, duration)
            .easing(easing)
            .delay(i * Math.random() * 20)
            .onUpdate(function () {
                fragments.children[this.index].position.x = this.x;
                fragments.children[this.index].position.y = this.y;
                fragments.children[this.index].position.z = this.z;
            })
        .start();
    }
};

SequenceMW.prototype.CreatePolyOutline = function(sides, radius, linewidth) {
    if (sides === undefined || sides < 2) sides = 2;
    if (radius === undefined) radius = 1;
    if (linewidth === undefined) linewidth = radius * 0.1;

    var offset = linewidth / 2;
    var interiorRadius = radius - offset;
    var exteriorRadius = radius + offset;
    var nPoints = sides * 2;

    var ninetyDeg = Math.PI /  2;
    var angle = 2 * Math.PI / sides;
    var geo = new THREE.Geometry();

    for (var i = 0; i < sides; i++) {

        var calcAngle = i * angle + ninetyDeg;

        geo.vertices.push(
            new THREE.Vector3(Math.cos(calcAngle) * interiorRadius, Math.sin(calcAngle) * interiorRadius, 0));

        geo.vertices.push(
            new THREE.Vector3(Math.cos(calcAngle) * exteriorRadius, Math.sin(calcAngle) * exteriorRadius, 0));

        var iA = i*2;
        var iB = iA + 1;
        var iC = (iA + 2) % nPoints;
        var iD = (iA + 3) % nPoints;

        geo.faces.push(new THREE.Face3(iA, iB, iC));
        geo.faces.push(new THREE.Face3(iB, iC, iD));
    }

    var mtl = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 1, transparent: true, side: THREE.DoubleSide});
    var mesh = new THREE.Mesh(geo, mtl);
    mesh.doubleSided = true;

    return mesh;
}


/******************************
* Add Events
******************************/
var sequenceMW = new SequenceMW();

/*var glitchMW = new Glitch ('MATT WEBB', -300, -25);
sequenceMW.addEvent('00:14:15', function() {glitchMW.animateIn()});
sequenceMW.addEvent('00:18:15', function() {glitchMW.animateOut()})*/

sequenceMW.addEvent('00:04:10', function () {
    sequenceMW.showCube(sequenceMW.cubeGroup, 1, 1000, TWEEN.Easing.Exponential.InOut);
});

sequenceMW.addEvent('00:06:00', function () {
    sequenceMW.cameraMovement(sequenceMW.camera, false, -2, 0, 78, 8000, TWEEN.Easing.Exponential.InOut);
});

sequenceMW.addEvent('00:05:29', function () {
    sequenceMW.positionCubeGroup(sequenceMW.cubeGroup, 76, 8000, TWEEN.Easing.Exponential.InOut);
});

sequenceMW.addEvent('00:06:15', function () {
    sequenceMW.rotateCubeGroup(sequenceMW.cubeGroup, Util.toRadians(675), 8000, TWEEN.Easing.Exponential.InOut);
});

sequenceMW.addEvent('00:09:15', function () {
    sequenceMW.explodeCubeGroup(sequenceMW.cubeGroup, 6000, TWEEN.Easing.Quadratic.InOut);
});

sequenceMW.addEvent('00:10:00', sequenceMW.pullFocus, [renderator, 0.5, 10, 20, TWEEN.Easing.Quadratic.InOut]);

// Camera Pan
sequenceMW.addEvent('00:12:20', function () {
    sequenceMW.cameraMovement(sequenceMW.camera, false, 2, 0, 0, 2500, TWEEN.Easing.Exponential.InOut);
});

sequenceMW.addEvent('00:13:00', sequenceMW.pullFocus, [renderator, 0.5, 0, 1000, TWEEN.Easing.Quadratic.InOut]);

// Hide triangles
for (var i=0; i<18; i++) {
    sequenceMW.addEvent('00:14:25', sequenceMW.fade, [sequenceMW.triangles.children[i], 0, 1000, TWEEN.Easing.Quadratic.InOut]);
}/*

var glitchDH = new Glitch ('DAN HON', 0, 100);
sequenceMW.addEvent('00:13:15', function() {glitchDH.animateIn()});
sequenceMW.addEvent('00:17:15', function() {glitchDH.animateOut()})*/

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceMW);