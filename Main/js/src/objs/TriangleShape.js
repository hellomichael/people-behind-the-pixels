// Sequence base class
// http://www.vb-helper.com/tutorial_platonic_2_4.gif

var TriangleShape = function(scale) {
    this.triangleShape = new THREE.Shape();

    this.triangleShape.moveTo(0, Math.sqrt(3) * scale);
    this.triangleShape.lineTo(1 * scale, 0);
    this.triangleShape.lineTo(-1 * scale, 0);
    this.triangleShape.lineTo(0, Math.sqrt(3) * scale);

    return this.triangleShape;
};