

/*----------------------------------------------------------------------------*/


var Speaker15 = function() {

	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 256);
	this.camera.position.set(0, 0, 10);
	this.camera.lookAt(new THREE.Vector3());
	this.scene.add(this.camera);

	// var controls = new THREE.OrbitControls(this.camera);

	var cgeo = new THREE.CircleGeometry(1, 64);
	var cmtl = new THREE.MeshBasicMaterial({ color:0x666666 });

	this.c1 = new THREE.Mesh(cgeo, cmtl);
	this.c1.position.setZ(0.6)
	this.scene.add(this.c1);

	this.c2 = new THREE.Mesh(cgeo, cmtl.clone());
	this.c2.position.setZ(0.7);
	this.scene.add(this.c2);

	var sqgeo = new THREE.Geometry();
	sqgeo.vertices.push(new THREE.Vector3(0.5, 0.5, 0.5));
	sqgeo.vertices.push(new THREE.Vector3(0.5, -0.5, 0.5));
	sqgeo.vertices.push(new THREE.Vector3(-0.5, -0.5, 0.5));
	sqgeo.vertices.push(new THREE.Vector3(-0.5, 0.5, 0.5));
	sqgeo.vertices.push(new THREE.Vector3(0.5, 0.5, 0.5));
	var sqmtl = new THREE.LineBasicMaterial({ color:0x666666, wireframe:true });
	this.square = new THREE.Line(sqgeo, sqmtl);
	// this.square.position.set(0, 0, 0);
	this.scene.add(this.square);

	var cgeo = new THREE.BoxGeometry(1,1,1);
	var cmtl = new THREE.MeshPhongMaterial({ color:0x666666 });
	this.cube = new THREE.Mesh(cgeo, cmtl);
	this.scene.add(this.cube);

	this.ambient = new THREE.AmbientLight(0x020202);	
	this.scene.add(this.ambient);

	this.dl = new THREE.DirectionalLight(0xffffff, 1);
	this.dl.position.set(2, 2, 0);
	this.scene.add(this.dl);

	// events
	var context = this;
	this.addEvent('00:00:01', function() {		
		renderator.reset(this.scene, this.camera);
	});

	this.addEvent('00:00:15', function() {

		var c2tween = new TWEEN.Tween(this.c2.position)
			.to({ x: 2}, 1000)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onComplete(function() {

				context.c2.material.color.setHex(0);
				// context.c2.material.blending = THREE.SubtractiveBlending;
				// context.c2.material.needsUpdate = true;

				var reverseTween = new TWEEN.Tween(context.c2.position)
					.to({ x: 0 }, 1000)
					.easing(TWEEN.Easing.Quadratic.In)
					.onComplete(function() {
						context.scene.remove(context.c1);
						context.scene.remove(context.c2);
					})
					.start();
			})
			.start();
	});

	this.addEvent('00:03:00', function() {

		// var cubetween = new TWEEN.Tween(this.cube.position)
		// 	.to({ z: 3 }, 1000)
		// 	.onUpdate(function() {
		// 		context.square.position.set(this.x, this.y, this.z);
		// 		context.camera.lookAt(this);
		// 	})
		// 	.start();

		var camtween = new TWEEN.Tween(this.camera.position.clone())
			.to({ x: 5, y: -1, z: 5 }, 500)
			.easing(TWEEN.Easing.Quadratic.In)
			.onUpdate(function() {
				context.camera.position.copy(this);
				context.camera.lookAt(context.cube.position);				
			})
			.onComplete(function() {

				var nextCamtween = new TWEEN.Tween(this)
					.to({ x: 10, y: 0, z: 0 }, 500)
					.easing(TWEEN.Easing.Quadratic.Out)
					.onUpdate(function() {
						context.camera.position.copy(this);
						context.camera.lookAt(context.cube.position);
					})
					.onComplete(function() {
						// context.camera.lookAt(context.cube.position);
					})
					.start();
			})
			.start();
	});
}


Speaker15.prototype = new Sequence();


Speaker15.prototype.update = function(delta) {

}


var speaker15 = new Speaker15();
sequences.push(speaker15);