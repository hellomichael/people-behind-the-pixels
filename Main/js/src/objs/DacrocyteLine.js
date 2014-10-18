// Sequence base class
var DacrocyteLine = function(radius, width, height) {
    this.radius = radius;
    this.segments = 300;

    this.shape = new THREE.Shape();
    this.shape.moveTo(this.radius, height/2);
    this.shape.lineTo(this.radius, 0);
    this.shape.absarc(0, 0, this.radius, Util.toRadians(360), Util.toRadians(90), true);
    this.shape.lineTo(width/2, this.radius);

    this.points = this.shape.createSpacedPointsGeometry(this.segments); // 300 defines segments
    this.points.verticesClone = Util.cloneArray(this.points.vertices); // Deep clone objects

    this.lineMaterial = new THREE.LineBasicMaterial({ color: 'white', transparent: true});
    this.line = new THREE.Line(this.points, this.lineMaterial);
    this.line.frustumCulled = false;

    // Hide segments
    for (var i=0; i<this.segments; i++) {
        this.line.geometry.vertices[i].x = 0;
        this.line.geometry.vertices[i].y = 0;

        this.line.geometry.verticesNeedUpdate = true;
    }

    return $.extend(this.line, this); // Return the entire object
};