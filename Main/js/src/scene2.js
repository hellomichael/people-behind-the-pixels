/******************************
* Extend Scene Prototype
******************************/
var Scene2 = function(args) {
    this.sequence = [];
    this.args = args;

    this.renderer;
    this.scene;
    this.camera;

    this.init();
};

Scene2.prototype = new Scene();

/******************************
* Add Objects
******************************/
Scene2.prototype.initObjects = function() {
    // Materials
    this.cubeMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 0, transparent: true});

    // Cube
    this.cubeDimensions = scene1.cubeDimensions;
    this.cube = new THREE.Mesh(new THREE.CubeGeometry(this.cubeDimensions, this.cubeDimensions, this.cubeDimensions), this.cubeMaterial);

    // Grid
    this.grid = new THREE.Object3D();
    this.grid.add(this.cube);
};

Scene2.prototype.positionObjects = function() {
    this.grid.rotation.z = 45*Math.PI/180;
    this.scene.add(this.grid);
};


/******************************
* Add Animations
******************************/
Scene2.prototype.rotateCube = function(cube, rotation, duration, easing) {
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

Scene2.prototype.showCube = function(cube, opacity, duration, easing) {
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
var scene2 = new Scene2({
    renderer:   scene1.renderer,
    scene:      scene1.scene,
    camera:     scene1.camera
});

scene2.positionObjects();

/******************************
* Add Sequences
******************************/
scene2.addSequence('00:06:25', scene2.showCube, [scene2.cube, 1, 1000, TWEEN.Easing.Quadratic.InOut]);

scene2.addSequence('00:05:25', scene2.rotateCube, [scene2.cube, (scene2.cube.rotation.x + 45) * Math.PI/180, 1000, TWEEN.Easing.Quadratic.Out]);
//scene2.addSequence('00:05:25', scene2.rotateCube, [scene2.cube, (scene2.cube.rotation.x + 45) * Math.PI/180, 2000, TWEEN.Easing.Linear.None]);


scenes.push(scene2);
