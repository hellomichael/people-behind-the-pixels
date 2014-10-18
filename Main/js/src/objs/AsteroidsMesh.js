// Sequence base class
var AsteroidsMesh = function(count, radius, rotation, showRing) {
    this.asteroids = [];
    this.count = count;
    this.radius = radius;
    this.showRing = false;

    if (showRing) {
        this.showRing = showRing;
    }

    // Materials
    this.lightMaterial = new THREE.MeshLambertMaterial({color: 'white', opacity: 1, transparent: true});
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true});

    // Asteroid Group
    this.shapes = ['cube', 'pyramid'];
    this.asteroidGroup = new THREE.Object3D();
    this.cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.pyramidGeometry = new THREE.CylinderGeometry(0, 1, 1, 3, false);

    // Orbit
    if (showRing) {
        this.ringInnerGeometry = new THREE.CircleGeometry(radius, 250);
        this.ringInnerGeometry.vertices.shift();
        this.ringInner = new THREE.Line(this.ringInnerGeometry, this.lineMaterial);
        this.asteroidGroup.add(this.ringInner);
    }

    for (var i=0; i<this.count; i++) {
        // Create random shape
        var randomShape = this.shapes[~~ (Math.random() * this.shapes.length)];
        var randomScale = (0.3 + Math.random() * 0.2).toFixed(1);
        var asteroid;

        if (randomShape === 'cube') {
            asteroid = new THREE.Mesh(this.cubeGeometry, this.lightMaterial);
        }

        else if (randomShape === 'pyramid') {
            asteroid = new THREE.Mesh(this.pyramidGeometry, this.lightMaterial);
        }

        asteroid.position.x = radius;
        asteroid.position.y = i - count/2;
        asteroid.position.z = (-0.5 + Math.random() * 1 - 0.2).toFixed(1);

        asteroid.rotation.x = Util.toRadians(_.random(360));
        asteroid.rotation.y = Util.toRadians(_.random(360));
        asteroid.rotation.z = Util.toRadians(_.random(360));

        asteroid.scale.set(randomScale, randomScale, randomScale);

        this.asteroids.push(asteroid);
        this.asteroidGroup.add(asteroid);
    }

    this.asteroidGroup.rotation.x = Util.toRadians(90);
    this.asteroidGroup.rotation.z = Util.toRadians(rotation);

    return this.asteroidGroup;
};