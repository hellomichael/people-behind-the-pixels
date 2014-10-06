
function getTriangleNormal(p1, p2, p3) {

	var v = new THREE.Vector3();
	var w = new THREE.Vector3();

	v.subVectors(p2, p1);
	w.subVectors(p3, p1);

	return new THREE.Vector3(
		(v.y * w.z)	- (v.z *w.y),
		(v.z * w.x)	- (v.x *w.z),
		(v.x * w.y)	- (v.y *w.x)
	).normalize();

}


/*----------------------------------------------------------------------------*/


var Prism = function() {

	this.hOffset = 0.7;

	// geometry
	var geo = new THREE.Geometry();
	var slice = Math.PI * 2 / 3;

	var baseVerts = [
		new THREE.Vector3(Math.cos(slice), -this.hOffset, Math.sin(slice)),	
		new THREE.Vector3(Math.cos(slice * 2), -this.hOffset, Math.sin(slice * 2)),
		new THREE.Vector3(Math.cos(slice * 3), -this.hOffset, Math.sin(slice * 3)) 
	];

	geo.vertices.push(baseVerts[0]);
	geo.vertices.push(baseVerts[1]);
	geo.vertices.push(baseVerts[2]);

	// base	
	var baseGeo = geo.clone();	
	baseGeo.faces.push(new THREE.Face3(0, 2, 1));
	this.base = new THREE.Mesh(baseGeo,
		new THREE.MeshBasicMaterial({ color:0xffffff, fog:false }));


	// petals
	geo.vertices.push(new THREE.Vector3(0, this.hOffset, 0));
	geo.vertices.push(new THREE.Vector3(0, this.hOffset, 0));
	geo.vertices.push(new THREE.Vector3(0, this.hOffset, 0));

	geo.faces.push(new THREE.Face3(3, 1, 0));
	geo.faces.push(new THREE.Face3(4, 2, 1));
	geo.faces.push(new THREE.Face3(5, 0, 2));

	this.rotAxes = [
		new THREE.Vector3().subVectors(geo.vertices[1], geo.vertices[0]),
		new THREE.Vector3().subVectors(geo.vertices[2], geo.vertices[1]),
		new THREE.Vector3().subVectors(geo.vertices[0], geo.vertices[2]), ];

	// face normals
	for (var i = 0; i < geo.faces.length; i++) {
		geo.faces[i].normal = getTriangleNormal(
			geo.vertices[geo.faces[i].a],
			geo.vertices[geo.faces[i].b],
			geo.vertices[geo.faces[i].c]);
	}

	// members
	this.solidMesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: 0x999999})); //, side: THREE.DoubleSide }));	
	this.wfMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, fog: false }));
	this.geometry = geo;

	// group
	this.group = new THREE.Object3D();
	this.group.add(this.solidMesh);
	this.group.add(this.wfMesh);
	this.group.add(this.base);

	this.opening = false;
};


Prism.prototype.update = function(delta) {

	var angularV = -1.8 * delta;

	if (this.opening) {

		var geo = this.geometry;

		for (var i = 0; i < 3; i++) {

			var rotAxis = this.rotAxes[i];
			var face = geo.faces[i];
			var apexVert = geo.vertices[face.a];

			apexVert.sub(geo.vertices[face.b]);
			apexVert.applyAxisAngle(rotAxis, angularV);
			apexVert.add(geo.vertices[face.b]);
			
			if (apexVert.y < -this.hOffset) {

				apexVert.setComponent(1, -this.hOffset);
				this.opening = false;
			}

		}

		// face normals
		for (var i = 0; i < geo.faces.length; i++) {
			geo.faces[i].normal = getTriangleNormal(
				geo.vertices[geo.faces[i].a],
				geo.vertices[geo.faces[i].b],
				geo.vertices[geo.faces[i].c]);
		}
		
		geo.normalsNeedUpdate = true;
		geo.verticesNeedUpdate = true;
	}
};


Prism.prototype.open = function() {

	this.opening = true;
};


/*----------------------------------------------------------------------------*/


