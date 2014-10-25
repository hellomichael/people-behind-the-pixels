var Speaker25 = function() {

	this.scene = new THREE.Scene();
	// this.scene.fog = new THREE.FogExp2(0x000000, 0.2);

	this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 256);
	this.camera.position.set(5, 3, 3);
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	this.scene.add(this.camera);

	var controls = new THREE.OrbitControls(this.camera);

	this.ambient = new THREE.AmbientLight(0x050505);
	this.scene.add(this.ambient);

	var vShader = [
		"uniform float theta;",
		"const vec3 focus = vec3(0, 0, 0);",
		"const float amp = 0.2;",
		"void main() {",			
			"float d = sqrt(position.x * position.x + position.y * position.y) * 4.0;",

			"vec4 displaced = vec4(position, 1.0);",
			"displaced.z += sin(theta + d) * amp;",
			"gl_Position = projectionMatrix * modelViewMatrix * displaced;",			
		"}"
	].join("\n");

	var fshader = [
		"void main() {",
			"gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);",
		"}"
	].join('\n');

	this.theta = 0;

	this.material = new THREE.ShaderMaterial({
		uniforms: { theta: { type: 'f', value: this.theta } },
	 	vertexShader: vShader, 
	 	fragmentShader: fshader, 
	 	wireframe: true });

	// this.hexgrid = new Hexgrid(0.98, 1, 12, 16);	
	// this.hexgrid.material = this.material;
	// this.hexgrid.group.rotation.x = Math.PI / 2;
	// this.hexgrid.group.position.set(0, 1, 0);
	// this.scene.add(this.hexgrid.group);

	var planeGeo = new THREE.PlaneGeometry(8, 8, 32, 32);
	this.plane = new THREE.Mesh(planeGeo, this.material);
	this.plane.rotation.x = -Math.PI / 2;
	this.scene.add(this.plane);


	this.addEvent('00:00:00', function() {
		
		renderator.reset(this.scene, this.camera);

	});
}



Speaker25.prototype = new Sequence();

Speaker25.prototype.update = function(delta) {

	this.theta += -4 * Math.PI * delta;

	this.material.uniforms["theta"].value = this.theta;
}

var speaker25 = new Speaker25();
sequences.push(speaker25);