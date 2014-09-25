/******************************
* Extend Scene Prototype
******************************/
var Scene1 = function(args) {
    this.sequence = [];
    this.args = args;
    this.init();
};

Scene1.prototype = new Scene();

/******************************
* Add Objects
******************************/
Scene1.prototype.initObjects = function() {
    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({color: 'white'});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);

    // Cube
    this.cubeDimensions = 50;

    // Lines
    this.lineLength = this.cubeDimensions * 6;
    this.lines = [];
    this.numberOfLines = 8;

    for (var i=0; i<this.numberOfLines * 2; i++) {
        this.lines.push(new THREE.Line(new THREE.Geometry(), this.lineMaterial));
    }

    // Grid
    this.grid = new THREE.Object3D();
};

Scene1.prototype.positionObjects = function() {
    // Set light positions
    this.directionalLight.position.set(100, 100, 100).normalize();

    // Rotate grid by 45 degrees;
    this.grid.rotation.z = 45*Math.PI/180;

    // Draw lines and then offset them
    for (var i=0; i<this.lines.length; i++) {
        // Vertical lines
        if (i < this.numberOfLines) {
            this.lines[i].geometry.vertices.push(new THREE.Vector3(-this.cubeDimensions/2, 0, this.cubeDimensions/2));
            this.lines[i].geometry.vertices.push(new THREE.Vector3(-this.cubeDimensions/2, 0, this.cubeDimensions/2));
            this.lines[i].position.x -= this.cubeDimensions * i - this.cubeDimensions*this.numberOfLines/2;
        }

        // Horizontal lines
        else {
            this.lines[i].geometry.vertices.push(new THREE.Vector3(0, -this.cubeDimensions/2, this.cubeDimensions/2));
            this.lines[i].geometry.vertices.push(new THREE.Vector3(0, -this.cubeDimensions/2, this.cubeDimensions/2));
            this.lines[i].position.y -= this.cubeDimensions * (i-this.numberOfLines) - this.cubeDimensions*this.numberOfLines/2;
        }

        // Add lines to the grid
        this.grid.add(this.lines[i]);
    }

    // Camera Positioning
    this.camera.position.z = 1500;

    // Add objects to scene
    this.scene.add(this.directionalLight);
    this.scene.add(this.grid);
};

/******************************
* Add Animations

Types of easing:
Linear.None
Quadratic.InOut
Cubic
Quartic
Quintic
Sinusoidal
Exponential
Circular
Elastic
Back
Bounce

******************************/
Scene1.prototype.drawHorizontalLine = function(line, newLength, duration, easing) {
    new TWEEN.Tween({vertice: line.geometry.vertices[0].y})
        .to({vertice: newLength}, duration)
        .easing(easing)
        .onUpdate(function () {
            line.geometry.vertices[0].y = this.vertice;
            line.geometry.vertices[1].y = -this.vertice;
            line.geometry.verticesNeedUpdate = true;
        })
    .start();
};

Scene1.prototype.drawVerticalLine = function(line, newLength, duration, easing) {
    new TWEEN.Tween({vertice: line.geometry.vertices[0].x})
        .to({vertice: newLength}, duration)
        .easing(easing)
        .onUpdate(function () {
            line.geometry.vertices[0].x = -this.vertice;
            line.geometry.vertices[1].x = this.vertice;
            line.geometry.verticesNeedUpdate = true;
        })
    .start();
};

Scene1.prototype.cameraZoom = function(camera, z, duration, easing) {
    if (this.cameraTween) {
        this.cameraTween.stop();
    }

    // Tween
    if (duration) {
        this.cameraTween = new TWEEN.Tween({zoom: camera.position.z})
            .to({zoom: z}, duration)
            .easing(easing)
            .onUpdate(function () {
                camera.position.z = this.zoom;
            })
        .start();
    }

    // Jump
    else {
        camera.position.z = z;
    }
};

/******************************
* Initialize New Scene
******************************/
var scene1 = new Scene1({
    renderer:   new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true, alpha: true}),
    scene:      new THREE.Scene(),
    camera:     new THREE.PerspectiveCamera(45, screenWidth/screenHeight, 1, 1500)
});

scene1.positionObjects();

/******************************
* Add Sequences
******************************/
for (var i=0; i<scene1.lines.length; i++) {
    // Vertical lines
    if (i < scene1.numberOfLines) {
        scene1.addSequence(pbtp.utilities.convertToTimecode(i * 0.01 + 0.75), scene1.drawHorizontalLine, [scene1.lines[i], scene1.lineLength, 1000, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        scene1.addSequence(pbtp.utilities.convertToTimecode((i - scene1.numberOfLines) * 0.01 + 0.75), scene1.drawVerticalLine, [scene1.lines[i], scene1.lineLength, 1000, TWEEN.Easing.Elastic.InOut]);
    }
}

// Camera sequence
scene1.addSequence('00:01:00', scene1.cameraZoom, [scene1.camera, 1500 - 50, 2000, TWEEN.Easing.Linear.None]);
scene1.addSequence('00:03:00', scene1.cameraZoom, [scene1.camera, 1125, 0, null]);

scene1.addSequence('00:03:00', scene1.cameraZoom, [scene1.camera, 1125 - 50, 2000, TWEEN.Easing.Linear.None]);
scene1.addSequence('00:05:00', scene1.cameraZoom, [scene1.camera, 750, 0, null]);

scene1.addSequence('00:05:00', scene1.cameraZoom, [scene1.camera, 750 - 50 - 50, 4000, TWEEN.Easing.Linear.None]);
scene1.addSequence('00:07:00', scene1.cameraZoom, [scene1.camera, 1125, 500, TWEEN.Easing.Quintic.InOut]);

// Hide Lines
for (var i=0; i<scene1.lines.length; i++) {
    // Vertical lines
    if (i < scene1.numberOfLines) {
        scene1.addSequence(pbtp.utilities.convertToTimecode(i * 0.01 + 6.75), scene1.drawHorizontalLine, [scene1.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        scene1.addSequence(pbtp.utilities.convertToTimecode((i - scene1.numberOfLines) * 0.01 + 6.75), scene1.drawVerticalLine, [scene1.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }
}

/******************************
* Add Sequences
******************************/
scenes.push(scene1);