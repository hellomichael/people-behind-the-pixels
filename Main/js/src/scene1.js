/******************************
* Extend Scene Prototype
******************************/
var Scene1 = function(name) {
    this.name = name;
    this.sequence = [];
};

Scene1.prototype = new Scene();

var cube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), new THREE.MeshLambertMaterial({color: 'white'}));
cube.overdraw = true;
scene.add(cube);

// Directional light
var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

/******************************
* Add Animations
******************************/
Scene1.prototype.cubeRotate = function() {
    var currentRotation = cube.rotation.x;
    var randomRotation = -1 + Math.random(1)*2;
    var targetRotation = currentRotation + randomRotation;
    var duration = 1500;
    var easing = TWEEN.Easing.Elastic.Out;

    new TWEEN.Tween({rotation: currentRotation})
        .to({rotation: targetRotation}, duration)
        .easing(easing)
        .onUpdate(function () {
            cube.rotation.x = this.rotation;
            cube.rotation.y = this.rotation;
            cube.rotation.z = this.rotation;
        })
        .start();
};

var scene1 = new Scene1('Scene 1');
scenes.push(scene1);

// Automagically create a sequence based on bpm
var bpm = 91;
var startTime = pbtp.utilities.convertToSeconds('00:11:20');
var endTime = pbtp.utilities.convertToSeconds('04:15:26');
var count = 0;
var eyesSwitch = false;

for (var i = startTime; i<endTime; i += 60/bpm) {
    var timeCode = pbtp.utilities.convertToTimecode(i);

    if (count%2 === 0) { // Every 4 beats close/open eyes
        scene1.addSequence(timeCode, 'cubeRotate');
    }

    count++;
}