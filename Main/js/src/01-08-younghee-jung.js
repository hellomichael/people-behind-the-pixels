

var Speaker08 = function() {

	this.init();

};


Speaker08.prototype = new Sequence();


Speaker08.prototype.init = function() {

	// cam/scene/controls
	var scene = new THREE.Scene();
	// scene.fog = new THREE.Fog(0x050505, 0, 7);
	scene.fog = new THREE.FogExp2(0x050505, 0.2);
	
	var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 50);	
	// var aspect = window.innerWidth / window.innerHeight;
	// var camera = new THREE.OrthographicCamera(-5, 5, 5, -5, -100, 100);
	camera.position.set(7, 2, 0);
	camera.lookAt(new THREE.Vector3(0, 2, 0));	
	
	scene.add(camera);

	// var controls = new THREE.OrbitControls(camera);
	// controls.target.set(0, 1, 0);

	// directional light
	var dlight = new THREE.DirectionalLight(0xffffff, 1);
	dlight.position.set(2, 6, -2.5);
	scene.add(dlight);
	scene.add(new THREE.AmbientLight(0x050505, 1));

	// polyflower
	var polyflower = new Polyflower();
	scene.add(polyflower.group);	

	// emitter
	var emitter = new Emitter();
	scene.add(emitter.group);

	// particulators
	var disc1 = THREE.ImageUtils.loadTexture("shared/img/disc.png");
	var disc2 = THREE.ImageUtils.loadTexture("shared/img/disc2.png");

	this.particulatorA = new Particulator(16, 500, new THREE.Vector3(0.05, 0.2, 0.08), disc1, new THREE.Color(0x662230), camera);
	scene.add(this.particulatorA.pointCloud);

	this.particulatorB = new Particulator(16, 500, new THREE.Vector3(0.02, 0.2, -0.05), disc2, new THREE.Color(0x323240), camera);
	scene.add(this.particulatorB.pointCloud);

	// members
	this.scene = scene;	
	this.camera  = camera;
	this.polyflower = polyflower;
	this.emitter = emitter;

	// assume control of renderator
	this.addEvent('00:00:01', function() {
		renderator.reset(this.scene, this.camera);
	});

	this.addEvent('00:00:15', function() { this.polyflower.trigger(); });
	this.addEvent('00:00:15', function() { this.polyflower.volglow.bloom(); });
	this.addEvent('00:00:15', function() { this.polyflower.volmain.bloom(); });
	this.addEvent('00:00:10', function() { this.emitter.trigger(); });
	this.addEvent('00:01:00', function() { this.panUp(); });
};


Speaker08.prototype.update = function(delta) {

	this.polyflower.update(delta);
	this.emitter.update(delta);
	this.particulatorA.update(delta);
	this.particulatorB.update(delta);
};


Speaker08.prototype.panUp = function() {

	var context = this;
	var panTween = new TWEEN.Tween({ y: context.camera.position.y })
		.to({ y: 3 }, 3500)
		.easing(TWEEN.Easing.Quadratic.In)
		.onUpdate(function() {
			context.camera.position.setY(this.y);
		})
		.start();
};

var speaker08 = new Speaker08();
sequences.push(speaker08);