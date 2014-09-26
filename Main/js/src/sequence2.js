/******************************
* Extend Scene Prototype
******************************/
var Sequence2 = function() {
    this.sequence = [];
    this.init();
};

Sequence2.prototype = new Sequence();

/******************************
* Add Objects
******************************/
Sequence2.prototype.init = function() {
    // Previous scene objects being reused
    this.scene = sequence1.scene;

    // Materials
    this.cubeMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 0, transparent: true});

    // Cube
    this.cubeDimensions = sequence1.cubeDimensions;

    this.cubeData = {
        mesh: this.cube,
        acceleration: new THREE.Vector3(),
        rotation: new THREE.Vector3(0.4, 0.2, 0.1),
        velocity: new THREE.Vector3(0, 0, -0.056),
        preventDecay: true,
    }

    this.cube = new THREE.Mesh(new THREE.CubeGeometry(this.cubeDimensions, this.cubeDimensions, this.cubeDimensions), this.cubeMaterial);

    // Triangles
    this.triangles = new THREE.Object3D();

    for (var i = 0; i < 50; i++) {
        var triMesh = this.CreatePolyOutline(3, 7, 0.1);
        triMesh.position.z = (i) * 20 + 20;
        this.triangles.children.push(triMesh);
    }

    this.scene.add(this.triangles);

    // Grid
    this.grid = new THREE.Object3D();
    this.grid.add(this.cube);

    this.grid.rotation.z = 45*Math.PI/180;

    // Camera
    this.camera = sequence1.camera;
    this.camera.lookAt(new THREE.Vector3());

    this.cameraData = {
        camera: this.camera,
        acceleration: new THREE.Vector3(),
        rotation: new THREE.Vector3(),
        velocity: new THREE.Vector3(0, 0, -0.05),
        preventDecay: true,
    }

    this.playBack = false;
    this.friction = 0.1;
    this.timescale = 1.0

    this.scene.add(this.grid);
};

/******************************
* Add Animations
******************************/
Sequence2.prototype.positionCube = function(cube, position, duration, easing) {
    new TWEEN.Tween({position: cube.position.z})
        .to({position: position}, duration)
        .easing(easing)
        .onUpdate(function () {
            cube.position.z = this.position;
        })
        .start();
};

Sequence2.prototype.rotateCube = function(cube, rotation, duration, easing) {
    new TWEEN.Tween({rotation: cube.rotation.x})
        .to({rotation: rotation}, duration)
        .easing(easing)
        .onUpdate(function () {
            cube.rotation.x = this.rotation;
            cube.rotation.y = this.rotation;
            cube.rotation.z = this.rotation;
        })
        .start();
};

Sequence2.prototype.showCube = function(cube, opacity, duration, easing) {
    if (this.cubeRotation) {
        this.cubeRotation.stop();
    }

    this.cubeRotation = new TWEEN.Tween({opacity: 0})
        .to({opacity: opacity}, duration)
        .easing(easing)
        .onUpdate(function () {
            cube.material.opacity = this.opacity;
        })
    .start();
};

Sequence2.prototype.CreatePolyOutline = function(sides, radius, linewidth) {
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

    var mtl = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    // var mtl = new THREE.MeshPhongMaterial({ ambient: 0xffffff, side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geo, mtl);
    mesh.doubleSided = true;

    return mesh;
}


/******************************
* Initialize New Scene
******************************/
var sequence2 = new Sequence2();

/******************************
* Add Sequences
******************************/

sequence2.addSequence('00:14:15', sequence2.showCube, [sequence2.cube, 1, 1000, TWEEN.Easing.Quadratic.InOut]);

// Fly through
sequence2.addSequence('00:17:15', sequence2.rotateCube, [sequence2.cube, (sequence2.cube.rotation.x + 1080) * Math.PI/180, 16000, TWEEN.Easing.Quadratic.InOut]);
sequence1.addSequence('00:17:15', sequence2.positionCube, [sequence2.cube, 200, 16000, TWEEN.Easing.Quadratic.InOut]);

sequence1.addSequence('00:17:15', sequence2.cameraZoom, [sequence1.camera, 210, 16000, TWEEN.Easing.Quadratic.InOut]);

sequences.push(sequence2);