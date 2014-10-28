var Photon = function(loc, vel, radius) {

	this.group = new THREE.Object3D();
	this.location = loc;

	// pointlight
	this.pl = new THREE.PointLight(0xffffff, 9, 5);
	this.pl.position.set(loc.x, loc.y, 1);
	this.group.add(this.pl);

	// pointcloud vert
	photonPc.geometry.vertices.push(this.location);

	this.vel = vel;
	this.radius = radius;
}


Photon.prototype.pulse = function() {

	this.tweenFunc(this.location, this.vel, this.radius);
}


Photon.prototype.tweenFunc = function(loc, vel, dist) {

	var velmag = vel.length();

	if (velmag < 0.01) return;

	var u = dist / velmag;
	var context = this;

	var tween = new TWEEN.Tween( loc )
	.to({ x: loc.x + vel.x * u, y: loc.y + vel.y * u, z: loc.z }, 80 * u)
	.onUpdate(function() {

		context.pl.position.set(this.x, this.y, 0.5);
		photonPc.geometry.verticesNeedUpdate = true;

	})
	.onComplete(function () {

		var rnd = Math.random();

		vel.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 3 * (rnd > 0.5 ? 1 : -1));
		vel.multiplyScalar(0.8);

		context.tweenFunc(this, vel, dist);
	})
	.start();
}


/*----------------------------------------------------------------------------*/


function OldGetHexagon(innerRadius, outerRadius, material) {

	var slice = Math.PI / 3;
	var geometry = new THREE.Geometry();
	// var material = new THREE.LineBasicMaterial();
	// var material = new THREE.MeshBasicMaterial({ color: 0x777777, side: THREE.DoubleSide });

	// var innerRadius = 0.9; //0.975;
	// var outerRadius = 1.00;

	for (var k = 0; k < 6; k++) {

		var theta = slice * k + Math.PI/2;

		geometry.vertices.push(new THREE.Vector3(
			innerRadius * Math.sin(theta), 0, innerRadius * Math.cos(theta)));

		geometry.vertices.push(new THREE.Vector3(
			outerRadius * Math.sin(theta), 0, outerRadius * Math.cos(theta)));

		var curinsertindex = k * 2;
		var fA = k * 2;
		var fB = k * 2 + 1;
		var fC = ((k + 1) % 6) * 2;
		var fD = ((k + 1) % 6) * 2 + 1;

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

		// geometry.no
	}

	return new THREE.Mesh(geometry, material);
};


/*----------------------------------------------------------------------------*/

var disc1 = THREE.ImageUtils.loadTexture("shared/img/particle.png");

var photonPc;


