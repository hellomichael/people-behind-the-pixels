/*jslint browser: true*/
/*global TWEEN:false */
/*global stackBoxBlurCanvasRGBA:false */

'use strict';

var Artifact = function (glitch, blend, width, height, x, y, targetX, targetY) {
    this.glitch = glitch;

    this.blend = blend;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.targetX = targetX;
    this.targetY = targetY;
};

Artifact.prototype = {
    constructor: Artifact,

    blendMode: function(blend) {
        this.blend = blend;
    },

    move: function(offsetX, offsetY) {
        if (this.blend === 'offset') {
            this.targetX += offsetX;
            this.targetY += offsetY;
        }

        else {
            this.x += offsetX;
            this.y += offsetY;
        }
    },

    scale: function(scaleX, scaleY) {
        this.width *= scaleX;
        this.height *= scaleY;
    },

    draw: function() {
       if (this.blend === 'add') {
           this.glitch.context.fillStyle = 'rgba(255,255,255,0.75)';
           this.glitch.context.fillRect(this.glitch.x + this.x, this.glitch.y + this.y, this.width, this.height);
       }

       else if (this.blend === 'subtract') {
           this.glitch.context.clearRect(this.glitch.x + this.x, this.glitch.y + this.y, this.width, this.height);
       }

       else if (this.blend === 'offset') {
           this.clone = this.glitch.context.getImageData(this.glitch.x + this.x, this.glitch.y + this.y, this.width, this.height);
           this.glitch.context.clearRect(this.glitch.x + this.x, this.glitch.y + this.y, this.width, this.height);
           this.glitch.context.putImageData(this.clone, this.glitch.x + this.x + this.targetX, this.glitch.y + this.y + this.targetY);
       }
    }
};

/**
* Creates new scene
* @param {name}
* @return {scene}
*/
var Glitch = function(speaker, x, y) {
    this.speaker = speaker;

    // 2 types of glitches
    this.direction = Math.random() < 0.5 ? 'left' : 'right';

    // Get the canvas
    this.canvas = document.getElementById('speakers');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Type Settings
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = 'white';
    this.context.font = 'bold 25px "futura-med"';
    this.context.textBaseline = 'middle';

    this.glitchAudioIn = new Audio('shared/audio/glitch' + Math.round(Math.random() * 4 + 1) + '.mp3');
    this.glitchAudioOut = new Audio('shared/audio/glitch' + Math.round(Math.random() * 4 + 1) + '.mp3');

    this.glitchAudioIn.volume = 0.5;
    this.glitchAudioOut.volume = 0.5;

    // Type dimensions
    this.metrics = this.context.measureText(this.speaker);
    this.width = Math.round(this.metrics.width);
    this.height = 23;

    this.x = this.canvas.width/2 - this.width/2 + x;
    this.y = this.canvas.height/2 - this.height/2 + y;

    // Draw type onto canvas
    this.context.fillText(this.speaker, 0, 12.5);

    // Clone canvas and draw text at center
    this.clone = this.context.getImageData(0, 0, this.width, this.height);
    this.canvas.width = this.canvas.width;

    var that = this;
    window.addEventListener('resize', function() {that.onResize(x, y);});

    // Create artifacts
    var offset = Math.random() * this.width;

    if (this.direction === 'left') {
        this.artifact1 = new Artifact(this, 'add', 27, 20, offset, -13);
        this.artifact2 = new Artifact(this, 'add', 27, 20, offset, -13);
        this.artifact3 = new Artifact(this, 'add', 27, 20, offset, -13);
        this.artifact4 = new Artifact(this, 'offset', this.width/1.5, 6, this.width/3, this.height - 6, 5, 8);
        this.artifact5 = new Artifact(this, 'subtract', this.width/1.5, 6, this.width/3, this.height - 6);
        this.artifact6 = new Artifact(this, 'add', this.width/1.5, 6, this.width/3, this.height - 6);

        this.artifact2.move(32, 0);
        this.artifact2.scale(1, 0.3);

        this.artifact3.move(-5, 0);
        this.artifact3.scale(1.2, 1.2);

        this.artifact6.move(0, 20);
        this.artifact6.scale(1, 0.6);
    }

    else {
        this.artifact1 = new Artifact(this, 'add', 27, 20, this.width - offset, -13);
        this.artifact2 = new Artifact(this, 'add', 27, 20, this.width - offset, -13);
        this.artifact3 = new Artifact(this, 'add', 27, 20, this.width - offset, -13);

        this.artifact4 = new Artifact(this, 'offset', this.width/1.5, 6, -1, this.height - 6, -5, 8);
        this.artifact5 = new Artifact(this, 'subtract', this.width/1.5, 6, -1, this.height - 6);
        this.artifact6 = new Artifact(this, 'add', this.width/1.5, 6, -1, this.height - 6);

        this.artifact2.move(-32, 0);
        this.artifact2.scale(1, 0.3);

        this.artifact3.move(0, 0);
        this.artifact3.scale(1.2, 1.2);

        this.artifact6.move(0, 20);
        this.artifact6.scale(1, 0.6);
    }
};

