var Particulator = function(range, density, acceleration, texture, focusObject, size) {

    this.range = range;
    this.acceleration = acceleration;
    this.focusObject = focusObject;
    this.material = new THREE.PointCloudMaterial({
        size: size,
        sizeAttenuation: true,
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        color: 0xFFFFFF,
    });


    // generate particles within cylinder volume
    this.distribution = new THREE.Geometry();

    for (var i = 0; i < density; i++) {

        var vert = new THREE.Vector3(
            Math.random() * 2 * this.range - this.range,
            Math.random() * 2 * this.range - this.range,
            Math.random() * 2 * this.range - this.range);

        this.distribution.vertices.push(vert);
    }

    this.pointCloud = new THREE.PointCloud(this.distribution, this.material);
    this.pointCloud.sortParticles = true;
    this.pointCloud.frustumCulled = false;
}


Particulator.prototype.update = function(delta) {

    delta = 0.0166666; // debug delta

    var frameAccel = this.acceleration.clone().multiplyScalar(delta);

    var shift = 2 * this.range;
    var xUpper = this.focusObject.position.x + this.range;
    var xLower = this.focusObject.position.x - this.range;
    var yUpper = this.focusObject.position.y + this.range;
    var yLower = this.focusObject.position.y - this.range;
    var zUpper = this.focusObject.position.z + this.range;
    var zLower = this.focusObject.position.z - this.range;

    for (var i = 0; i < this.pointCloud.geometry.vertices.length; i++) {

        var vert = this.pointCloud.geometry.vertices[i];

        vert.add(frameAccel);

        // detect range overlap
        if (vert.x < xLower)
            vert.x += shift;
        else if (vert.x > xUpper)
            vert.x -= shift;

        if (vert.y < yLower)
            vert.y += shift;
        else if (vert.y > yUpper)
            vert.y -= shift;

        if (vert.z < zLower)
            vert.z += shift;
        else if (vert.z > zUpper)
            vert.z -= shift;
    }

    this.pointCloud.geometry.verticesNeedUpdate = true;
}