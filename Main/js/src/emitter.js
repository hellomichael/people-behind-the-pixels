
var Emitter = function(src, accel, hz) {

	this.src = src || new THREE.Vector3(0, -0.7, 0);
	this.accel = accel || new THREE.Vector3(0, 1.5, 0);
	this.hz = hz || 0.1;
	this.delay = 1 / this.hz;
	this.pending = 0;
	this.triggered = false;

	this.group = new THREE.Object3D();
}

Emitter.prototype.trigger = function() {

	// this.cube = new THREE.Mesh(
	// 	new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color:0xffffff }));

	this.triggered = true;
}

Emitter.prototype.update = function(delta) {

	var color = 0xbbbbbb;

	if (this.triggered) {
		if (!delta) {
			delta = 0;
		}

		this.pending += delta;

		if (this.pending > this.delay) {

			var mesh;

			mesh = new IcosahedronMesh(0, 0, 0, 0.25);

			var fullRot = Math.PI * 2;
			mesh.rotAccel = new THREE.Vector3(Math.random(), Math.random(), Math.random());
			mesh.rotation.set(Math.random() * fullRot, Math.random() * fullRot, Math.random() * fullRot);


			mesh.position.set(
				0,
				0,
				1.5);


			/*mesh.position.set(
				Math.random() * _.random(-1, 1),
				0,
				Math.random() * _.random(1, 1));*/

			this.group.add(mesh);

			mesh.scale.set();
			var scaleTween = new TWEEN.Tween({ scale: 0 })
			.to({ scale: 1}, 300)
		    .onUpdate(function () {
				mesh.scale.set(this.scale, this.scale, this.scale);
		    })
		    .start();

			this.pending = 0;
		}

		var disp = this.accel.clone().multiplyScalar(delta);

		for (var i = 0; i < this.group.children.length; i++) {

			var mesh = this.group.children[i];

			var rot = mesh.rotAccel.clone().multiplyScalar(delta);

			mesh.position.add(disp);
			mesh.rotation.x += rot.x;
			mesh.rotation.y += rot.y;
			mesh.rotation.z += rot.z;
		}
	}
}