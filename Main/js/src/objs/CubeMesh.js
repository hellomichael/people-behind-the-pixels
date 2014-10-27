// Sequence base class
// http://www.vb-helper.com/tutorial_platonic_2_4.gif

var CubeMesh = function(scale) {
    this.cubeGroup = new THREE.Object3D();

    // Materials
    this.lineMaterial  = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, opacity: 1, transparent: true, wireframe: true});
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 0x333333, opacity: 0, transparent: true, side: THREE.DoubleSide});

    this.cube1 = new THREE.Mesh(new THREE.BoxGeometry(scale, scale, scale), this.lineMaterial);
    this.cubeGroup.add(this.cube1);

    this.cube2 = new THREE.Mesh(new THREE.BoxGeometry(scale, scale, scale), this.lightMaterial);
    this.cubeGroup.add(this.cube2);

    return this.cubeGroup;
};