var SequencePT = function() {

	this.scene = new THREE.Scene();
	this.scene.fog = null;

	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 256);
	this.camera.position.set(1.5, 1.2, 18);
	this.camera.lookAt(new THREE.Vector3(1.5, 1.2, 0));
	this.scene.add(this.camera);

	// var controls = new THREE.OrbitControls(this.camera);


	var vShader = [
		"uniform float theta;",
		"uniform float amp;",
		"uniform float falloff;",
		"uniform vec3 focus;",
		"const float ninety = 3.14159 / 2.0;",
		"void main() {",
			"vec3 rel = position - focus;",
			"float d = sqrt(rel.z * rel.z + rel.x * rel.x) * 2.0;",
			"float decay = cos((clamp(d, 0.0, falloff) / falloff) * ninety);",



			"vec4 displaced = vec4(position, 1.0);",
			"displaced.y += sin(theta + d) * amp * decay;",
			"gl_Position = projectionMatrix * modelViewMatrix * displaced;",
		"}"
	].join("\n");

	var fshader = [
		"const float fogDepth = 50.0;",
		"void main() {",
			// "float l = gl_FragCoord.z / 2.0;",
			"float l = 0.5;",
			"gl_FragColor = vec4(l, l, l, 1.0);",
		"}"
	].join('\n');


	this.theta = 0;
	this.material = new THREE.ShaderMaterial({
		uniforms: {
			theta: { type: 'f', value: this.theta },
			amp: { type: 'f', value: 0 },
			falloff: { type: 'f', value: 40 },
			focus: { type: 'v3', value: new THREE.Vector3(1.5, 1, 0) }
		},
	 	vertexShader: vShader,
	 	fragmentShader: fshader,
	 	wireframe: false });


	// hexgrid
	// var mtl = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
	this.hexgrid = new Hexgrid(0.98, 1, 24, 24, this.material);
	// this.hexgrid.material.color.setHex(0x222222);
	this.hexgrid.group.rotation.x = Math.PI / 2;
	this.hexgrid.group.position.set(0, 1, 0);
	this.scene.add(this.hexgrid.group);


	// center
	this.centerMtl = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
	this.centerhex = OldGetHexagon(0.85, 1, this.centerMtl);
	this.centerhex.position.set(1.5, 1, 0.1);
	this.centerhex.rotation.x = Math.PI / 2;
	this.centerhex.wobbling = false;
	this.scene.add(this.centerhex);

	this.ambient = new THREE.AmbientLight(0x666666);
	this.scene.add(this.ambient);

	// photons
	var pcgeo = new THREE.Geometry();
	var pcmtl = new THREE.PointCloudMaterial({
		size: 0.3,
		sizeAttenuation: true,
		map: disc1,
		transparent: true,
		blending: THREE.AdditiveBlending,
		color: 0xffffff });
	photonPc = new THREE.PointCloud(pcgeo, pcmtl);
	this.pointCloud = photonPc;

	var slice = Math.PI / 3;
	var photons = [];

	for (var i = 0; i < 200; i++) {

		var theta = slice * i;

		var hexp = new THREE.Vector3(Math.cos(theta), Math.sin(theta), -0.1);
		var loc = hexp.clone().add(this.centerhex.position);
		var vel = hexp.multiplyScalar(Math.random() + 1.0);

		var photon = new Photon(loc, vel, 1);
		photons.push(photon);
	}

	var context = this;
	var theta = 0;

	// events
	this.addEvent('00:00:01', function() {
		$('#speakers').css('z-index', 10);

		renderator.reset(this.scene, this.camera, {
            postProcessEnabled      : true,

            blurEnabled             : false,
            blurAmount              : false,
            blurPosition            : false,

            bloomEnabled            : true,
            aaEnabled               : true
        });

		var camtween = new TWEEN.Tween(this.camera.position)
			.to({ x: 1.5, y: 1.2, z: 16}, 8000)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(function() {
				context.camera.position.set(this.x, this.y, this.z);
			}).start();
	});


	var glitchMD = new Glitch ('HADI MICHAEL', 0, 150);
    this.addEvent('00:02:00', function() {glitchMD.animateIn()});
    this.addEvent('00:08:00', function() {glitchMD.animateOut()});

	var glitchHM = new Glitch ('MARK DALGLEISH', 0, 150);
    this.addEvent('00:08:00', function() {glitchHM.animateIn()});
    this.addEvent('00:12:00', function() {glitchHM.clear()});



	this.addEvent('00:08:00', function() {
		var camtween = new TWEEN.Tween(this.camera.position)
			.to({ x: 1.5, y: 1.2, z: 20}, 500)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onUpdate(function() {
				context.camera.position.set(this.x, this.y, this.z);
			}).start();
	});

	this.addEvent('00:08:15', function() {
		var camtween = new TWEEN.Tween(this.camera.position)
			.to({ x: 1.5, y: 1.2, z: 22}, 8000)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onUpdate(function() {
				context.camera.position.set(this.x, this.y, this.z);
			}).start();
	});









	this.addEvent('00:08:00', function() {

		this.centerhex.wobbling = true;

		new TWEEN.Tween(this.material.uniforms["amp"])
			.to({ value: 2 }, 200)
			.start();

		new TWEEN.Tween(this.material.uniforms["falloff"])
			.to({ value: 40 }, 500)
			.start();


		context.scene.add(photonPc);

		photons.forEach(function(photon) {
			photon.pulse();
			context.scene.add(photon.group);
		});

		var startValue = renderator.bloomPass.copyUniforms["opacity"].value;

		var bloomTween = new TWEEN.Tween({ opacity: startValue, scale: 1 })
			.to({ opacity: 40, scale: 1.6 }, 50)
			.onUpdate(function() {

				renderator.bloomPass.copyUniforms["opacity"].value = this.opacity;
				context.centerhex.scale.set(this.scale, 1, this.scale);

			})
			.onComplete(function() {

				var glowTween = new TWEEN.Tween({ opacity: renderator.bloomPass.copyUniforms["opacity"].value, scale: this.scale })
					.to({ opacity: startValue, scale: 1 }, 300)
					.onUpdate(function() {
						renderator.bloomPass.copyUniforms["opacity"].value = this.opacity;
					})
					.start();

				var scaleTween = new TWEEN.Tween({ scale: this.scale })
					.to({ scale: 1 }, 100)
					.onUpdate(function() {
						context.centerhex.scale.set(this.scale, 1, this.scale);
					})
					.start();

			}).start();

		// var photonPush = new TWEEN.Tween(photonPc.position)
		// 	.to({ z: 6 }, 2000)
		// 	.start();

		var photonFade = new TWEEN.Tween(photonPc.material.color)
			.to({ r: 0.1, g: 0.1, b: 0.1 }, 4000)
			.onUpdate(function () {
				photonPc.material.color.set(this.x, this.y, this.z);
			})
			.onComplete(function () {
				photonPc.visible = false;
			})
			.start();
	});
}


SequencePT.prototype = new Sequence();


SequencePT.prototype.update = function(delta) {

	if (!isNaN(delta)) {

		this.theta += -4 * Math.PI * delta;
		this.material.uniforms["theta"].value = this.theta;

		if (this.centerhex.wobbling)
			this.centerhex.position.setZ(Math.cos(this.theta - 0.1) * 2 );
	}
}


var sequencePT = new SequencePT();
timeline.push(sequencePT);