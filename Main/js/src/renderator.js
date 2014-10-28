// Shaders and Passes
    //= shaders/EffectComposer.js

    //= shaders/MaskPass.js
    //= shaders/BloomPass.js
    //= shaders/RenderPass.js
    //= shaders/ShaderPass.js
    //= shaders/FilmPass.js
    //= shaders/BokehPass.js

    //= shaders/CopyShader.js
    //= shaders/FilmShader.js
    //= shaders/FXAAShader.js
    //= shaders/BokehShader.js
    //= shaders/HorizontalBlurShader.js
    //= shaders/VerticalBlurShader.js
    //= shaders/HorizontalTiltShiftShader.js
    //= shaders/VerticalTiltShiftShader.js
    //= shaders/ConvolutionShader.js

var Renderator = function(scene, camera, options) {
    // Initialise renderer/DOM element
    this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        alpha: true,
        antialias: true,
        sortObjects: true
    });

    this.scene = scene;
    this.camera = camera;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;
    this.renderer.autoClearColour = false;

    // Set initial scene/camera
    this.composer = new THREE.EffectComposer(this.renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,format: THREE.RGBAFormat}));

    if (scene !== undefined && camera !== undefined) {
        this.reset(scene, camera);
    }

    // Post-processing
    this.bloomPass = new THREE.BloomPass(5, 10, 25, 256);
    this.hblur = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
    this.vblur = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
    this.noisePass = new THREE.FilmPass(0.3, 0.025, 1200, true);

    // Boolean options
    this.postProcessEnabled = false;
    this.bloomEnabled = false;
    this.blurEnabled = false;
    this.noiseEnabled = false; // Fucking noise don't work
    this.aaEnabled = false;

    // Resizing the window
    var that = this;
    window.addEventListener('resize', function() { that.onResize(); });
}


Renderator.prototype.reset = function(scene, camera, options) {
    // Update camera/scene (if provided)
    if (scene !== undefined) this.scene = scene;
    if (camera !== undefined) this.camera = camera;

    if (options) {
        this.postProcessEnabled = options.postProcessEnabled || false;
        this.bloomEnabled = options.bloomEnabled || false;
        this.blurEnabled = options.blurEnabled || false;
        this.aaEnabled = options.aaEnabled || false;

        this.blurAmount = options.blurAmount || 0;
        this.blurPosition = options.blurPosition || 0.5;

        this.noiseEnabled = options.noiseEnabled || false;
    }

    // Setup effect composer and render pass
    this.composer = new THREE.EffectComposer(this.renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,format: THREE.RGBAFormat}));

    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

    // Post-processing
    if (this.postProcessEnabled) {
        if (this.bloomEnabled) {
            this.bloomPass.renderTargetX.format = THREE.RGBAFormat;
            this.bloomPass.renderTargetY.format = THREE.RGBAFormat;

            this.bloomPass.renderToScreen = false;
            this.composer.addPass(this.bloomPass);
        }

        if (this.blurEnabled) {
            this.hblur.uniforms['h'].value = this.blurAmount/window.innerWidth;
            this.vblur.uniforms['v'].value = this.blurAmount/window.innerHeight;

            // Placement of shift
            this.hblur.uniforms[ 'r' ].value = this.vblur.uniforms[ 'r' ].value = this.blurPosition;

            this.hblur.renderToScreen = false;
            this.vblur.renderToScreen = false;

            this.composer.addPass(this.hblur);
            this.composer.addPass(this.vblur);
        }

        if (this.aaEnabled) {
            this.aaPass = new THREE.ShaderPass(THREE.FXAAShader);
            this.aaPass.uniforms["resolution"].value.set(1/window.innerWidth, 1/window.innerHeight);
            this.composer.addPass(this.aaPass);
        }

        if (this.noiseEnabled) {
            this.noisePass.renderToScreen = false;
            this.composer.addPass(this.noisePass);
        }

    }

    this.copyShader = new THREE.ShaderPass(THREE.CopyShader);
    this.copyShader.renderToScreen = true;
    this.composer.addPass(this.copyShader);
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

    if (this.aaEnabled) {
        this.aaPass = new THREE.ShaderPass(THREE.FXAAShader);
        this.aaPass.uniforms["resolution"].value.set(1/window.innerWidth, 1/window.innerHeight);
    }

    if (this.blurEnabled) {
        this.hblur.uniforms['h'].value = this.blurAmount/window.innerWidth;
        this.vblur.uniforms['v'].value = this.blurAmount/window.innerHeight;
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
}