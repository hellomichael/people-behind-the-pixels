/******************************
* Extend Scene Prototype
******************************/
var Sequence1 = function() {
    this.sequence = [];
    this.init();
};

Sequence1.prototype = new Sequence();

/******************************
* Add Objects
******************************/
Sequence1.prototype.init = function() {
    // Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1500);
    renderator = new Renderator(this.scene, this.camera);

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({color: 'white'});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(100, 100, 100).normalize();

    // Grid
    this.grid = new THREE.Object3D();
    this.grid.rotation.z = 45*Math.PI/180;

    // Cube
    this.cubeDimensions = 50;

    // Lines
    this.lineLength = this.cubeDimensions * 6;
    this.lines = [];
    this.numberOfLines = 8;

    // Draw lines and then offset them
    for (var i=0; i<this.numberOfLines * 2; i++) {
        this.lines.push(new THREE.Line(new THREE.Geometry(), this.lineMaterial));

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
Sequence1.prototype.drawHorizontalLine = function(line, newLength, duration, easing) {
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

Sequence1.prototype.drawVerticalLine = function(line, newLength, duration, easing) {
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

Sequence1.prototype.cameraZoom = function(camera, z, duration, easing) {
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
var sequence1 = new Sequence1();

/******************************
* Add Sequences
******************************/
for (var i=0; i<sequence1.lines.length; i++) {
    // Vertical lines
    if (i < sequence1.numberOfLines) {
        sequence1.addSequence(pbtp.utilities.convertToTimecode(i * 0.01 + 0.75), sequence1.drawHorizontalLine, [sequence1.lines[i], sequence1.lineLength, 1000, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        sequence1.addSequence(pbtp.utilities.convertToTimecode((i - sequence1.numberOfLines) * 0.01 + 0.75), sequence1.drawVerticalLine, [sequence1.lines[i], sequence1.lineLength, 1000, TWEEN.Easing.Elastic.InOut]);
    }
}

// Camera sequence
sequence1.addSequence('00:01:00', sequence1.cameraZoom, [sequence1.camera, 1500 - 50, 2000, TWEEN.Easing.Linear.None]);
sequence1.addSequence('00:03:00', sequence1.cameraZoom, [sequence1.camera, 1125, 0, null]);

sequence1.addSequence('00:03:00', sequence1.cameraZoom, [sequence1.camera, 1125 - 50, 2000, TWEEN.Easing.Linear.None]);
sequence1.addSequence('00:05:00', sequence1.cameraZoom, [sequence1.camera, 750, 0, null]);

sequence1.addSequence('00:05:00', sequence1.cameraZoom, [sequence1.camera, 750 - 50 - 50, 4000, TWEEN.Easing.Linear.None]);
sequence1.addSequence('00:07:00', sequence1.cameraZoom, [sequence1.camera, 1125, 500, TWEEN.Easing.Quintic.InOut]);

// Hide Lines
for (var i=0; i<sequence1.lines.length; i++) {
    // Vertical lines
    if (i < sequence1.numberOfLines) {
        sequence1.addSequence(pbtp.utilities.convertToTimecode(i * 0.01 + 6.5), sequence1.drawHorizontalLine, [sequence1.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        sequence1.addSequence(pbtp.utilities.convertToTimecode((i - sequence1.numberOfLines) * 0.01 + 6.75), sequence1.drawVerticalLine, [sequence1.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }
}

/******************************
* Add Sequences
******************************/
sequences.push(sequence1);