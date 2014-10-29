var dialogtex = THREE.ImageUtils.loadTexture("shared/img/dialog.png");
var glassestex = THREE.ImageUtils.loadTexture("shared/img/glasses.png");
dialogtex.magFilter = glassestex.magFilter = THREE.NearestFilter;
dialogtex.minFilter = glassestex.minFilter = THREE.LinearMipMapLinearFilter;

var SequenceCrash = function() {

	var context = this;

	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.FogExp2(0x222222, 0.02);

	var ratio = window.innerWidth / window.innerHeight;
	var vertOffset = window.innerHeight / 2;
	this.camera = new THREE.OrthographicCamera(-vertOffset * ratio, vertOffset * ratio, vertOffset, -vertOffset, -50, 400);
	// this.camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 256);
	this.camera.position.set(0, 0, 1);
	// this.camera.lookAt(new THREE.Vector3(4, -0.5));
	this.scene.add(this.camera);

	// var controls = new THREE.OrbitControls(this.camera);

	this.bg = new THREE.Mesh(
		new THREE.PlaneGeometry(4048, 4048, 1, 1),
		new THREE.MeshBasicMaterial({ color: 0xe6e6e6 }));
	this.bg.position.setZ(-5);
	this.scene.add(this.bg);


	this.dialog = new THREE.Mesh(
		new THREE.PlaneGeometry(548, 212, 1, 1),
		new THREE.MeshBasicMaterial({ map: dialogtex }));
	this.dialog.position.setZ(-4);
	this.scene.add(this.dialog);

	this.glasses = new THREE.Mesh(
		new THREE.PlaneGeometry(68, 14, 1, 1),
		new THREE.MeshBasicMaterial({ map: glassestex, transparent: true }));
	this.glasses.position.set(4, 66, 0);
	this.glasses.visible = false;
	this.scene.add(this.glasses);

	var positions = [];
	var target = new THREE.Vector3(4, 66, 0);
	var dist = (window.innerHeight / 2 - target.y) / 5 ;
	for (var i = 0; i < 5; i++) {
		positions.push(new THREE.Vector3(target.x, target.y + i * dist, target.z));
	}

	var activateSound = new Audio('shared/audio/glasses.mp3');
	var blipSound = new Audio('shared/audio/blip018.mp3');
	var musicSound = new Audio('shared/audio/logo.mp3');
	var crashSound = new Audio('shared/audio/crash.mp3');

	this.addEvent('02:17:00', function() {
		crashSound.play();
		pbtp.audio.mute();

		renderator.reset(this.scene, this.camera, {
            postProcessEnabled      : false,

            blurEnabled             : false,
            blurAmount              : false,
            blurPosition            : false,

            bloomEnabled            : false,
            aaEnabled               : false,
            noiseEnabled			: true
        });
	});

	this.addEvent('02:22:00', function() {
		this.glasses.visible = true;
		this.glasses.position.copy(positions[4]);
		blipSound.play();
	});

	this.addEvent('02:23:00', function() {
		this.glasses.position.copy(positions[3]);
		blipSound.play();
	});

	this.addEvent('02:24:00', function() {
		this.glasses.position.copy(positions[2]);
		blipSound.play();
	});

	this.addEvent('02:25:00', function() {
		this.glasses.position.copy(positions[1]);
		blipSound.play();
	});

	this.addEvent('02:26:00', function() {
		this.glasses.position.copy(positions[0]);
		blipSound.play();
	});

	this.addEvent('02:26:25', function() {
		var left = 4;
		var iRatio = window.innerHeight / window.innerWidth;

		new TWEEN.Tween(this.camera)
			.to({ left: -left, right: left, top: iRatio * left, bottom: iRatio * -left }, 1250)
			.onUpdate(function() { context.camera.updateProjectionMatrix(); })
			.easing(TWEEN.Easing.Quadratic.InOut)
			.start();

		var yOffset = (left * iRatio) - 1;
		var pixelLoc = new THREE.Vector3(1, 64, 0);
		var zoomTarget = pixelLoc.clone().add(new THREE.Vector3(5, yOffset));

		new TWEEN.Tween(this.camera.position)
			.to(zoomTarget, 1250)
			 .easing(TWEEN.Easing.Quadratic.InOut)
			.start();
	});
}

SequenceCrash.prototype = new Sequence();


SequenceCrash.prototype.update = function(delta) {

}


var sequenceCrash = new SequenceCrash();
timeline.push(sequenceCrash);