/******************************
* Extend Scene Prototype
******************************/
var SequenceJH2 = function() {
    this.sequence = [];
    this.init();
};

SequenceJH2.prototype = new Sequence();

SequenceJH2.prototype.init = function() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 5, 1000);
    this.camera.position.y = -1;
    this.camera.position.z = 10;
    this.camera.rotation.z = Util.toRadians(-20);
    this.screenDimensions = Util.getScreenDimensions(this.camera, 0, 0);

    // Renderator
    renderator.reset(this.scene, this.camera,
        {
            postProcessEnabled      : false,

            blurEnabled             : false,
            blurAmount              : false,
            blurPosition            : false,

            bloomEnabled            : false,
            aaEnabled               : false
        }
    );

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 'white', transparent: true});

    // Particulator
    /*this.particulator = new Particulator(80, 1200, new THREE.Vector3(0.03, 0.4, -0.2), THREE.ImageUtils.loadTexture('shared/img/particle.png'), new THREE.Color(0x323240), this.camera);
    this.scene.add(this.particulator.pointCloud);*/

    /******************************
    * Add Objects
    ******************************/
    var offsetX = -5;

    this.dacrocyte1 = new DacrocyteLine(5, this.screenDimensions[0] - offsetX + 100 , this.screenDimensions[1]);
    this.dacrocyte2 = new DacrocyteLine(5, this.screenDimensions[0] - offsetX + 75, this.screenDimensions[1]);
    this.dacrocyte3 = new DacrocyteLine(5, this.screenDimensions[0] - offsetX + 50, this.screenDimensions[1]);

    this.dacrocyte1.position.x = offsetX;
    this.dacrocyte2.position.x = offsetX;
    this.dacrocyte3.position.x = offsetX;

    this.dacrocyte1.position.y = 0;
    this.dacrocyte2.position.y = -1;
    this.dacrocyte3.position.y = -2;

    this.scene.add(this.dacrocyte1);
    this.scene.add(this.dacrocyte2);
    this.scene.add(this.dacrocyte3);
};

/******************************
* Create Animations
******************************/
SequenceJH2.prototype.drawLine = function(line, duration, easing) {
    // Hide all vertices
    for (var i=0; i<line.segments; i++) {
        line.geometry.vertices[i].x = 0;
        line.geometry.vertices[i].y = 0;
    }

    this.tween = new TWEEN.Tween({segments: 0})
        .to({segments: line.segments}, duration)
        .onUpdate(function () {
            // Place segement vertices in the right position
            for (var i=0; i<~~this.segments; i++) {
                line.geometry.vertices[i].x = line.geometry.verticesClone[i].x;
                line.geometry.vertices[i].y = line.geometry.verticesClone[i].y;
            }

            // Place all other vertices at 0;
            for (var i=~~this.segments; i<line.segments; i++) {
                line.geometry.vertices[i].x = line.geometry.verticesClone[~~this.segments].x;
                line.geometry.vertices[i].y = line.geometry.verticesClone[~~this.segments].y;
            }

            line.geometry.verticesNeedUpdate = true;
        })
    .start();
};

/******************************
* Add Events
******************************/
var sequenceJH2 = new SequenceJH2();


sequenceJH2.addEvent('00:00:15', function () {
    sequenceJH2.drawLine(sequenceJH2.dacrocyte1, 4000, TWEEN.Easing.Exponential.Out);
    sequenceJH2.drawLine(sequenceJH2.dacrocyte2, 4000, TWEEN.Easing.Exponential.Out);
    sequenceJH2.drawLine(sequenceJH2.dacrocyte3, 4000, TWEEN.Easing.Exponential.Out);
});

sequenceJH2.addEvent('00:00:05', function () {
    sequenceJH2.rotate(sequenceJH2.camera, 0, 0, Util.toRadians(0), 3000, TWEEN.Easing.Back.Out);
    sequenceJH2.cameraMovement(sequenceJH2.camera, false, 0, 2, 0, 3000, TWEEN.Easing.Quadratic.InOut);
});

sequenceJH2.addEvent('00:01:05', function () {
    sequenceJH2.cameraMovement(sequenceJH2.camera, false, 110, 0, 0, 5000, TWEEN.Easing.Quadratic.InOut);
});

/*sequenceJH2.addEvent('00:00:05', function () {
    sequenceJH2.rotate(sequenceJH2.camera, 0, 0, Util.toRadians(0), 1500, TWEEN.Easing.Back.Out);

    sequenceJH2.cameraMovement(sequenceJH2.camera, false, 0, 2, 0, 1250, TWEEN.Easing.Exponential.Out, function () {
        sequenceJH2.cameraMovement(sequenceJH2.camera, false, 500, 0, 0, 4500, TWEEN.Easing.Exponential.InOut);
    });
});
*/
/*var jessicaHische = new Glitch ('JESSICA HISCHE', 150, -10);
sequenceJH2.addEvent('00:31:15',
function() {jessicaHische.animateIn()});
sequenceJH2.addEvent('00:35:15',
    function() {jessicaHische.animateOut()})*/

/******************************
* Add to Timeline
******************************/
timeline.push(sequenceJH2);