var Volume = function(upper, lower, height, backface, opacity) {
	
	this.upperTarget = upper || 1;
	this.lowerTarget = lower || 1;
	this.heightTarget = height || 10;

	this.blooming = false;
	this.group = new THREE.Object3D();

	this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: opacity, wireframe: false });	
	this.material.fog = false;

	this.geometry = new THREE.Geometry();
	this.volume = new THREE.Mesh(this.geometry, this.material);	

	this.upperRadius = 0.01;
	this.lowerRadius = 0.01;
	this.height = 10;

	this.hOffset = 0.7;
	var slice = Math.PI * 2 / 3;

	this.geometry.vertices.push(new THREE.Vector3(Math.cos(slice) * this.lowerRadius, -this.hOffset, Math.sin(slice) * this.lowerRadius));
	this.geometry.vertices.push(new THREE.Vector3(Math.cos(slice * 2) * this.lowerRadius, -this.hOffset, Math.sin(slice * 2) * this.lowerRadius));
	this.geometry.vertices.push(new THREE.Vector3(Math.cos(slice * 3) * this.lowerRadius, -this.hOffset, Math.sin(slice * 3) * this.lowerRadius));

	this.geometry.colors.push(new THREE.Color(0xffffff));
	this.geometry.colors.push(new THREE.Color(0xffffff));
	this.geometry.colors.push(new THREE.Color(0xffffff));

	this.geometry.vertices.push(new THREE.Vector3(Math.cos(slice) * this.upperRadius, this.height, Math.sin(slice) * this.upperRadius));
	this.geometry.vertices.push(new THREE.Vector3(Math.cos(slice * 2) * this.upperRadius, this.height, Math.sin(slice * 2) * this.upperRadius));
	this.geometry.vertices.push(new THREE.Vector3(Math.cos(slice * 3) * this.upperRadius, this.height, Math.sin(slice * 3) * this.upperRadius));

	this.geometry.colors.push(new THREE.Color(0x333333));
	this.geometry.colors.push(new THREE.Color(0x333333));
	this.geometry.colors.push(new THREE.Color(0x333333));

	if (backface) {

		this.geometry.faces.push(new THREE.Face3(0, 1, 3));	
		this.geometry.faces.push(new THREE.Face3(3, 1, 4));

		this.geometry.faces.push(new THREE.Face3(1, 2, 4));	
		this.geometry.faces.push(new THREE.Face3(4, 2, 5));

		this.geometry.faces.push(new THREE.Face3(2, 0, 5));	
		this.geometry.faces.push(new THREE.Face3(5, 0, 3));

	} else {

		this.geometry.faces.push(new THREE.Face3(1, 0, 3));	
		this.geometry.faces.push(new THREE.Face3(1, 3, 4));

		this.geometry.faces.push(new THREE.Face3(2, 1, 4));	
		this.geometry.faces.push(new THREE.Face3(2, 4, 5));

		this.geometry.faces.push(new THREE.Face3(0, 2, 5));	
		this.geometry.faces.push(new THREE.Face3(0, 5, 3));
	}
};


Volume.prototype.bloom = function() {
	
	this.group.add(this.volume);

	this.blooming = true;
	this.geometry.verticesNeedUpdate = true;
	this.geometry.facesNeedUpdate = true;

	var context = this;
	var slice = Math.PI * 2 / 3;

	var lowerTween = new TWEEN.Tween({ lowerRadius: this.lowerRadius })
		.to({ lowerRadius: this.lowerTarget }, 200)
		.onUpdate(function () {
			
			var tween = this;

			for (var i = 0; i < 3; i++)
				context.geometry.vertices[i].set(Math.cos(slice * i) * tween.lowerRadius, -context.hOffset, Math.sin(slice * i) * tween.lowerRadius);

			context.volume.geometry.verticesNeedUpdate = true;
		})
		.start();	

	var upperTween = new TWEEN.Tween({ upperRadius: this.upperRadius, height: this.height })
		.to({ upperRadius: this.upperTarget, height: this.heightTarget }, 200)
	    .onUpdate(function() {
			
			var tween = this;

			for (var i = 0; i < 3; i++)
				context.geometry.vertices[i + 3].set(Math.cos(slice * i) * tween.upperRadius, tween.height, Math.sin(slice * i) * tween.upperRadius);

			context.volume.geometry.verticesNeedUpdate = true;
	    })
	    .start();
}


/*----------------------------------------------------------------------------*/


var Polyflower = function() {
	
	this.prism = new Prism();
	this.volmain = new Volume(1, 1, 100, true);
	this.volglow = new Volume(30, 1, 100, true, 0.05);

	this.group = new THREE.Object3D();
	this.group.add(this.prism.group);
	
	this.group.add(this.volmain.group);
	this.group.add(this.volglow.group);
	
}


Polyflower.prototype.trigger = function() {

	this.prism.open();
	// this.volume.bloom();
}


Polyflower.prototype.update = function(delta) {

	this.prism.update(delta);
}



