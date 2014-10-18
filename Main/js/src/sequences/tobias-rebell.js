/******************************
* Extend Scene Prototype
******************************/
var SequenceTR = function() {
    this.sequence = [];
    this.init();
};

SequenceTR.prototype = new Sequence();

SequenceTR.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x00000, -10, 75);

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 50);
    this.camera.position.z = 10;

    // Renderator
    renderator.reset(this.scene, this.camera,
        {
            postProcessEnabled      : true,

            blurEnabled             : true,
            blurAmount              : 2,
            blurPosition            : 0.75,

            bloomEnabled            : false,
            noiseEnabled            : false,
            aaEnabled               : false
        }
    );

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(0, 10000, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0xCCCCCC);
    this.scene.add(this.ambientLight);

    /******************************
    * Add Objects
    ******************************/
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

    this.scene.add(this.grid);
};

/******************************
* Create Animations
******************************/
SequenceTR.prototype.drawHorizontalLine = function(line, newLength, duration, easing) {
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

SequenceTR.prototype.drawVerticalLine = function(line, newLength, duration, easing) {
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
* Add Events
******************************/
var sequenceTR = new SequenceTR();

var glitchTR = new Glitch ('TOBIAS REBELL', 300, 0);
/*sequenceTR.addEvent('00:04:00', function() {glitchTR.animateIn()});
sequenceTR.addEvent('00:10:00', function() {glitchTR.animateOut()})*/

var lineSequence = [];
var lineSequences = [];

for (var i=0; i<sequenceTR.numberOfLines; i++) {
    lineSequence.push([i, i + sequenceTR.numberOfLines]);
}

for (var i=0; i<sequenceTR.numberOfLines/2; i++) {
    lineSequences.push([lineSequence.shift(), lineSequence.pop()]);
}

// Show Lines
for (var i=0; i<sequenceTR.lines.length; i++) {
    // Vertical lines
    if (i < sequenceTR.numberOfLines) {
        sequenceTR.addEvent('00:01:05', sequenceTR.drawHorizontalLine, [sequenceTR.lines[i], sequenceTR.lineLength, 2000, TWEEN.Easing.Exponential.InOut]);
    }

    // Horizontal lines
    else {
        sequenceTR.addEvent('00:01:05', sequenceTR.drawVerticalLine, [sequenceTR.lines[i], sequenceTR.lineLength, 2000, TWEEN.Easing.Exponential.InOut]);
    }
}

// Hide Lines
for (var i=0; i<sequenceTR.lines.length; i++) {
    // Vertical lines
    if (i < sequenceTR.numberOfLines) {
        sequenceTR.addEvent('00:09:05', sequenceTR.drawHorizontalLine, [sequenceTR.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        sequenceTR.addEvent('00:09:05', sequenceTR.drawVerticalLine, [sequenceTR.lines[i], 0, 1000, TWEEN.Easing.Elastic.InOut]);
    }
}

/*sequenceTR.addEvent('00:07:10', sequenceTR.pullFocus, [renderator, 0.5, 10, 100, TWEEN.Easing.Quadratic.InOut]);
sequenceTR.addEvent('00:18:15', sequenceTR.pullFocus, [renderator, 0.5, 0, 100, TWEEN.Easing.Quadratic.InOut]);*/

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceTR);