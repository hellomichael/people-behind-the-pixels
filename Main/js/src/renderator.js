var Renderator = function(scene, camera) {
	this.scene = scene;
	this.camera = camera;

	// Initialise renderer/DOM element
	this.renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true, alpha: true});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.autoClear = false;

	var context = this;
	window.addEventListener('resize', function() { context.onResize(); });

	// Post-processing
	this.noisePass = new THREE.FilmPass(0.7, 0.075, 600, true);
	this.bloomPass = new THREE.BloomPass(0.7, 25, 16, 256);
	this.aaPass = new THREE.ShaderPass(THREE.FXAAShader);

	// Default post-processing settings
	this.noiseEnabled = true;
	this.bloomEnabled = true;
	this.aaEnabled = true;

	// Set initial scene/camera
	this.composer = null;
	if (scene != undefined && camera != undefined)
		this.reset(scene, camera);
}

Renderator.prototype.reset = function(scene, camera) {
	// Update camera/scene (if provided)
	if (scene != undefined) this.scene = scene;
	if (camera != undefined) this.camera = camera;

	// Setup effect composer and render pass
	this.composer = new THREE.EffectComposer(this.renderer);
	this.renderPass = new THREE.RenderPass(this.scene, this.camera);
	this.composer.addPass(this.renderPass);

	// Post-processing
	if (this.noiseEnabled)
		this.composer.addPass(this.noisePass);

	if (this.bloomEnabled)
		this.composer.addPass(this.bloomPass);

	if (this.aaEnabled) {
		this.aaPass.uniforms["resolution"].value.set(1/window.innerWidth, 1/window.innerHeight);
		this.composer.addPass(this.aaPass);
	}

	// Copy pass (renders to screen)
	var copyShader = new THREE.ShaderPass(THREE.CopyShader);
	copyShader.renderToScreen = true;
	this.composer.addPass(copyShader);
}

Renderator.prototype.render = function(delta) {
	this.renderer.clear();
	this.composer.render(delta);
}

Renderator.prototype.onResize = function() {
	if (this.camera) {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	this.aaPass.uniforms["resolution"].value.set(1/window.innerWidth, 1/window.innerHeight);

	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.composer.setSize(window.innerWidth, window.innerHeight);
}