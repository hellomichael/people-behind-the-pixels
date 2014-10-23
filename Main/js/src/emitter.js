
var Emitter = function(src, accel, hz) {

	this.src = src || new THREE.Vector3(0, -0.7, 0);
	this.accel = accel || new THREE.Vector3(0, 1, 0);
	this.hz = hz || 0.1;
	this.delay = 0;
	this.pending = 0;
	this.triggered = false;
    this.count = 0;

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

		if (this.pending > this.delay && this.count === 0) {

			var mesh;

			mesh = new IcosahedronMesh(0, 0, 0, 0.25);

			var fullRot = Math.PI * 2;
			mesh.rotAccel = new THREE.Vector3(0.3, 0.3, 0.3);
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
			.to({ scale: 2}, 2000)
            .easing(TWEEN.Easing.Quadratic.InOut)
		    .onUpdate(function () {
				mesh.scale.set(this.scale, this.scale, this.scale);
		    })
		    .start();

		    var posTween = new TWEEN.Tween({ position: 0})
			.to({ position: 7}, 7000)
			.easing(TWEEN.Easing.Linear.None)
		    .onUpdate(function () {
				mesh.position.y = this.position;
		    })
		    .start();

			this.pending = 0;
            this.count = 1;
		}

		//var disp = this.accel.clone().multiplyScalar(delta);

		for (var i = 0; i < this.group.children.length; i++) {

			var mesh = this.group.children[i];

			var rot = mesh.rotAccel.clone().multiplyScalar(delta);

			//mesh.position.add(disp);
			mesh.rotation.x += rot.x;
			mesh.rotation.y += rot.y;
			mesh.rotation.z += rot.z;
		}
	}
}