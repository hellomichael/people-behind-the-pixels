
var disc2 = THREE.ImageUtils.loadTexture("shared/img/disc2.png");


var SequenceJCO = function() {

	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.FogExp2(0x222222, 0.1);

	this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 256);
	this.camera.position.set(1, 0, -3.5);
	this.camera.lookAt(new THREE.Vector3(2, 0, 0)); 
	this.scene.add(this.camera);

	// this.particulator = new Particulator(16, 200, new THREE.Vector3(0.05, 0.2, 0.08), disc2, new THREE.Color(0x662230), this.camera, 0.2);
	// this.scene.add(this.particulator.pointCloud);

	// var controls = new THREE.OrbitControls(this.camera);

	this.ambient = new THREE.AmbientLight(0x222222);
	this.scene.add(this.ambient);

	this.dl = new THREE.DirectionalLight(0xffffff, 1);
	this.dl.position.set(-1, 3, -2);
	this.scene.add(this.dl);

	var geo = new THREE.BoxGeometry(1,1,1);
	var mtl = new THREE.MeshPhongMaterial({ color:0xffffff });

	this.cubeA = new THREE.Mesh(geo, mtl);
	this.cubeA.position.setY(2);
	this.scene.add(this.cubeA);

	this.cubeB = new THREE.Mesh(geo, mtl);
	this.cubeB.position.set(4, 6, 4);
	this.scene.add(this.cubeB);

	this.cubeC = new THREE.Mesh(geo, mtl);
	this.cubeC.position.set(-3, 8, 10);
	this.scene.add(this.cubeC);

	this.cubeD = new THREE.Mesh(geo, mtl);
	this.cubeD.position.set(2, 0, 15);
	this.scene.add(this.cubeD);

	this.addEvent('00:00:01', function() {

		renderator.reset(this.scene, this.camera);
		
		var tweenA = new TWEEN.Tween(this.cubeA.position)
			.to({ y: -2 }, 5000)
			.start();

		var tweenD = new TWEEN.Tween(this.cubeD.position)
			.to({ y: -10 }, 5000)
			.start();
		
	});

	this.addEvent('00:01:00', function() {

		var tweenB = new TWEEN.Tween(this.cubeB.position)
			.to({ y: 2 }, 4000)
			.start();

		var tweenC = new TWEEN.Tween(this.cubeC.position)
			.to({ y: 1 }, 4000)
			.start();

	});
}


SequenceJCO.prototype = new Sequence();


SequenceJCO.prototype.update = function(delta) {

	// this.particulator.update(delta);
}


var sequenceJCO = new SequenceJCO();
timeline.push(sequenceJCO);