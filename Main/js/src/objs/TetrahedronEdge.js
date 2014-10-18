// Tetrahedron
var TetrahedronEdge = function(scale) {
    this.tetrahedron = new THREE.Object3D();

    // Materials
    this.edgeMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 1, transparent: true, wireframe: true});

    // Triangle Geometry
    this.triangleGeometry = new TriangleGeometry(scale);

    // Tetrahedron Base
    this.base = new THREE.Mesh(this.triangleGeometry, this.edgeMaterial);
    this.base.rotation.x = Util.toRadians(0);

    this.baseGroup = new THREE.Object3D();
    this.baseGroup.add(this.base);
    this.base.rotation.z = Util.toRadians(180);

    // Tetrahedron Face 1
    this.face1 = new THREE.Mesh(this.triangleGeometry, this.edgeMaterial);
    this.faceGroup1 = new THREE.Object3D();
    this.faceGroup1.add(this.face1);

    // Tetrahedron Face 2
    this.face2 = new THREE.Mesh(this.triangleGeometry, this.edgeMaterial);
    this.faceGroup2 = new THREE.Object3D();
    this.faceGroup2.add(this.face2);

    this.faceGroup2.rotation.z = Util.toRadians(120);
    this.faceGroup2.position.x = -scale/2;
    this.faceGroup2.position.y = -this.triangleGeometry.height/2;

    // Tetrahedron Face 3
    this.face3 = new THREE.Mesh(this.triangleGeometry, this.edgeMaterial);
    this.faceGroup3 = new THREE.Object3D();
    this.faceGroup3.rotation.z = Util.toRadians(240);
    this.faceGroup3.position.x = scale/2;
    this.faceGroup3.position.y = -this.triangleGeometry.height/2;
    this.faceGroup3.add(this.face3);

    // Add faces to tetrahedron
    this.tetrahedron.add(this.baseGroup);
    this.tetrahedron.add(this.faceGroup1);
    this.tetrahedron.add(this.faceGroup2);
    this.tetrahedron.add(this.faceGroup3);

    return this.tetrahedron;
};