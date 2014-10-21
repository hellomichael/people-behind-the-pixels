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
    this.vertices = [new THREE.Vector3(0, 4.7, 0), new THREE.Vector3(2.4, 0, 0), new THREE.Vector3(0, -0.75, 0)];
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

    // Cube
    this.hemisphereLeft = new THREE.Mesh(new THREE.SphereGeometry(0.1, 300, 300, Math.PI*2, Math.PI/2), this.lightMaterial);
    this.hemisphereRight = new THREE.Mesh(new THREE.SphereGeometry(0.1, 300, 300, Math.PI*2, Math.PI/2), this.lightMaterial);
    this.hemisphereRight.rotation.y = Util.toRadians(90);

    this.sphere = new THREE.Object3D();
    this.sphere.add(this.hemisphereLeft);
    this.sphere.add(this.hemisphereRight);

    this.sphere.position.y = this.screenDimensions[1] + this.screenDimensions[1]/4 + 0.6;
    this.scene.add(this.sphere);
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

SequenceJM.prototype.bounceSphere = function(sphere, position, duration, easing) {
    new TWEEN.Tween({position: sphere.position.y})
        .to({position: position}, duration)
        .easing(easing)
        .onUpdate(function () {
            sphere.position.y = this.position;
        })
        .start();
};

SequenceJM.prototype.splitSphere = function(sphere, duration, easing) {
    new TWEEN.Tween({position1: 0, position2: 0})
        .to({position1: -3, position2: 3}, duration)
        .easing(easing)
        .onUpdate(function () {
            sphere.children[0].position.x = this.position1;
            sphere.children[1].position.x = this.position2;
        })
        .start();
};

/******************************
* Add Events
******************************/
var sequenceJM = new SequenceJM();

sequenceJM.addEvent('00:17:20', function () {
    sequenceJM.nextScene(sequenceJM.scene, sequenceJM.camera, false, false, false, false);
});

/*var glitchJM = new Glitch ('YOUNGHEE JUNG', 0, -150);
sequenceJM.addEvent('00:03:00', function() {glitchJM.animateIn()});
sequenceJM.addEvent('00:08:00', function() {glitchJM.animateOut()});*/

// Break lines
sequenceJM.addEvent('00:18:00', function () {
    for (var i=0; i<sequenceJM.lines.length; i++) {
        sequenceJM.breakLines(sequenceJM.lines[i], 2000, TWEEN.Easing.Exponential.InOut);
    }
});

// Merge lines
for (var i=0; i<sequenceJM.lines.length; i++) {
    sequenceJM.addEvent('00:20:27', sequenceJM.mergeLines, [sequenceJM.lines[i], 1750, TWEEN.Easing.Quadratic.InOut]);
}

// Ball Drop
/*sequenceJM.addEvent('00:18:08', function () {
    sequenceJM.bounceSphere(sequenceJM.sphere, -this.screenDimensions[1], 3250, TWEEN.Easing.Bounce.Out);
});*/

/*sequenceJM.addEvent('00:14:05', function () {
    sequenceJM.splitSphere(sequenceJM.sphere, 1000, TWEEN.Easing.Exponential.InOut);
    sequenceJM.rotate(sequenceJM.sphere.children[0], 0, Util.toRadians(360), 0, 500, TWEEN.Easing.Exponential.InOut);
    sequenceJM.rotate(sequenceJM.sphere.children[1], 0, Util.toRadians(360), 0, 500, TWEEN.Easing.Exponential.InOut);
});*/

sequenceJM.addEvent('00:17:25', sequenceJM.cameraMovement, [sequenceJM.camera, false, 0, 20, 0, 3000, TWEEN.Easing.Exponential.InOut]);

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJM);