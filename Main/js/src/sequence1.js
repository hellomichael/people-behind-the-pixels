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
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x00000, 5, 30);

    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 50);

    renderator = new Renderator(this.scene, this.camera);

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
var speaker = new Glitch('TOBIAS REVELL', 200, 200);

sequence1.addSequence('00:10:10', function() {speaker.frame1();});
sequence1.addSequence('00:10:13', function() {speaker.frame2();});
sequence1.addSequence('00:10:15', function() {speaker.frame3();});
sequence1.addSequence('00:10:17', function() {speaker.frame4();});

var speaker2 = new Glitch('MATT WEBB', -300, -150);

sequence1.addSequence('00:18:10', function() {speaker2.frame1();});
sequence1.addSequence('00:18:13', function() {speaker2.frame2();});
sequence1.addSequence('00:18:15', function() {speaker2.frame3();});
sequence1.addSequence('00:18:17', function() {speaker2.frame4();});

var speaker3 = new Glitch('GENEVIEVE BELL', 100, 200);
sequence1.addSequence('00:26:10', function() {speaker3.frame1();});
sequence1.addSequence('00:26:13', function() {speaker3.frame2();});
sequence1.addSequence('00:26:15', function() {speaker3.frame3();});
sequence1.addSequence('00:26:17', function() {speaker3.frame4();});

var speaker4 = new Glitch('DAN HON', -300, 100);
sequence1.addSequence('00:34:10', function() {speaker4.frame1();});
sequence1.addSequence('00:34:13', function() {speaker4.frame2();});
sequence1.addSequence('00:34:15', function() {speaker4.frame3();});
sequence1.addSequence('00:34:17', function() {speaker4.frame4();});

// Camera sequence
sequence1.addSequence('00:02:00', sequence1.cameraZoom, [sequence1.camera, 15, 18000, TWEEN.Easing.Linear.None]);

/*sequence1.addSequence('00:06:00', sequence1.cameraZoom, [sequence1.camera, 15, 0, null]);

sequence1.addSequence('00:06:00', sequence1.cameraZoom, [sequence1.camera, 15 - 2, 4000, TWEEN.Easing.Linear.None]);
sequence1.addSequence('00:10:00', sequence1.cameraZoom, [sequence1.camera, 8, 0, null]);

sequence1.addSequence('00:10:00', sequence1.cameraZoom, [sequence1.camera, 8 - 1.5, 4000, TWEEN.Easing.Linear.None]);
sequence1.addSequence('00:14:00', sequence1.cameraZoom, [sequence1.camera, 5, 0, null]);

sequence1.addSequence('00:14:00', sequence1.cameraZoom, [sequence1.camera, 5 - 1, 4000, TWEEN.Easing.Linear.None]);*/



// sequence1.addSequence('00:14:00', sequence1.cameraZoom, [sequence1.camera, 400 - 50, 4000, TWEEN.Easing.Linear.None]);
// sequence1.addSequence('00:18:00', sequence1.cameraZoom, [sequence1.camera, 300, 0, null]);

// sequence1.addSequence('00:17:00', sequence1.cameraZoom, [sequence1.camera, 1200 - 50, 500, TWEEN.Easing.Quadratic.InOut]);


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
                sequence1.addSequence(pbtp.utilities.convertToTimecode(i*4 + 2), sequence1.drawHorizontalLine, [sequence1.lines[lineSequences[i][j][k]], sequence1.lineLength, 8000, TWEEN.Easing.Linear.None]);
            }

            else {
                sequence1.addSequence(pbtp.utilities.convertToTimecode(i*4 + 2), sequence1.drawVerticalLine, [sequence1.lines[lineSequences[i][j][k]], sequence1.lineLength, 8000, TWEEN.Easing.Linear.None]);
            }

            //console.log(lineSequences[i][j][k]);
        }
    }
}

// Hide Lines
for (var i=0; i<sequence1.lines.length; i++) {
    // Vertical lines
    if (i < sequence1.numberOfLines) {
        sequence1.addSequence('00:17:00', sequence1.drawHorizontalLine, [sequence1.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        sequence1.addSequence('00:17:00', sequence1.drawVerticalLine, [sequence1.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }
}

/******************************
* Add Sequences
******************************/
sequences.push(sequence1);