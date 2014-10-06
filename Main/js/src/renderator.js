

var Renderator = function(scene, camera) {

	this.scene = scene;
	this.camera = camera;

	// Initialise renderer/DOM element
	this.renderer = new THREE.WebGLRenderer({ 
		canvas: document.getElementById('canvas'),
		alpha: true,
		sortObjects: true,
	});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.autoClear = false;
	this.renderer.autoClearColour = false;

	var context = this;
	window.addEventListener('resize', function() { context.onResize(); });

	// Post-processing
	this.noisePass = new THREE.FilmPass(0.2, 0.025, 600, false);
	this.bloomPass = new THREE.BloomPass(0.6, 25, 16, 256);
	this.aaPass = new THREE.ShaderPass(THREE.FXAAShader);

	// Default post-processing settings
	this.postRenderEnabled = true;
	this.noiseEnabled = true;
	this.bloomEnabled = true;
	this.aaEnabled = true;

	// Set initial scene/camera
	this.composer = new THREE.EffectComposer(this.renderer);
	if (scene !== undefined && camera !== undefined)
		this.reset(scene, camera);
}


Renderator.prototype.reset = function(scene, camera, postScene, postCamera) {

	// Update camera/scene (if provided)
	if (scene !== undefined) this.scene = scene;
	if (camera !== undefined) this.camera = camera;
	if (postScene !== undefined) this.postScene = postScene;
	if (postCamera !== undefined) this.postCamera = postCamera;

	// Setup effect composer and render pass
	this.composer = new THREE.EffectComposer(this.renderer);
	this.renderPass = new THREE.RenderPass(this.scene, this.camera);
	this.composer.addPass(this.renderPass);

	// post render scene
	
	if (this.postRenderEnabled && postScene && postCamera) {
		this.postRenderPass = new THREE.RenderPass(this.postScene, this.postCamera);
		// this.composer.addPass(this.postRenderPass);	
	}

	// Post-processing
	if (this.noiseEnabled) {
		this.composer.addPass(new THREE.FilmPass(0.7, 0.6, 1, true));
	}

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

	if (this.composer)
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