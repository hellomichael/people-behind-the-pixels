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

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(0, 10, 0).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0xAAAAAA);
    this.scene.add(this.ambientLight);

    // Particulator
    /*this.particulator = new Particulator(30, 300, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0xCCCCCC), this.camera);
    this.scene.add(this.particulator.pointCloud);*/

    /******************************
    * Add Objects
    ******************************/
    // Grid
    this.grid = new THREE.Object3D();
    this.grid.position.z = 1.5;
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

SequenceTR.prototype.drawVerticalLine = function(line, newLength, duration, easing) {
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

/******************************
* Add Events
******************************/
var sequenceTR = new SequenceTR();

sequenceTR.addEvent('00:00:00', function () {
    var options = {
        postProcessEnabled      : true,

        blurEnabled             : true,
        blurAmount              : 1,
        blurPosition            : 0.5,

        bloomEnabled            : false,
        aaEnabled               : true
    }

    sequenceTR.nextScene(sequenceTR.scene, sequenceTR.camera, options);
});

var glitchTR = new Glitch ('TOBIAS REBELL', 300, 0);
sequenceTR.addEvent('00:03:15', function() {glitchTR.animateIn()});
sequenceTR.addEvent('00:08:15', function() {glitchTR.animateOut()});

var glitchDH = new Glitch ('DAN HON', 300, 0);
sequenceTR.addEvent('00:08:25', function() {glitchDH.animateIn()});
sequenceTR.addEvent('00:13:15', function() {glitchDH.animateOut()});


// Show Lines
for (var i=0; i<sequenceTR.lines.length; i++) {
    // Vertical lines
    if (i < sequenceTR.numberOfLines) {
        sequenceTR.addEvent('00:01:20', sequenceTR.drawHorizontalLine, [sequenceTR.lines[i], sequenceTR.lineLength, 2000, TWEEN.Easing.Exponential.InOut]);
    }

    // Horizontal lines
    else {
        sequenceTR.addEvent('00:01:25', sequenceTR.drawVerticalLine, [sequenceTR.lines[i], sequenceTR.lineLength, 2000, TWEEN.Easing.Exponential.InOut]);
    }
}

// Hide Lines
for (var i=0; i<sequenceTR.lines.length; i++) {
    // Vertical lines
    if (i < sequenceTR.numberOfLines) {
        sequenceTR.addEvent('00:09:05', sequenceTR.drawHorizontalLine, [sequenceTR.lines[i], 0, 1250, TWEEN.Easing.Elastic.InOut]);
    }

    // Horizontal lines
    else {
        sequenceTR.addEvent('00:09:00', sequenceTR.drawVerticalLine, [sequenceTR.lines[i], 0, 1250, TWEEN.Easing.Elastic.InOut]);
    }
}

sequenceTR.addEvent('00:02:00', function () {
    sequenceTR.position(sequenceTR.grid, 0, 0, 0, 6500, TWEEN.Easing.Linear.None);
});


/******************************
* Add to Timeline
******************************/
timeline.push(sequenceTR);