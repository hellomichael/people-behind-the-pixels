/**
* Creates new scene
* @param {name}
* @return {scene}
*/
var Glitch = function(speaker, x, y) {
    this.speaker = speaker;

    this.canvas = document.getElementById('speakers');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = 'white';
    this.context.font = 'bold 25px "Futura"';
    this.context.textBaseline = 'hanging';
    this.padding = 25;
    this.count = 0;
    this.currentFrame;

    this.metrics = this.context.measureText(this.speaker);

    this.x = this.canvas.width/2 + x;
    this.y = this.canvas.height/2 + y;

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

    play: function() {
        var that = this;

        new TWEEN.Tween({frame: 1})
            .to({frame: 7}, 750)
            .onUpdate(function (e) {
                that.currentFrame = Math.round(this.frame);

                that.nextFrame(that.currentFrame);
            })
        .start();
    },

    nextFrame: function(currentFrame) {
        if (currentFrame === 1) {
            // Remove artifact
            this.canvas.width = this.canvas.width;

            this.artifactHeight = 7;
            this.context.putImageData(this.clone, this.x, this.y);
            this.context.clearRect(this.x + this.width/2, this.y + this.height - this.artifactHeight, this.width/2, this.artifactHeight);
        }

        else if (currentFrame === 2) {
            // Move artifact
            this.canvas.width = this.canvas.width;
            this.artifactOffsetX = this.width/3;
            this.artifactOffsetY = 3;

            this.context.putImageData(this.clone, this.x, this.y);
            this.context.clearRect(this.x + this.width/2, this.y + this.height - this.artifactHeight, this.width/2, this.artifactHeight);
            this.context.putImageData(this.artifact, this.x + this.width/2 + this.artifactOffsetX, this.y + this.height-this.artifactHeight + this.artifactOffsetY);
        }

        else if (currentFrame === 3) {
            // Move artifact
            this.canvas.width = this.canvas.width;
            this.artifactOffsetX = 7;

            this.context.putImageData(this.clone, this.x, this.y);
            this.context.clearRect(this.width/2, this.height - this.artifactHeight, this.width/2, this.artifactHeight);
            this.context.putImageData(this.artifact, this.x + this.width/2 + this.artifactOffsetX, this.y + this.height-this.artifactHeight + this.artifactOffsetY);
        }

        else if (currentFrame === 4) {
            this.canvas.width = this.canvas.width;
            this.context.putImageData(this.clone, this.x, this.y);
        }
    }
};