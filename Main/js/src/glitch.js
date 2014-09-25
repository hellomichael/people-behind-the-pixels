/**
* Creates new scene
* @param {name}
* @return {scene}
*/
var Glitch = function(speaker, canvas, context) {
    this.speaker = speaker;

    this.canvas = canvas;
    this.context = context;
    this.context.fillStyle = 'white';
    this.context.font = 'bold 25px "Futura"';
    this.context.textBaseline = 'hanging';
    this.padding = 25;
    this.count = 0;

    this.metrics = this.context.measureText(this.speaker);

    this.x = this.canvas.width/2;
    this.y = this.canvas.height/2;

    this.width = Math.round(this.metrics.width);
    this.height = 20; //Unfortunately hardcoded

    this.context.fillText(this.speaker, 0, 0);

    // Create clone
    this.clone = this.context.getImageData(0, 0, this.width, this.height);

    // Create artifact
    this.artifactHeight;
    this.artifactOffsetX;
    this.artifactOffsetY;
    this.artifact = this.context.getImageData(this.width/2, this.height-7, this.width/2, 7);

    // Clear canvas before redrawing
    this.canvas.width = this.canvas.width;
};

Glitch.prototype = {
    constructor: Glitch,

    frame1: function() {
        // Remove artifact
        this.canvas.width = this.canvas.width;

        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

        this.x = Math.random() * 150 * plusOrMinus + this.canvas.width/2;
        this.y = Math.random() * 150 * plusOrMinus + this.canvas.height/2;
        this.artifactHeight = 7;
        this.context.putImageData(this.clone, this.x, this.y);
        this.context.clearRect(this.x + this.width/2, this.y + this.height - this.artifactHeight, this.width/2, this.artifactHeight);

        //console.log('Frame 1');
    },

    frame2: function() {
        // Move artifact
        this.canvas.width = this.canvas.width;
        this.artifactOffsetX = this.width/3;
        this.artifactOffsetY = 3;

        this.context.putImageData(this.clone, this.x, this.y);
        this.context.clearRect(this.x + this.width/2, this.y + this.height - this.artifactHeight, this.width/2, this.artifactHeight);
        this.context.putImageData(this.artifact, this.x + this.width/2 + this.artifactOffsetX, this.y + this.height-this.artifactHeight + this.artifactOffsetY);

        //console.log('Frame 2');
    },

    frame3: function() {
        // Move artifact
        this.canvas.width = this.canvas.width;
        this.artifactOffsetX = 7;

        this.context.putImageData(this.clone, this.x, this.y);
        this.context.clearRect(this.width/2, this.height - this.artifactHeight, this.width/2, this.artifactHeight);
        this.context.putImageData(this.artifact, this.x + this.width/2 + this.artifactOffsetX, this.y + this.height-this.artifactHeight + this.artifactOffsetY);

        //console.log('Frame 3');
    },

    frame4: function() {
        this.canvas.width = this.canvas.width;
        this.context.putImageData(this.clone, this.x, this.y);

        /*console.log('Frame 4');
        console.log('');*/
    },

    /*setPixel: function(imageData, x, y, rgba) {
        var index = (x + y * imageData.width) * 4;

        imageData.data[index+0] = rgba[0];
        imageData.data[index+1] = rgba[1];
        imageData.data[index+2] = rgba[2];
        imageData.data[index+3] = rgba[3];
    },*/
};