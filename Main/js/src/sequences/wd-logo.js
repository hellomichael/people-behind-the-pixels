
var disc2 = THREE.ImageUtils.loadTexture("shared/img/particle.png");

var SequenceLogo = function() {

	var context = this;

	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.FogExp2(0x222222, 0.02);

	var iRatio = window.innerHeight / window.innerWidth;
	var hOffset = 2;
	this.camera = new THREE.OrthographicCamera(-hOffset, hOffset, hOffset * iRatio, -hOffset * iRatio, -100, 100);

	var zOffset = (hOffset * iRatio) - 0.5;
	this.camera.position.set(1, 0, 0);
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	this.camera.rotation.y = Util.toRadians(5);

	this.camera.position.x = 4.5;

	//this.camera.position.set(4.5, 0, -zOffset);
	this.scene.add(this.camera);

	// var controls = new THREE.OrbitControls(this.camera);

	this.ambient = new THREE.AmbientLight(0x333333);
	this.scene.add(this.ambient);

	this.dl = new THREE.DirectionalLight(0xffffff, 1);
	this.dl.position.set(-4, 8, -1);
	this.scene.add(this.dl);

	this.fadeplane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshBasicMaterial({ color:0x000000, side: THREE.DoubleSide, wireframe: false }));
	this.fadeplane.rotation.x = Math.PI / 2;
	this.fadeplane.position.set(0, -15, 0 );
	this.scene.add(this.fadeplane);

	this.idleTheta = 0;
	this.cameraIdle = false;

	// var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshBasicMaterial());

	var pt1 = new THREE.Object3D();
	pt1.position.set(5, 0, -5);
	// pt1.add(sphere);
	this.scene.add(pt1);

	this.particulator = new Particulator(16, 30, new THREE.Vector3(0.05, 0.2, 0.08), disc2, pt1, 0.15);
    this.particulator.pointCloud.material.color.setHex(0x000000);
    // this.particulator.pointCloud.material.sizeAttenuation = false;
	this.scene.add(this.particulator.pointCloud);

	var musicSound = new Audio('shared/audio/logo.mp3');

	var loader = new THREE.objLoader();
	loader.load("shared/js/objs/Logo.objx", function(obj) {
		context.logo = obj;

		context.logo.children.forEach(function(mesh) {
			mesh.material.side = THREE.DoubleSide;
			mesh.material.color.setHex(0x909090);
		})

		{
			var mtl = new THREE.LineBasicMaterial({ color: 0xd0d0d0 });
			var geo = null;
			var line = null;

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(0.5, -0.5, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -1.5, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -0.5, -0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -1.5, -0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -1.2, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -1.2, -0.5));
			geo.vertices.push(new THREE.Vector3(2.5, 3.5, 0.5));
			geo.vertices.push(new THREE.Vector3(3.5, 3.5, 0.5));
			geo.vertices.push(new THREE.Vector3(2.5, 3.5, -0.5));
			geo.vertices.push(new THREE.Vector3(3.5, 3.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LinePieces));


			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(0.5, 1.5, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, 0.5, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, 0.5, -0.5));
			geo.vertices.push(new THREE.Vector3(0.5, 1.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(1.5, 0.5, 0.5));
			geo.vertices.push(new THREE.Vector3(1.5, 2.8, 0.5));
			geo.vertices.push(new THREE.Vector3(1.5, 2.8, -0.5));
			geo.vertices.push(new THREE.Vector3(1.5, 0.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(1.5, 0.8, 0.5));
			geo.vertices.push(new THREE.Vector3(1.5, 0.8, -0.5));
			geo.vertices.push(new THREE.Vector3(0.5, 0.8, -0.5));
			geo.vertices.push(new THREE.Vector3(0.5, 0.8, 0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-0.5, -0.5, 0.5));
			geo.vertices.push(new THREE.Vector3(1.5, -0.5, 0.5));
			geo.vertices.push(new THREE.Vector3(1.5, -0.5, -0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, -0.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-0.5, -0.2, 0.5));
			geo.vertices.push(new THREE.Vector3(1.5, -0.2, 0.5));
			geo.vertices.push(new THREE.Vector3(1.5, -0.2, -0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, -0.2, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(2.5, -1.5, 0.5));
			geo.vertices.push(new THREE.Vector3(2.5, -3.5, 0.5));
			geo.vertices.push(new THREE.Vector3(2.5, -3.5, -0.5));
			geo.vertices.push(new THREE.Vector3(2.5, -1.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(3.5, -3.2, 0.5));
			geo.vertices.push(new THREE.Vector3(2.5, -3.2, 0.5));
			geo.vertices.push(new THREE.Vector3(2.5, -3.2, -0.5));
			geo.vertices.push(new THREE.Vector3(3.5, -3.2, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(3.5, -3.5, 0.5));
			geo.vertices.push(new THREE.Vector3(2.5, -3.5, 0.5));
			geo.vertices.push(new THREE.Vector3(2.5, -3.5, -0.5));
			geo.vertices.push(new THREE.Vector3(3.5, -3.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));


			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-0.5, 1.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 3.8, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, 3.8, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, 3.8, -0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 3.8, -0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 1.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(0.5, 3.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 3.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 3.5, -0.5));
			geo.vertices.push(new THREE.Vector3(0.5, 3.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-2.5, 1.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 1.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 1.5, -0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, 1.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-2.5, 1.8, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 1.8, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, 1.8, -0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, 1.8, -0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, 1.8, 0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-2.5, 0.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, -1.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, -1.5, -0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, 0.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-1.5, -0.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, -0.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, -0.5, -0.5));
			geo.vertices.push(new THREE.Vector3(-1.5, -0.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-1.5, -1.2, 0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, -1.2, 0.5));
			geo.vertices.push(new THREE.Vector3(-2.5, -1.2, -0.5));
			geo.vertices.push(new THREE.Vector3(-1.5, -1.2, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-1.5, -1.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-1.5, -2.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-1.5, -2.5, -0.5));
			geo.vertices.push(new THREE.Vector3(-1.5, -1.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(0.5, -2.2, 0.5));
			geo.vertices.push(new THREE.Vector3(-1.5, -2.2, 0.5));
			geo.vertices.push(new THREE.Vector3(-1.5, -2.2, -0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -2.2, -0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -2.2, 0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-1.5, -2.5, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -2.5, 0.5));
			geo.vertices.push(new THREE.Vector3(0.5, -2.5, -0.5));
			geo.vertices.push(new THREE.Vector3(-1.5, -2.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));

			geo = new THREE.Geometry();
			geo.vertices.push(new THREE.Vector3(-0.5, -3.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, -2.5, 0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, -2.5, -0.5));
			geo.vertices.push(new THREE.Vector3(-0.5, -3.5, -0.5));
			context.logo.add(new THREE.Line(geo, mtl, THREE.LineStrip));
		}

		context.logo.position.y = 0;

		context.scene.add(context.logo);
		// context.logo.rotation.z = 0.10;
	});

	// this.addEvent('00:00:01', function() {

	this.addEvent('02:28:20', function() {
		musicSound.play();
	});

	this.addEvent('02:28:15', function() {
		$('.gradient').addClass('animate');
	});



	this.addEvent('02:27:00', function() {


        new TWEEN.Tween(this.camera.rotation)
        	.to({ x: -0.1, y: -0.20 }, 3000)
        	.easing(TWEEN.Easing.Quadratic.InOut)
        	.start();

        new TWEEN.Tween(this.logo.rotation)
        	.to({ z: 0.1 }, 3000)
        	.easing(TWEEN.Easing.Quadratic.InOut)
        	.start();

	});




	this.addEvent('02:28:10', function() {
		$('body').css('background', '#000');

		renderator.reset(this.scene, this.camera, {
            postProcessEnabled      : true,

            blurEnabled             : false,
            blurAmount              : 3,
            blurPosition            : 0.5,

            bloomEnabled            : true,
            aaEnabled               : true,
            noiseEnabled 			: true
        });

		renderator.bloomPass.copyUniforms["opacity"].value = 4;
		new TWEEN.Tween(renderator.bloomPass.copyUniforms["opacity"])
			.to({ value: 4 }, 400)
			.onComplete(function() {
				new TWEEN.Tween(renderator.bloomPass.copyUniforms["opacity"])
					.to({ value: 20 }, 100)
					.onComplete(function() {
						new TWEEN.Tween(renderator.bloomPass.copyUniforms["opacity"])
							.to({ value: 6 }, 200)
							.start();
					})
					.start();
			})
			.start();

		var outerExtent = 15;
        new TWEEN.Tween(context.camera)
        	.to({ left: -outerExtent, right: outerExtent, top: outerExtent * iRatio, bottom: -outerExtent * iRatio }, 1250)
        	.onUpdate(function() { context.camera.updateProjectionMatrix(); })
        	.easing(TWEEN.Easing.Quadratic.InOut)
        	.start();

        new TWEEN.Tween(this.particulator.pointCloud.material.color)
        	.to({ r: 0.3, g: 0.3, b: 0.3 }, 3000)
        	.start();

        new TWEEN.Tween(this.fadeplane.material)
        	.to({ opacity: 0 }, 2000)
        	.start();
	});

	this.addEvent('02:28:00', function() {
		console.log("!");
		this.idleFunction();
	});

	this.addEvent('02:29:10', function() {
        $('.logo').addClass('visible');

	})
};


SequenceLogo.prototype = new Sequence();


SequenceLogo.prototype.idleFunction = function() {

	var period = 10000;
	var context = this;
	var startPos = this.camera.position.clone();

	var posTween = new TWEEN.Tween(this.camera.position)
		.to({ x: startPos.x + 2, z: startPos.z + 2 }, period)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onComplete(function() {
			new TWEEN.Tween(context.camera.position)
				.to({ x: startPos.x, z: startPos.z }, period)
				.easing(TWEEN.Easing.Quadratic.InOut)
				.start();
		})
		.start();

	var startRot = this.camera.rotation.clone();
	new TWEEN.Tween(this.camera.rotation)
		.to({ y: startRot.y + 0.2 }, period)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onComplete(function() {
			new TWEEN.Tween(context.camera.rotation)
				.to({ y: startRot.y }, period)
				.easing(TWEEN.Easing.Quadratic.InOut)
				.onComplete(function() {
					context.idleFunction();
				})
				.start();
		})
		.start();
};


SequenceLogo.prototype.update = function(delta) {

	if (this.particulator !== undefined)
		this.particulator.update(delta);

	// console.log(this.camera.position);
}


var sequenceLogo = new SequenceLogo();
timeline.push(sequenceLogo);