Glitch.prototype = {
    constructor: Glitch,

    onResize: function (x, y) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.x = this.canvas.width/2 - this.width/2 + x;
        this.y = this.canvas.height/2 - this.height/2 + y;

        this.goToFrame(this.currentFrame);
    },

    animateIn: function() {
        this.glitchAudioIn.play();

        var that = this;

        new TWEEN.Tween({frame: 1})
            .to({frame: 7}, 750)
            .onUpdate(function () {
                that.currentFrame = Math.round(this.frame);

                if (that.previousFrame !== that.currentFrame) {
                    that.goToFrame(that.currentFrame);
                }

                that.previousFrame = that.currentFrame;
            })
        .start();
    },

    animateOut: function() {
        this.glitchAudioOut.play();

        var that = this;

        new TWEEN.Tween({frame: 7})
            .to({frame: 0}, 750)
            .onUpdate(function () {
                that.currentFrame = Math.round(this.frame);

                if (that.previousFrame !== that.currentFrame) {
                    that.goToFrame(that.currentFrame);
                }

                that.previousFrame = that.currentFrame;
            })
        .start();
    },

    clear: function () {
        this.canvas.width = this.canvas.width;
    },

    goToFrame: function(currentFrame) {
        // Clear the frame
        this.canvas.width = this.canvas.width;

        if (currentFrame === 1) {
            this.context.putImageData(this.clone, this.x, this.y);

            stackBoxBlurCanvasRGBA('speakers', this.x - 20, this.y - 20, this.width + 40, this.height + 40, 1, 2);
        }

        else if (currentFrame === 2) {
            this.context.putImageData(this.clone, this.x, this.y);

            this.artifact1.draw();
            this.artifact2.draw();
            this.artifact5.draw();
            this.artifact6.draw();
        }

        else if (currentFrame === 3) {
            this.context.putImageData(this.clone, this.x, this.y);

            this.artifact1.draw();
            this.artifact2.draw();
            this.artifact3.draw();
            this.artifact5.draw();
            this.artifact6.draw();
        }

        else if (currentFrame === 4) {
            this.context.putImageData(this.clone, this.x, this.y);

            this.artifact4.draw();
        }

        else if (currentFrame === 5) {
            this.context.putImageData(this.clone, this.x, this.y);

            if (this.direction === 'left') {
                this.artifact1.scale(1, 0.3);
                this.artifact1.move(10, 23);
                this.artifact2.move(-28, 20);
                this.artifact4.move(10, 0);
            }

            else {
                this.artifact1.scale(1, 0.3);
                this.artifact1.move(10, 23);
                this.artifact2.move(28, 20);
                this.artifact4.move(-10, 0);
            }

            this.artifact1.draw();
            this.artifact2.draw();
            this.artifact4.draw();

            stackBoxBlurCanvasRGBA('speakers', this.x - 20, this.y - 20, this.width + 40, this.height + 40, 2, 2);
        }

        else if (currentFrame === 6) {
            this.context.putImageData(this.clone, this.x, this.y);

            this.artifact2.draw();
            this.artifact4.draw();
        }

        else if (currentFrame === 7) {
            this.context.putImageData(this.clone, this.x, this.y);
        }

        this.context.fill();
    }
};