/******************************
* Extend Scene Prototype
******************************/
var SequenceJeriamiahLee = function() {
    this.sequence = [];
    this.init();
};

SequenceJeriamiahLee.prototype = new Sequence();

/******************************
* Add Objects
******************************/
SequenceJeriamiahLee.prototype.init = function() {
    // Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 50);
    renderator.reset(this.scene, this.camera);

    // Materials
    this.lineMaterial = new THREE.LineBasicMaterial({color: 'white'});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(100, 100, 100).normalize();
    this.scene.add(this.directionalLight);

    // Camera Positioning
    this.camera.position.z = 10;

    this.ring1 = new Ring(0, 0, 5, 3);
    this.ring2 = new Ring(0, 0, 5, 3);
    this.ring3 = new Ring(0, 0, 5, 3);
    this.ring4 = new Ring(0, 0, 5, 3);
    this.ring5 = new Ring(0, 0, 5, 3);

    this.scene.add(this.ring1);
    this.scene.add(this.ring2);
    this.scene.add(this.ring3);
    this.scene.add(this.ring4);
    this.scene.add(this.ring5);
};

/******************************
* Add Animations
******************************/
SequenceJeriamiahLee.prototype.rotateRing = function(ring, rotation, distance, duration, easing) {
    new TWEEN.Tween({rotation: 0})
        .to({rotation: rotation}, duration)
        .easing(easing)
        .onUpdate(function (time) {
            // Oscillating distance
            ring.children[0].position.x = Math.sin(time * Util.toRadians(180)) * distance;
            ring.children[1].position.x = Math.sin(time * Util.toRadians(180)) * distance;
            ring.children[2].position.x = Math.sin(time * Util.toRadians(180)) * distance;

            // Rotation
            ring.rotation.z = this.rotation;
        })
    .start();

    new TWEEN.Tween({opacity: 0, opacityHide: 1})
        .to({opacity: 0.25, opacityHide: 0}, 3000)
        .delay(Math.random() * 3000 + 3000)
        .onUpdate(function (time) {
            ring.children[0].material.opacity = this.opacityHide;
            ring.children[1].material.opacity = this.opacityHide;
            ring.children[2].material.opacity = this.opacity;
        })
    .start();
};

/******************************
* Initialize New Scene
******************************/
var sequenceJeriamiahLee = new SequenceJeriamiahLee();

/******************************
* Add Sequences
******************************/
var speaker = new Glitch ('JERIAMIAH LEE', 0, 0);
sequenceJeriamiahLee.addEvent('00:06:00', function() {speaker.animateIn()});
sequenceJeriamiahLee.addEvent('00:11:00', function() {speaker.animateOut()})

sequenceJeriamiahLee.addEvent('00:00:01', sequenceJeriamiahLee.rotateRing, [sequenceJeriamiahLee.ring1, Util.toRadians(Math.random() * 2048), 0.2, 10000, TWEEN.Easing.Quadratic.InOut]);
sequenceJeriamiahLee.addEvent('00:00:05', sequenceJeriamiahLee.rotateRing, [sequenceJeriamiahLee.ring2, Util.toRadians(Math.random() * -2048), -0.2, 10000, TWEEN.Easing.Quadratic.InOut]);
sequenceJeriamiahLee.addEvent('00:00:10', sequenceJeriamiahLee.rotateRing, [sequenceJeriamiahLee.ring3, Util.toRadians(Math.random() * 2048), 0.25, 10000, TWEEN.Easing.Quadratic.InOut]);
sequenceJeriamiahLee.addEvent('00:00:15', sequenceJeriamiahLee.rotateRing, [sequenceJeriamiahLee.ring4, Util.toRadians(Math.random() * -2048), -0.25, 10000, TWEEN.Easing.Quadratic.InOut]);
sequenceJeriamiahLee.addEvent('00:00:05', sequenceJeriamiahLee.rotateRing, [sequenceJeriamiahLee.ring5, Util.toRadians(Math.random() * 2048), -0.2, 10000, TWEEN.Easing.Quadratic.InOut]);

sequenceJeriamiahLee.addEvent('00:00:01', sequenceJeriamiahLee.cameraMovement, [sequenceJeriamiahLee.camera, false, 0, 0, -1.5, 15000, TWEEN.Easing.Quadratic.InOut]);

/******************************
* Add Sequences
******************************/
sequences.push(sequenceJeriamiahLee);