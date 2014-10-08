/******************************
* Extend Scene Prototype
******************************/
var SequenceTobiasRebell = function() {
    this.sequence = [];
    this.init();
};

SequenceTobiasRebell.prototype = new Sequence();

/******************************
* Add Objects
******************************/
SequenceTobiasRebell.prototype.init = function() {
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
    this.grid.rotation.z = Util.toRadians(45);

    // Cube
    this.cubeDimensions = 1;

    // Lines
    this.lineLength = this.cubeDimensions * 8;
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
    // this.camera.position.x = 3;
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
SequenceTobiasRebell.prototype.drawHorizontalLine = function(line, newLength, duration, easing) {
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

SequenceTobiasRebell.prototype.drawVerticalLine = function(line, newLength, duration, easing) {
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
var sequenceTobiasRebell = new SequenceTobiasRebell();

/******************************
* Add Sequences
******************************/

var lineSequence = [];
var lineSequences = [];

for (var i=0; i<sequenceTobiasRebell.numberOfLines; i++) {
    lineSequence.push([i, i + sequenceTobiasRebell.numberOfLines]);
}

for (var i=0; i<sequenceTobiasRebell.numberOfLines/2; i++) {
    lineSequences.push([lineSequence.shift(), lineSequence.pop()]);
}

// lineSequences.reverse();

// Show Lines
/*for (var i=0; i<lineSequences.length; i++) {
    for (var j=0; j<lineSequences[i].length; j++) {
        for (var k=0; k<lineSequences[i][j].length; k++) {
            if (k == 0) {
                sequenceTobiasRebell.addEvent(Util.toTimecode(i*0.01 + 0.05), sequenceTobiasRebell.drawHorizontalLine, [sequenceTobiasRebell.lines[lineSequences[i][j][k]], sequenceTobiasRebell.lineLength, 10000, TWEEN.Easing.Exponential.InOut]);
            }

            else {
                sequenceTobiasRebell.addEvent(Util.toTimecode(i*0.01 + 0.05), sequenceTobiasRebell.drawVerticalLine, [sequenceTobiasRebell.lines[lineSequences[i][j][k]], sequenceTobiasRebell.lineLength, 10000, TWEEN.Easing.Exponential.InOut]);
            }
        }
    }
}*/

// Show Lines
for (var i=0; i<sequenceTobiasRebell.lines.length; i++) {
    // Vertical lines
    if (i < sequenceTobiasRebell.numberOfLines) {
        sequenceTobiasRebell.addEvent('00:01:05', sequenceTobiasRebell.drawHorizontalLine, [sequenceTobiasRebell.lines[i], sequenceTobiasRebell.lineLength, 2000, TWEEN.Easing.Exponential.InOut]);
    }

    // Horizontal lines
    else {
        sequenceTobiasRebell.addEvent('00:01:05', sequenceTobiasRebell.drawVerticalLine, [sequenceTobiasRebell.lines[i], sequenceTobiasRebell.lineLength, 2000, TWEEN.Easing.Exponential.InOut]);
    }
}

// Hide Lines
for (var i=0; i<sequenceTobiasRebell.lines.length; i++) {
    // Vertical lines
    if (i < sequenceTobiasRebell.numberOfLines) {
        sequenceTobiasRebell.addEvent('00:09:05', sequenceTobiasRebell.drawHorizontalLine, [sequenceTobiasRebell.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        sequenceTobiasRebell.addEvent('00:09:05', sequenceTobiasRebell.drawVerticalLine, [sequenceTobiasRebell.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }
}

var speaker = new Glitch ('TOBIAS REBELL', 300, 0);
sequenceTobiasRebell.addEvent('00:04:00', function() {speaker.animateIn()});
sequenceTobiasRebell.addEvent('00:10:00', function() {speaker.animateOut()})

/******************************
* Add Sequences
******************************/
sequences.push(sequenceTobiasRebell);