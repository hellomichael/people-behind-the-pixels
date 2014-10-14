

var Tetramid = function(height) {

	var mtl = new THREE.MeshBasicMaterial({ color:0x666666 });
	var geo = new THREE.BoxGeometry(1, 1, 1);
	var width = height * 2;

	this.height = height;
	this.group = new THREE.Object3D();
	this.rows = [];	

	for (var i = 0; i < width; i++) {

		var col = [];
		var count = i <= height ? i : height - (i - height);

		for (var j = 0; j < count; j++) {

			var mesh = new THREE.Mesh(geo, mtl);
			// mesh.position.set(i, j, 0);
			col.push({ mesh:mesh, destination:new THREE.Vector3(i,j,0) });

			// this.group.add(mesh);
		}

		this.rows.push(col);
	}
}


Tetramid.prototype.drop = function(hz) {

	var context = this;

	// this.rows.forEach(function(col) {
	// 	col.forEach(function(data) {

	// 		context.group.add(data.mesh);

	// 		var tween = new TWEEN.Tween(data.mesh.position)
	// 			.to({ y: })
	// 	});
	// });
}


/*----------------------------------------------------------------------------*/


var Speaker16 = function() {

	this.scene = speaker15.scene;
	this.camera = speaker15.camera;
	this.square = speaker15.square;
	this.cube = speaker15.cube;

	// this.scene = new THREE.Scene();
	// this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 256);

	this.addEvent('00:04:00', function() {

		this.scene.remove(this.square);
		this.scene.remove(this.cube);

		var tetramid = new Tetramid(32);
		this.scene.add(tetramid.group);

		tetramid.drop(100);
	});
}


Speaker16.prototype = new Sequence();


Speaker16.prototype.update = function(delta) {

}


var speaker16 = new Speaker16();
sequences.push(speaker16);