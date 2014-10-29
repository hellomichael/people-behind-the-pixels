
var disc1 = THREE.ImageUtils.loadTexture("shared/img/particle.png");
var disc2 = THREE.ImageUtils.loadTexture("shared/img/particle.png");


/*----------------------------------------------------------------------------*/


var SequenceMD = function() {

    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.FogExp2(0x222222, 0.15);
    this.scene.fog = new THREE.Fog(0x222222, 10, 100);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 256);


    this.camera.position.set(20, 30, -50);
    // this.camera.lookAt(new THREE.Vector3());
    this.camera.lookAt(new THREE.Vector3(0,5,0));
    this.scene.add(this.camera);

    // var controls = new THREE.OrbitControls(this.camera);

    var vShader = [
        "uniform float theta;",
        "uniform float amp;",
        "uniform float falloff;",
        "const float ninety = 3.14159 / 2.0;",
        "uniform vec3 focus;",
        "void main() {",
            "vec3 rel = position - focus;",
            "float d = sqrt(rel.z * rel.z + rel.x * rel.x) * 0.05;",
            "float decay = cos((clamp(d, 0.0, falloff) / falloff) * ninety);",

            "vec4 displaced = vec4(position, 1.0);",
            "displaced.y += sin(theta + d) * amp * decay;", //(amp * 3.0 / d);",
            "gl_Position = projectionMatrix * modelViewMatrix * displaced;",
        "}"
    ].join("\n");

    var fshader = [
        THREE.ShaderChunk.fog_pars_fragment,

        "void main() {",
            "float l = 1.0;",
            "gl_FragColor = vec4(l, l, l, 1.0);",
            THREE.ShaderChunk.fog_fragment,
        "}"
    ].join('\n');

    this.theta = 0;

    this.material = new THREE.ShaderMaterial({
        uniforms: {

            topColor:    { type: "c", value: new THREE.Color( 0x0077ff ) },
            bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
            offset:      { type: "f", value: 33 },
            exponent:    { type: "f", value: 0.6 },
            fogColor:    { type: "c", value: this.scene.fog.color },
            fogNear:     { type: "f", value: this.scene.fog.near },
            fogFar:      { type: "f", value: this.scene.fog.far },


            theta: { type: 'f', value: this.theta },
            amp: { type: 'f', value: 5 },
            falloff: { type: 'f', value: 50 },
            focus: { type: 'v3', value: new THREE.Vector3(0, 0, -80) }
        },
        vertexShader: vShader,
        fragmentShader: fshader,
        wireframe: false ,
        fog: true,
     });


    // hexgrid
    this.hexgrid = new Hexgrid(0.95, 1, 80, 200, this.material);
    // this.hexgrid.group.position.set(0, 0, 0);
    this.scene.add(this.hexgrid.group);

    this.ambient = new THREE.AmbientLight({ color:0x333333 });
    this.scene.add(this.ambient);

    // Particulator
    this.particulator = new Particulator(75, 200, new THREE.Vector3(-1, 1, -1), THREE.ImageUtils.loadTexture('shared/img/particle.png'), this.camera, 1);
    this.particulator.material.opacity = 0.3;
    this.scene.add(this.particulator.pointCloud);

    var context = this;


    this.addEvent('02:06:00', function() {
        renderator.reset(this.scene, this.camera, {
            postProcessEnabled      : true,

            blurEnabled             : true,
            blurAmount              : 2,
            blurPosition            : 0,

            bloomEnabled            : true,
            aaEnabled               : true
        });

        var context = this;

        var camtween = new TWEEN.Tween(this.camera.position)
            .to({ x: 41, y: 15, z: -36}, 12000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function() {
                context.camera.position.set(this.x, this.y, this.z);
            }).start();
    });


    var glitchHM = new Glitch ('HADI MICHAEL', 200, -150);
    this.addEvent('02:06:15', function() {glitchHM.animateIn()});
    this.addEvent('02:11:00', function() {glitchHM.animateOut()});

    var glitchPT = new Glitch ('PAUL THERIAULT', -300, -250);
    this.addEvent('02:11:15', function() {glitchPT.animateIn()});
    this.addEvent('02:16:00', function() {glitchPT.clear()});


    // this.addEvent('00:02:15', function() {

    //  this.theta = 0;

    //  new TWEEN.Tween(this.material.uniforms["amp"])
    //      .to({ value: 10 }, 200)
    //      .onComplete(function() {

    //          new TWEEN.Tween(context.material.uniforms["amp"])
    //              .to({ value: 1 }, 500)
    //              .onComplete(function() {

    //                  new TWEEN.Tween(context.material.uniforms["amp"])
    //                      .to({ value: 0 }, 5000)
    //                      .start();
    //              })
    //              .start();
    //      })
    //      .start();

    //  new TWEEN.Tween(this.material.uniforms["falloff"])
    //      .to({ value: 5 }, 200)
    //      .onComplete(function() {

    //          new TWEEN.Tween(context.material.uniforms["falloff"])
    //              .to({ value: 50 }, 1000)
    //              .start();
    //      })
    //      .start();
    // });
}


SequenceMD.prototype = new Sequence();

SequenceMD.prototype.update = function(delta) {

    // if (isNaN(delta)) delta = 0;

    this.theta += -0.5 * Math.PI * 0.016;
    this.material.uniforms["theta"].value = this.theta;

    this.particulator.update(delta);
    // console.log(this.camera.position);
}


var sequenceMD = new SequenceMD();
timeline.push(sequenceMD);