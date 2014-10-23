
function createPyramid(height) {

	var mtl = new THREE.MeshPhongMaterial({ color:0x666666 });
	// var geo = new THREE.BoxGeometry(1, 1, 1);
	var width = height * 2 - 1;
	var group = new THREE.Object3D();
	var rowWidth = width;

	for (var i = 0; i < height; i++) {

		var geo = new THREE.BoxGeometry(rowWidth, 1, rowWidth);
		var mesh = new THREE.Mesh(geo, mtl);

		mesh.position.setY(i - height / 2);

		// for (var j = 0; j < rowWidth; j++) {

		// 	var mesh = new THREE.Mesh(geo, mtl);

		// 	mesh.position.set(j - rowWidth / 2, i - height / 2, 0)

			group.add(mesh);
		// }

		rowWidth -= 2;
	}

	return group;
}


/*----------------------------------------------------------------------------*/


var Speaker17 = function() {

	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.FogExp2(0x050505, 0.1);

	// this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 256);
	var ratio = window.innerWidth / window.innerHeight;

	var vertOffset = 3;

	this.camera = new THREE.OrthographicCamera(-vertOffset * ratio, vertOffset * ratio, vertOffset, -vertOffset, -200, 200);
	this.camera.position.set(0, 51, 0);
	// this.camera.lookAt(new THREE.Vector3());
	this.scene.add(this.camera);

	// var controls = new THREE.OrbitControls(this.camera);

	// this.particulator = new Particulator(32, 200, new THREE.Vector3(0.05, 0.2, 0.08), disc2, new THREE.Color(0x662230), this.camera, 0.2);
	// this.scene.add(this.particulator.pointCloud);

	this.ambient = new THREE.AmbientLight(0x020202);
	this.scene.add(this.ambient);

	this.dl = new THREE.DirectionalLight(0xffffff, 1);
	this.dl.position.set(-1, 3, 2);
	this.scene.add(this.dl);

	this.pyramid = createPyramid(100);		
	// this.pyramid.scale.set(0.01, 0.015, 0.01);
	this.scene.add(this.pyramid);

	for (var i = 1; i <= 2; i++) {
		this.pyramid.children[this.pyramid.children.length - i].visible = false;
	}

	var geo = new THREE.BoxGeometry(1,1,1);
	var mtl = new THREE.MeshPhongMaterial({color:0x666666});

	var c1 = new THREE.Mesh(geo,mtl);
	c1.position.set(0, 48, 0);
	this.scene.add(c1);

	var c2 = new THREE.Mesh(geo,mtl);
	c2.position.set(-1, 52, 0);
	this.scene.add(c2);

	var c3 = new THREE.Mesh(geo,mtl);
	c3.position.set(1, 50, 0);
	this.scene.add(c3);

	var c4 = new THREE.Mesh(geo,mtl);
	c4.position.set(0, 54, 0);
	this.scene.add(c4);


	var pyrmgeo = new THREE.CylinderGeometry(0, 141.42135623730950488016887242097, 100, 4, 1, false);	
	this.solidPyramid = new THREE.Mesh(pyrmgeo, new THREE.MeshLambertMaterial({ color:0x333333, shading:THREE.FlatShading }));
	this.solidPyramid.visible = false;
	this.solidPyramid.rotation.y = Math.PI / 4;
	this.scene.add(this.solidPyramid);


	var context = this;

	this.addEvent('00:00:00', function() {

		renderator.reset(this.scene, this.camera);		

		var tweenA = new TWEEN.Tween(c2.position)
			.to({ y: 48 }, 2000)
			.start();

		var tweenB = new TWEEN.Tween(c3.position)
			.to({ y: 48 }, 1000)
			.start();
		
		var tweenC = new TWEEN.Tween(c4.position)
			.to({ y: 49 }, 2500)
			.start();


		var camTween = new TWEEN.Tween(this.camera.position)
			.to({ y: 20 }, 6000)			
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(function() {
				// context.camera.lookAt(0, 100, 0);
			})
			.start();		
	});


	this.addEvent('00:01:00', function() {

		var zoomOffset = 200;
		var zoomTween = new TWEEN.Tween(this.camera)
			.to({ left: (-zoomOffset * ratio), right: (zoomOffset * ratio), top: zoomOffset, bottom: -zoomOffset }, 8000)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(function() { context.camera.updateProjectionMatrix(); })
			.start();

		// this.camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 0.1, 256);
		// this.camera.position.set(0, 48, -1000000);
		// this.camera.lookAt(new THREE.Vector3(0, 48, 0));
		// renderator.reset(this.scene, this.camera);

	});

	this.addEvent('00:05:00', function() {

		for (var i = 1; i <= 2; i++) {
			this.pyramid.children[this.pyramid.children.length - i].visible = true;
		}

		c1.visible = c2.visible = c3.visible = c4.visible = false;
		
		// var camTween = new TWEEN.Tween(this.camera.position)
		// 	.to({ x: -100 }, 3000)
		// 	.easing(TWEEN.Easing.Quadratic.InOut)
		// 	.onUpdate(function() {

		// 		// context.camera.lookAt(0, 0, 0);
		// 		// context.camera.updateProjectionMatrix();
		// 	})
		// 	.start();
	});

	this.addEvent('00:08:00', function() {

		// this.solidPyramid.visible = true;

	});
}


Speaker17.prototype = new Sequence();


Speaker17.prototype.update = function(delta) {

	// this.particulator.update(delta);
}


var speaker17 = new Speaker17();
sequences.push(speaker17);