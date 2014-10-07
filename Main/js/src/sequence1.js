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
    this.scene.fog = new THREE.Fog(0x00000, -10, 75);

    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 50);

    renderator.reset(this.scene, this.camera);

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({color: 'white'});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(100, 100, 100).normalize();
    this.scene.add(this.directionalLight);

    // Grid
    this.grid = new THREE.Object3D();
    this.grid.rotation.z = 45*Math.PI/180;

    // Cube
    this.cubeDimensions = 1;

    // Lines
    this.lineLength = this.cubeDimensions * 10;
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
    this.camera.position.z = 10;

    // Add objects to scene
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
    if (line.tween) {
        line.tween.stop();
    }

    line.tween = new TWEEN.Tween({vertice: line.geometry.vertices[0].y})
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
    if (line.tween) {
        line.tween.stop();
    }

    line.tween = new TWEEN.Tween({vertice: line.geometry.vertices[0].x})
        .to({vertice: newLength}, duration)
        .easing(easing)
        .onUpdate(function () {
            line.geometry.vertices[0].x = -this.vertice;
            line.geometry.vertices[1].x = this.vertice;
            line.geometry.verticesNeedUpdate = true;
        })
    .start();
};

/******************************
* Initialize New Scene
******************************/
var sequence1 = new Sequence1();

/******************************
* Add Sequences
******************************/

var lineSequence = [];
var lineSequences = [];

for (var i=0; i<sequence1.numberOfLines; i++) {
    lineSequence.push([i, i + sequence1.numberOfLines]);
}

for (var i=0; i<sequence1.numberOfLines/2; i++) {
    lineSequences.push([lineSequence.shift(), lineSequence.pop()]);
}

// lineSequences.reverse();

for (var i=0; i<lineSequences.length; i++) {
    for (var j=0; j<lineSequences[i].length; j++) {
        for (var k=0; k<lineSequences[i][j].length; k++) {
            if (k == 0) {
                sequence1.addEvent(pbtp.utilities.convertToTimecode(i*2 + 2), sequence1.drawHorizontalLine, [sequence1.lines[lineSequences[i][j][k]], sequence1.lineLength, 8000, TWEEN.Easing.Linear.None]);
            }

            else {
                sequence1.addEvent(pbtp.utilities.convertToTimecode(i*2 + 2), sequence1.drawVerticalLine, [sequence1.lines[lineSequences[i][j][k]], sequence1.lineLength, 8000, TWEEN.Easing.Linear.None]);
            }
        }
    }
}

// Hide Lines
for (var i=0; i<sequence1.lines.length; i++) {
    // Vertical lines
    if (i < sequence1.numberOfLines) {
        sequence1.addEvent('00:16:00', sequence1.drawHorizontalLine, [sequence1.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        sequence1.addEvent('00:16:00', sequence1.drawVerticalLine, [sequence1.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }
}

/******************************
* Add Sequences
******************************/
sequences.push(sequence1);