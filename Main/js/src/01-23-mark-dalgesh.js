

var disc1 = THREE.ImageUtils.loadTexture("shared/img/disc.png");
var disc2 = THREE.ImageUtils.loadTexture("shared/img/disc2.png");


/*----------------------------------------------------------------------------*/


var Speaker23 = function() {

	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.FogExp2(0x000000, 0.02);

	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 256);
	this.camera.position.set(0, 12, 0);
	this.camera.lookAt(new THREE.Vector3(0, 12, 1));
	this.scene.add(this.camera);

	// var controls = new THREE.OrbitControls(this.camera);

	// hexgrid
	this.hexgrid = new Hexgrid(0.9, 1, 48, 80);
	this.hexgrid.group.position.set(0, 0, 24 + 40);
	this.scene.add(this.hexgrid.group);

	this.ambient = new THREE.AmbientLight({ color:0x333333 });
	this.scene.add(this.ambient);

	// particles
	this.particulator = new Particulator(80, 1200, new THREE.Vector3(0.03, 0.4, -0.2), disc2, new THREE.Color(0x323240), this.camera);
	this.scene.add(this.particulator.pointCloud);

	// assume control of renderator
	this.addEvent('00:00:05', function() {
		
		renderator.reset(this.scene, this.camera);

		var context = this;
		var camtween = new TWEEN.Tween({ x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z  })
			.to({ x: -3, y: 12, z: 0 }, 4000)
			.onUpdate(function() {
				context.camera.position.set(this.x, this.y, this.z);
			}).start();
	});

	// this.addEvent('00:02:05', function() {

	// 	this.hexgrid.beat();
	// });
}


Speaker23.prototype = new Sequence();

Speaker23.prototype.update = function(delta) {

	this.particulator.update(delta);
}


var speaker23 = new Speaker23();
sequences.push(speaker23);