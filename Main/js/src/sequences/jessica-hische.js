/******************************
* Extend Scene Prototype
******************************/
var SequenceJessicaHische = function() {
    this.sequence = [];
    this.init();
};

SequenceJessicaHische.prototype = new Sequence();

/******************************
* Add Objects
******************************/
SequenceJessicaHische.prototype.init = function() {
    // Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 5, 1000);
    renderator.reset(this.scene, this.camera);

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 'white', transparent: true});

    // Camera Positioning
    this.camera.position.z = 10;
    this.screenDimensions = Util.getScreenDimensions(this.camera);

    var offsetX = -5;

    this.dacrocyte1 = new Dacrocyte(5, this.screenDimensions[0] - offsetX + 150 , this.screenDimensions[1]);
    this.dacrocyte2 = new Dacrocyte(5, this.screenDimensions[0] - offsetX + 75, this.screenDimensions[1]);
    this.dacrocyte3 = new Dacrocyte(5, this.screenDimensions[0] - offsetX, this.screenDimensions[1]);

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
* Add Animations
******************************/
SequenceJessicaHische.prototype.drawLine = function(line, duration, easing) {
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
* Initialize New Scene
******************************/
var sequenceJessicaHische = new SequenceJessicaHische();

/******************************
* Add Sequences
******************************/
var speaker = new Glitch ('JESSICA HISCHE', 100, 30);
/*sequenceJessicaHische.addEvent('00:00:01', function() {speaker.animateIn()});
sequenceJessicaHische.addEvent('00:06:00', function() {speaker.animateOut()})*/

sequenceJessicaHische.addEvent('00:00:15', sequenceJessicaHische.drawLine, [sequenceJessicaHische.dacrocyte1, 8600, TWEEN.Easing.Quadratic.InOut]);
sequenceJessicaHische.addEvent('00:00:15', sequenceJessicaHische.drawLine, [sequenceJessicaHische.dacrocyte2, 7000, TWEEN.Easing.Quadratic.InOut]);
sequenceJessicaHische.addEvent('00:00:15', sequenceJessicaHische.drawLine, [sequenceJessicaHische.dacrocyte3, 5000, TWEEN.Easing.Quadratic.InOut]);

sequenceJessicaHische.addEvent('00:02:15', sequenceJessicaHische.cameraMovement, [sequenceJessicaHische.camera, false, 110, 0, 0, 7700, TWEEN.Easing.Quadratic.InOut]);

/******************************
* Add Sequences
******************************/
sequences.push(sequenceJessicaHische);