// Sequence base class
var Icosahedron = function(x, y, z, radius) {
    this.radius = radius;

    // Materials
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});
    this.basicMaterial = new THREE.MeshBasicMaterial ({color: 0x666666, opacity: 1, transparent: true,});
    this.edgeMaterial = new THREE.MeshBasicMaterial ({color: 0x666666, opacity: 0.5, transparent: true, wireframe: true});
    this.wireFrameMaterial = new THREE.MeshBasicMaterial ({color: 'white', opacity: 0.5, transparent: true, wireframe: true});

    // Group
    this.icosahedronGroup = new THREE.Object3D();

    this.icosahedronMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 0), this.basicMaterial);
    this.icosahedronEdge = new THREE.Mesh(new THREE.IcosahedronGeometry(radius + 0.01, 0), this.edgeMaterial);
    this.icosahedronWireframe = new THREE.Mesh(new THREE.IcosahedronGeometry(radius * 1.3, 0), this.wireFrameMaterial);

    this.icosahedronGroup.add(this.icosahedronMesh);
    this.icosahedronGroup.add(this.icosahedronEdge);
    this.icosahedronGroup.add(this.icosahedronWireframe);

    // Position,rotation
    this.icosahedronGroup.position.x = x;
    this.icosahedronGroup.position.y = -y;
    this.icosahedronGroup.position.z = z;

    this.icosahedronGroup.rotation.x = Util.toRadians(Math.random() * 360);
    this.icosahedronGroup.rotation.y = Util.toRadians(Math.random() * 360);
    this.icosahedronGroup.rotation.z = Util.toRadians(Math.random() * 360);

    return this.icosahedronGroup;
};