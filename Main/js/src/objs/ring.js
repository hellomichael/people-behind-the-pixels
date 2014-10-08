// Sequence base class
var Ring = function(x, y, width, height) {
    this.outerDiameter = width
    this.innerDiameter = height;

    // Ring Group
    this.ringGroup = new THREE.Object3D();
    this.ringInnerGeometry = new THREE.CircleGeometry(this.outerDiameter, 250);
    this.ringInnerGeometry.vertices.shift();
    this.ringInner = new THREE.Line(this.ringInnerGeometry, new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true}));

    this.ringOuterGeometry = new THREE.CircleGeometry(this.innerDiameter, 250);
    this.ringOuterGeometry.vertices.shift();
    this.ringOuter = new THREE.Line(this.ringOuterGeometry, new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true}));

    // Materials
    this.ringMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 0, transparent: true});
    this.ringGeometry = new THREE.RingGeometry(this.innerDiameter, this.outerDiameter, 250, 0, 0, Math.PI*2);
    this.ringMesh = new THREE.Mesh(this.ringGeometry, this.ringMaterial);

    // Ring Group
    this.ringGroup.add(this.ringInner);
    this.ringGroup.add(this.ringOuter);
    this.ringGroup.add(this.ringMesh);

    this.ringInner.position.x = x;
    this.ringInner.position.y = y;

    this.ringOuter.position.x = x;
    this.ringOuter.position.y = y;

    this.ringMesh.position.x = x;
    this.ringMesh.position.y = y;

    return this.ringGroup;
};