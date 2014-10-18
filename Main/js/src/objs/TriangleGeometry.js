// Sequence base class
// http://www.vb-helper.com/tutorial_platonic_2_4.gif

var TriangleGeometry = function(scale) {
    // Geometry
    this.triangleGeometry = new THREE.Geometry();
    this.triangleGeometry.vertices.push(new THREE.Vector3(0, Math.sqrt(3) * scale, 0));
    this.triangleGeometry.vertices.push(new THREE.Vector3(1 * scale, 0, 0));
    this.triangleGeometry.vertices.push(new THREE.Vector3(-1 * scale, 0, 0));

    // Faces
    this.triangleGeometry.faces.push(new THREE.Face3(0, 2, 1));
    this.triangleGeometry.computeFaceNormals();

    // Add a public height variable
    this.triangleGeometry.height = Math.sqrt(3) * scale - 1/Math.sqrt(3) * scale + 1/Math.sqrt(3) * scale;

    return this.triangleGeometry;
};