/*jslint browser: true*/
/*global THREE:false */
/*jshint unused:false*/

'use strict';

function GetHexagon(innerRadius, outerRadius, xOffset, yOffset, geometry) {
	var slice = Math.PI / 3;
	// var geometry = new THREE.Geometry();
	// var material = new THREE.LineBasicMaterial();
	// var material = new THREE.MeshBasicMaterial({ color: 0x777777, side: THREE.DoubleSide });

	// var innerRadius = 0.9; //0.975;
	// var outerRadius = 1.00;

	var vOffset = geometry.vertices.length;

	for (var k = 0; k < 6; k++) {

		var theta = slice * k + Math.PI/2;

		geometry.vertices.push(new THREE.Vector3(
			innerRadius * Math.sin(theta) + xOffset, 0, innerRadius * Math.cos(theta) + yOffset));

		geometry.vertices.push(new THREE.Vector3(
			outerRadius * Math.sin(theta) + xOffset, 0, outerRadius * Math.cos(theta) + yOffset));

		//var curinsertindex = k * 2;
		var fA = k * 2 + vOffset;
		var fB = k * 2 + 1 + vOffset;
		var fC = ((k + 1) % 6) * 2 + vOffset;
		var fD = ((k + 1) % 6) * 2 + 1 + vOffset;

		var f1 = new THREE.Face3(fA, fB, fC, new THREE.Vector3(0, 1, 0));
		f1.vertexNormals.push(new THREE.Vector3(0, 1, 0));
		f1.vertexNormals.push(new THREE.Vector3(0, 1, 0));
		f1.vertexNormals.push(new THREE.Vector3(0, 1, 0));

		var f2 = new THREE.Face3(fB, fD, fC, new THREE.Vector3(0, 1, 0));
		f2.vertexNormals.push(new THREE.Vector3(0, 1, 0));
		f2.vertexNormals.push(new THREE.Vector3(0, 1, 0));
		f2.vertexNormals.push(new THREE.Vector3(0, 1, 0));

		geometry.faces.push(f1);
		geometry.faces.push(f2);
	}
}

var Hexgrid = function(innerRadius, outerRadius, width, depth, material) {

	// this.group = new THREE.Object3D();
	var geometry = new THREE.Geometry();
	this.width = width;
	this.depth = depth;
	this.material = material === undefined ? new THREE.MeshPhongMaterial({ color: 0x777777, side: THREE.DoubleSide }) : material;

	var xoffset = 0;
	var yshift = Math.sin(Math.PI/3);

	for (var i = 0; i < depth; i++) {

		xoffset = xoffset === 1.5 ? 0 : 1.5;

		for (var j = 0; j < width; j++) {

			new GetHexagon(innerRadius, outerRadius, ((j - width/2)*3 + xoffset), ((i - depth/2) * yshift), geometry);
			//var y = 0;//Math.random() * 10;

			// mesh.position.set((j - width/2)*3 + xoffset, y, (i - depth/2) * yshift);

			// this.group.add(mesh);
		}
	}

	this.group = new THREE.Mesh(geometry, material);
};

// Hexgrid.prototype.beat = function() {

// 	var len = this.width * this.depth;
// 	var center = Math.floor(len / 2);

// 	for (var i = 0; i < len; i++) {

// 		var hex = this.group.children[i];

// 		// hex.position.setY(3);

// 		var tween = new TWEEN.Tween({ mag: 0 })
// 			.to({ mag: 10 }, 10000)
// 			.onUpdate(function() {
// 				hex.position.setY(this.mag);
// 				hex.matrixWorldNeedsUpdate = true;
// 			}).start();
// 	}
// };