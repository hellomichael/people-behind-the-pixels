/******************************
* Extend Scene Prototype
******************************/
var SequenceJH = function() {
    this.sequence = [];
    this.init();
};

SequenceJH.prototype = new Sequence();

SequenceJH.prototype.init = function() {
    // Screen size
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, this.screenWidth/this.screenHeight, 1, 2000);
    this.camera.position.z = 10;

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});

    // Lights
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF);
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
    this.cubeDimensions = 0.5;

    // Lines
    this.lineLength = this.cubeDimensions * 4;
    this.lines = [];
    this.numberOfLines = 15;

    // Draw lines and then offset them
    for (var i=0; i<this.numberOfLines * 2; i++) {
        this.lines.push(new THREE.Object3D().add(new THREE.Line(new THREE.Geometry(), this.lineMaterial)));

        //this.lines.push(new THREE.Line(new THREE.Geometry(), this.lineMaterial));

        // Vertical lines
        if (i < this.numberOfLines) {
            this.lines[i].children[0].geometry.vertices.push(new THREE.Vector3(-this.cubeDimensions/2, 0, this.cubeDimensions/2));
            this.lines[i].children[0].geometry.vertices.push(new THREE.Vector3(-this.cubeDimensions/2, 0, this.cubeDimensions/2));
            this.lines[i].position.x -= this.cubeDimensions * i/2;
        }

        this.lines[i].children[0].frustumCulled = false;

        // Add lines to the grid
        this.grid.position.x = 0;
        this.grid.position.y = this.cubeDimensions*this.numberOfLines/2 - this.cubeDimensions*2;

        this.grid.add(this.lines[i]);
    }

    this.scene.add(this.grid);
};

/******************************
* Create Animations
******************************/
SequenceJH.prototype.drawHorizontalLine = function(line, newLength, duration, easing) {
    new TWEEN.Tween({vertice: line.geometry.vertices[0].y})
        .to({vertice: newLength}, duration)
        .easing(easing)
        .onUpdate(function () {
            line.geometry.vertices[0].y = 0;
            line.geometry.vertices[1].y = -this.vertice*2;
            line.geometry.verticesNeedUpdate = true;
        })
    .start();
};

/******************************
* Add Events
******************************/
var sequenceJH = new SequenceJH();

sequenceJH.addEvent('01:10:00', function () {
    var options = {
        postProcessEnabled      : false,

        blurEnabled             : true,
        blurAmount              : 1,
        blurPosition            : 0.5,

        bloomEnabled            : false,
        aaEnabled               : true
    }

    sequenceJH.nextScene(sequenceJH.scene, sequenceJH.camera, options);
});

// Show Lines
for (var i=0; i<sequenceJH.lines.length; i++) {
    // Vertical lines
    if (i < sequenceJH.numberOfLines) {
        if (i === 3) {
            sequenceJH.addEvent('01:10:20', sequenceJH.drawHorizontalLine, [sequenceJH.lines[i].children[0], sequenceJH.lineLength * 4, 2500, TWEEN.Easing.Exponential.InOut]);
        }

        else {
            sequenceJH.addEvent('01:10:20', sequenceJH.drawHorizontalLine, [sequenceJH.lines[i].children[0], sequenceJH.lineLength, 2000, TWEEN.Easing.Exponential.InOut]);
        }
    }
}

sequenceJH.addEvent('01:11:30', function () {
    var duration = 1400;
    sequenceJH.cameraMovement(sequenceJH.camera, false, 16, 16, 0, duration - 50, TWEEN.Easing.Exponential.InOut);
    sequenceJH.rotate(sequenceJH.camera, 0, 0, Util.toRadians(-45 + 80), duration - 50, TWEEN.Easing.Exponential.InOut);

    var distance = sequenceJH.screenHeight/2 + sequenceSM.circleRadius/2 + sequenceJH.screenHeight/2;
    $('#sarah-mei').css('-webkit-transform', 'rotate(45deg) translateX(-' + distance + 'px) translateY(-' + distance +  'px)', 'important');
    $('#sarah-mei').css('transition', 'all ' + duration + 'ms cubic-bezier(1.000, 0.000, 0.000, 1.000)');
});

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJH);