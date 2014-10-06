

var Speaker09 = function() {

	this.scene = speaker08.scene;
	this.camera = speaker08.camera;
	this.polyflower = speaker08.polyflower;

	this.addEvent('00:04:15', function() {

		this.camera.position.set(3, 10, 2);
		this.camera.lookAt(new THREE.Vector3(2, 10, 0));

		// var controls = new THREE.OrbitControls(this.camera);
		// controls.target.set(0, 5, 0);
		// renderator.reset(this.scene, this.camera);

		this.group = new THREE.Object3D();

		var color = 0xdddddd;

		for (var i = 0; i < 20; i++) {

			var mesh;
			var rnd = Math.random();

			if (rnd < 0.25) {
				mesh = new THREE.Mesh(
					new THREE.BoxGeometry(0.25, 0.25, 0.25), 
					new THREE.MeshPhongMaterial({ color: color }));
			} else if (rnd < 0.5) {
				mesh = new THREE.Mesh(
					new THREE.CylinderGeometry(0.12, 0.12, 0.25, 16, 1), 
					new THREE.MeshPhongMaterial({ color: color }));
			} else if (rnd < 0.75) {
				mesh = new THREE.Mesh(
					new THREE.SphereGeometry(0.15, 12, 10),
					new THREE.MeshPhongMaterial({ color: color }));
			} else if (rnd < 1) {
				mesh = new THREE.Mesh(
					new THREE.CylinderGeometry(0.2, 0, 0.3, 4, 1), 
					new THREE.MeshPhongMaterial({ color: color }));
			}

			mesh.position.set(Math.random() * 6  + 1, Math.random() * 5, -Math.random() * 7 + 1);
			mesh.rotation.set(Math.random() * 2, 3, Math.random() * 2);

			this.group.add(mesh);
		}

		this.scene.add(this.group);

		this.polyflower.group.remove(this.polyflower.volglow.group);
		this.polyflower.volmain.material.transparent = true;
		this.polyflower.volmain.material.opacity = 0.1;
		this.polyflower.volmain.material.fog = true;		
	});

	// this.addEvent('00:04:15', function() { this.panUp(); });
};


Speaker09.prototype = new Sequence();


Speaker09.prototype.panUp = function() {

	var context = this;
	var panTween = new TWEEN.Tween({ z: context.camera.position.z })
		.to({ z: context.camera.position.z + 2 }, 4000)
		// .easing(TWEEN.Easing.Quadratic.In)
		.onUpdate(function() {
			context.camera.position.setZ(this.z);
			context.camera.lookAt(new THREE.Vector3(2, context.camera.position.y, 0));
		})
		.start();
};

var speaker09 = new Speaker09();
sequences.push(speaker09);