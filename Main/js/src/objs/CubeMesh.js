// Sequence base class
// http://www.vb-helper.com/tutorial_platonic_2_4.gif

var CubeMesh = function(scale) {
    this.cubeGroup = new THREE.Object3D();

    var randomRotX = Util.toRadians(90 * _.random(-4, 4));
    var randomRotY = Util.toRadians(90 * _.random(-4, 4));
    var randomRotZ = Util.toRadians(90 * _.random(-4, 4));



    // Materials
    this.lineMaterial  = new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 1, transparent: true, wireframe: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 0XFFFFFF, opacity: 1, transparent: true, side: THREE.DoubleSide});

    this.cube1 = new THREE.Mesh(new THREE.BoxGeometry(scale, scale, scale), this.lineMaterial);
    this.cubeGroup.add(this.cube1);
    this.cube1.rotation.x = randomRotX;
    this.cube1.rotation.y = randomRotY;
    this.cube1.rotation.z = randomRotZ;


    this.cube2 = new THREE.Mesh(new THREE.BoxGeometry(scale, scale, scale), this.lightMaterial);
    this.cubeGroup.add(this.cube2);

    this.cube2.rotation.x = randomRotX;
    this.cube2.rotation.y = randomRotY;
    this.cube2.rotation.z = randomRotZ;

    return this.cubeGroup;
};