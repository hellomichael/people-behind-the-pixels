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
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 0x222222, opacity: 1, transparent: true, side: THREE.DoubleSide});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0x999999);
    this.directionalLight.position.set(0, 10000, 100).normalize();
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(this.ambientLight);

    /******************************
    * Add Objects
    ******************************/
    this.lines = [];
    this.vertices = [new THREE.Vector3(0, 4.7, 0), new THREE.Vector3(2.5, 0, 0), new THREE.Vector3(0, -0.6, 0)];
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
SequenceJM.prototype.animateLines = function(line, duration, easing) {
    /*line.geometry.vertices[0].y = this.vertices[1].y;
    line.geometry.verticesNeedUpdate = true;*/

    new TWEEN.Tween({y: line.geometry.vertices[0].y})
        .to({y: sequenceJM.vertices[1].y}, duration)
        .easing(easing)
        .onUpdate(function () {
            line.geometry.vertices[0].y = this.y;
            line.geometry.verticesNeedUpdate = true;
        })
    .start();
};

/******************************
* Add Events
******************************/
var sequenceJM = new SequenceJM();

sequenceJM.addEvent('00:00:00', function () {
    sequenceJM.nextScene(sequenceJM.scene, sequenceJM.camera, true, true, 2, 0.75);
});

/*var glitchJM = new Glitch ('YOUNGHEE JUNG', 0, -150);
sequenceJM.addEvent('00:03:00', function() {glitchJM.animateIn()});
sequenceJM.addEvent('00:08:00', function() {glitchJM.animateOut()});*/

// Animate lines
for (var i=sequenceJM.lines.length-1; i>=0; i--) {
//for (var i=0; i<sequenceJM.lines.length; i++) {
    console.log(i);
    sequenceJM.addEvent(Util.toTimecode((i * 0.05) + 0.1), sequenceJM.animateLines, [sequenceJM.lines[i], 1000, TWEEN.Easing.Quadratic.InOut]);
}


/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJM);