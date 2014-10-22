/******************************
* Extend Scene Prototype
******************************/
var SequenceJM = function() {
    this.sequence = [];
    this.init();
};

SequenceJM.prototype = new Sequence();

SequenceJM.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 5, 1000);
    this.camera.position.y = 20;
    this.camera.position.z = 10;
    this.screenDimensions = Util.getScreenDimensions(this.camera);

    // Renderator
    renderator.reset(this.scene, this.camera,
        {
            postProcessEnabled      : false,

            blurEnabled             : true,
            blurAmount              : 3,
            blurPosition            : 0.3,

            bloomEnabled            : false,
            aaEnabled               : true
        }
    );

    // Materials
    this.lineMaterial  = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial({color: 0x222222, opacity: 1, transparent: true, side: THREE.DoubleSide});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 0x333333, opacity: 1, transparent: true, side: THREE.DoubleSide});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0x999999);
    this.directionalLight.position.set(0, 1000, 0).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x000000);
    this.scene.add(this.ambientLight);

/*    // Particulator
    this.particulator = new Particulator(100, 600, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x777777), this.camera);
    this.scene.add(this.particulator.pointCloud);*/

    /******************************
    * Add Objects
    ******************************/
    this.lines = [];
    this.vertices = [new THREE.Vector3(0, 4.7, 0), new THREE.Vector3(2.4, 0, 0), new THREE.Vector3(0, -0.6, 0)];
    this.numberOfLines = 15;
    this.lineDistance = (this.vertices[0].y - this.vertices[2].y)/(this.numberOfLines - 1);

    // Create lines
    for (var i=0; i<this.numberOfLines; i++) {
        var geometry = new THREE.Geometry();

        // Line
        geometry.vertices.push(new THREE.Vector3(this.vertices[1].x, this.vertices[0].y - i * this.lineDistance, 0));
        geometry.vertices.push(new THREE.Vector3(0, this.vertices[0].y - i * this.lineDistance, 0));

        // Original Vertices
        //geometry.vertices.push(this.vertices[1]);
        //geometry.vertices.push(new THREE.Vector3(0, this.vertices[0].y - i * this.lineDistance, 0));

        var line = new THREE.Line(geometry, this.lineMaterial);
        this.lines.push(line);

        var line = new THREE.Line(geometry, this.lineMaterial);
        line.scale.set(-1, 1, 1);
        this.lines.push(line);
    }

    // Position lines
    for (var i=0; i<this.lines.length; i++) {
        this.scene.add(this.lines[i]);
    }
};

/******************************
* Create Animations
******************************/
SequenceJM.prototype.mergeLines = function(line, duration, easing) {
    /*line.geometry.vertices[0].y = this.vertices[1].y;
    line.geometry.verticesNeedUpdate = true;*/

    new TWEEN.Tween({y: line.geometry.vertices[0].y, y2: line.geometry.vertices[1].y})
        .to({y: sequenceJM.vertices[1].y, y2: line.geometry.vertices[1].y + 1}, duration)
        .easing(easing)
        .onUpdate(function () {
            line.geometry.vertices[0].y = this.y;
            line.geometry.vertices[1].y = this.y2;
            line.geometry.verticesNeedUpdate = true;
        })
    .start();
};

SequenceJM.prototype.breakLines = function(line, duration, easing) {
    /*line.geometry.vertices[0].y = this.vertices[1].y;
    line.geometry.verticesNeedUpdate = true;*/

    new TWEEN.Tween({y: line.geometry.vertices[1].y})
        .to({y: line.geometry.vertices[1].y - 1}, duration)
        .easing(easing)
        .onUpdate(function () {
            line.geometry.vertices[1].y = this.y;
            line.geometry.verticesNeedUpdate = true;
        })
    .start();
};

/******************************
* Add Events
******************************/
var sequenceJM = new SequenceJM();

sequenceJM.addEvent('00:22:10', function () {
    sequenceJM.nextScene(sequenceJM.scene, sequenceJM.camera, false, false, false, false);
});

// Break lines
/*sequenceJM.addEvent('00:23:20', function () {
    for (var i=0; i<sequenceJM.lines.length; i++) {
        sequenceJM.breakLines(sequenceJM.lines[i], 2000, TWEEN.Easing.Exponential.InOut);
    }
});*/

for (var i=0; i<sequenceJM.lines.length; i++) {
    sequenceJM.addEvent('00:22:20', sequenceJM.breakLines, [sequenceJM.lines[i], 1250, TWEEN.Easing.Quadratic.InOut]);
}


// Merge lines
for (var i=0; i<sequenceJM.lines.length; i++) {
    sequenceJM.addEvent('00:25:15', sequenceJM.mergeLines, [sequenceJM.lines[i], 1750, TWEEN.Easing.Quadratic.InOut]);
}

sequenceJM.addEvent('00:21:00', sequenceJM.cameraMovement, [sequenceJM.camera, false, 0, 20, 0, 4000, TWEEN.Easing.Exponential.InOut]);

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJM);