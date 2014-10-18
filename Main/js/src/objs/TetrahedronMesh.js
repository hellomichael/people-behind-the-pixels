// Tetrahedron
var TetrahedronMesh = function(scale) {
    this.tetrahedron = new THREE.Object3D();

    // Materials
    this.baseMaterial  = new THREE.MeshPhongMaterial ({color: 0xCCCCCC, opacity: 1, transparent: true, side: THREE.BackSide});
    this.faceMaterial1 = new THREE.MeshBasicMaterial ({color: 0xCCCCCC, opacity: 1, transparent: true, side: THREE.BackSide});
    this.faceMaterial2 = new THREE.MeshBasicMaterial ({color: 0x161616, opacity: 1, transparent: true, side: THREE.BackSide});
    this.faceMaterial3 = new THREE.MeshBasicMaterial ({color: 0xCCCCCC, opacity: 1, transparent: true, side: THREE.BackSide});
    this.edgeMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 0, transparent: true, wireframe: true});

    // Triangle Geometry
    this.triangleGeometry = new TriangleGeometry(scale);

    // Tetrahedron Base
    this.base = new THREE.Mesh(this.triangleGeometry, this.baseMaterial);
    this.baseGroup = new THREE.Object3D();
    this.baseGroup.add(this.base);
    this.base.rotation.z = Util.toRadians(180);

    // Tetrahedron Face 1
    this.face1 = new THREE.Mesh(this.triangleGeometry, this.faceMaterial1);
    this.faceWireframe1 = new THREE.Mesh(this.triangleGeometry, this.edgeMaterial);
    this.faceGroup1 = new THREE.Object3D();
    this.faceGroup1.add(this.face1);
    this.faceGroup1.add(this.faceWireframe1);

    // Tetrahedron Face 2
    this.face2 = new THREE.Mesh(this.triangleGeometry, this.faceMaterial2);
    this.faceWireframe2 = new THREE.Mesh(this.triangleGeometry, this.edgeMaterial);
    this.faceGroup2 = new THREE.Object3D();
    this.faceGroup2.add(this.face2);
    this.faceGroup2.add(this.faceWireframe2);

    this.faceGroup2.rotation.z = Util.toRadians(120);
    this.faceGroup2.position.x = -scale/2;
    this.faceGroup2.position.y = -this.triangleGeometry.height/2;

    // Tetrahedron Face 3
    this.face3 = new THREE.Mesh(this.triangleGeometry, this.faceMaterial3);
    this.faceWireframe3 = new THREE.Mesh(this.triangleGeometry, this.edgeMaterial);
    this.faceGroup3 = new THREE.Object3D();
    this.faceGroup3.rotation.z = Util.toRadians(240);
    this.faceGroup3.position.x = scale/2;
    this.faceGroup3.position.y = -this.triangleGeometry.height/2;
    this.faceGroup3.add(this.face3);
    this.faceGroup3.add(this.faceWireframe3);

    // Add faces to tetrahedron
    this.tetrahedron.add(this.baseGroup);
    this.tetrahedron.add(this.faceGroup1);
    this.tetrahedron.add(this.faceGroup2);
    this.tetrahedron.add(this.faceGroup3);

    // Public variables
    this.tetrahedron.height = this.triangleGeometry.height;

    return this.tetrahedron;
};