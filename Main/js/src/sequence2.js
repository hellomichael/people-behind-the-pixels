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
    this.camera = sequence1.camera;
    this.cubeDimensions = sequence1.cubeDimensions;

    // Materials
    this.cubeMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 0, transparent: true});

    // Cube
    this.cube = new THREE.Mesh(new THREE.CubeGeometry(this.cubeDimensions, this.cubeDimensions, this.cubeDimensions), this.cubeMaterial);

    // Grid
    this.grid = new THREE.Object3D();
    this.grid.add(this.cube);

    this.grid.rotation.z = 45*Math.PI/180;
    this.scene.add(this.grid);
};

/******************************
* Add Animations
******************************/
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

/******************************
* Initialize New Scene
******************************/
var sequence2 = new Sequence2();

/******************************
* Add Sequences
******************************/
sequence2.addSequence('00:06:25', sequence2.showCube, [sequence2.cube, 1, 1000, TWEEN.Easing.Quadratic.InOut]);
sequence2.addSequence('00:07:10', sequence2.rotateCube, [sequence2.cube, (sequence2.cube.rotation.x + 45) * Math.PI/180, 1500, TWEEN.Easing.Elastic.Out]);

sequences.push(sequence2);