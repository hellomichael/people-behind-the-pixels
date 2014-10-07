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

    // Group
    this.cubeGroup = new THREE.Object3D();

    // Cube
    this.cubeDimensions = sequence1.cubeDimensions;
    this.cube = new THREE.Mesh(new THREE.CubeGeometry(this.cubeDimensions, this.cubeDimensions, this.cubeDimensions), this.cubeMaterial);
    this.cubeGroup.add(this.cube);

    // Fragments
    var loader = new THREE.objLoader();
    var that = this; //cache

    loader.load("shared/js/objs/fragments.obj", function (obj) {
        that.fragments = obj;
        that.fragments.scale.set(0.5, 0.5, 0.5);

        for (var i=0; i<that.fragments.children.length; i++) {
            that.fragments.children[i].material = new THREE.MeshLambertMaterial({color: 'white', opacity: 0, transparent: true});
            that.fragments.children[i].material.opacity = 0;
        }

        that.cubeGroup.add(that.fragments);

        // Sphere
        that.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 0, 0), new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true}));
        that.cubeGroup.add(that.sphere);
    });

    // Triangles
    this.triangles = new THREE.Object3D();

    for (var i = 0; i < 18; i++) {
        var triMesh = this.CreatePolyOutline(3, 7, 0.15);
        triMesh.position.z = (i) * 4 + 10;
        this.triangles.children.push(triMesh);
    }

    this.scene.add(this.triangles);

    // Grid
    this.grid = new THREE.Object3D();
    this.grid.rotation.z = 45*Math.PI/180;
    this.grid.add(this.cubeGroup);

    // Camera
    this.camera = sequence1.camera;
    this.scene.add(this.grid);
};

/******************************
* Add Animations
******************************/
Sequence2.prototype.showCube = function(cubeGroup, opacity, duration, easing) {
    var cube = cubeGroup.children[0];

    new TWEEN.Tween({opacity: 0})
        .to({opacity: opacity}, duration)
        .easing(easing)
        .onUpdate(function () {
            cube.material.opacity = this.opacity;
        })
    .start();
};

Sequence2.prototype.positionCubeGroup = function(cubeGroup, position, duration, easing) {
    this.spaceAudio = new Audio('shared/audio/space.mp3');
    this.spaceAudio.play();

    new TWEEN.Tween({position: cubeGroup.position.z})
        .to({position: position}, duration)
        .easing(easing)
        .onUpdate(function () {
            cubeGroup.position.z = this.position;
        })
        .start();
};

Sequence2.prototype.rotateCubeGroup = function(cubeGroup, rotation, duration, easing) {
    var cube = cubeGroup.children[0];
    var fragments = cubeGroup.children[1];

    new TWEEN.Tween({index: i, rotation: 0})
            .to({rotation: rotation}, duration)
            .easing(easing)
            .onUpdate(function () {
                cube.rotation.x = this.rotation;
                cube.rotation.y = this.rotation;
                cube.rotation.z = this.rotation;
            })
        .start();

    for (var i=0; i<cubeGroup.children[1].children.length; i++) {
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

Sequence2.prototype.explodeCube = function(fragments, duration, easing) {
    this.rocksAudioIn = new Audio('shared/audio/rocks.mp3');
    this.rocksAudioIn.play();

    for (var i=0; i<fragments.children[1].children.length; i++) {
        fragments.children[1].children[i].material.opacity = 1;

        new TWEEN.Tween({
            index: i,
            x: fragments.children[1].children[i].position.x,
            y: fragments.children[1].children[i].position.y,
            z: fragments.children[1].children[i].position.z})

            .to({
                x: fragments.children[1].children[i].position.x + -60 + Math.random()*120,
                y: fragments.children[1].children[i].position.y + -60 + Math.random()*120,
                z: -600

            }, duration)
            .easing(easing)
            .delay(i * Math.random() * 20)
            .onUpdate(function () {
                fragments.children[1].children[this.index].position.x = this.x;
                fragments.children[1].children[this.index].position.y = this.y;
                fragments.children[1].children[this.index].position.z = this.z;
            })
        .start();
    }

    // Hide cube
    fragments.children[0].material.opacity = 0;
    fragments.children[0].scale.set(0, 0, 0);
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
sequence2.addEvent('00:14:00', sequence2.showCube, [sequence2.cubeGroup, 1, 1000, TWEEN.Easing.Quadratic.InOut]);

// Fly through
sequence2.addEvent('00:16:20', sequence2.cameraZoom, [sequence2.camera, 88, 5200, TWEEN.Easing.Quadratic.InOut, sequence2.cubeGroup]);

sequence2.addEvent('00:16:15', sequence2.positionCubeGroup, [sequence2.cubeGroup, 75, 5000, TWEEN.Easing.Quadratic.InOut]);
sequence2.addEvent('00:16:17', sequence2.rotateCubeGroup, [sequence2.cubeGroup, 720 * Math.PI/180, 5500, TWEEN.Easing.Quadratic.InOut]);

sequence2.addEvent('00:18:18', sequence2.explodeCube, [sequence2.cubeGroup, 3500, TWEEN.Easing.Quadratic.InOut]);


var speaker = new Glitch ('GENEVIEVE BELL', -300, -50);

sequence1.addEvent('00:18:00', function() {speaker.animateIn()});
sequence1.addEvent('00:22:15', function() {speaker.animateOut()})

sequences.push(sequence2);