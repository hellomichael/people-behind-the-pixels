/******************************
* Extend Scene Prototype
******************************/
var sequenceSM = function() {
    this.sequence = [];
    this.init();
};

sequenceSM.prototype = new Sequence();

sequenceSM.prototype.init = function() {
    // Screen size
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    // Get the canvas
    this.canvas = document.getElementById('sarah-mei');
    this.canvas.width = this.screenWidth;
    this.canvas.height = this.screenHeight;
    this.context = this.canvas.getContext('2d');

    var that = this;

    window.addEventListener('resize', function() {
        // Reset screen width
        that.screenWidth = window.innerWidth;
        that.screenHeight = window.innerHeight;

        that.canvas.width = that.screenWidth;
        that.canvas.height = that.screenHeight;

        that.draw(that.circleRadius - 50, 175);
    });
};

/******************************
* Create Animations
******************************/
sequenceSM.prototype.vennDiagramIn = function(duration, easing) {
    this.circleRadius = (3.55/Math.abs(sequenceDB.screenDimensions[1])) * this.canvas.height;
    this.distance = 75;

    var that = this;

    if (this.tween) {
        this.tween.stop();
    }

    this.tween = new TWEEN.Tween({distance: 0, position: -150, opacity: 0})
        .to({distance: this.circleRadius - this.distance, position: 175, opacity: 1}, duration)
        .easing(easing)
        .onUpdate(function () {
            if (this.opacity * 1.5 < 1) {
                this.opacity = this.opacity * 1.5;
            }

            else {
                this.opacity = 1;
            }

            that.draw(this.distance, this.position, this.opacity);
        })
    .start();
};

sequenceSM.prototype.vennDiagramOut = function(duration, easing) {
    var that = this;

    if (this.tween) {
        this.tween.stop();
    }

    this.tween = new TWEEN.Tween({distance: this.circleRadius - this.distance, position: 175, opacity: 1})
        .to({distance: 0, position: 0, opacity: 0}, duration)
        .easing(easing)
        .onUpdate(function (time) {

            that.draw(this.distance, this.position, this.opacity);
        })
    .start();
};

sequenceSM.prototype.draw = function(distance, position, opacity) {
    this.context.globalAlpha = opacity;

    // Clear canvas
    this.context.clearRect (0, 0, this.screenWidth, this.screenHeight);
    this.context.fillStyle = 'white';

    // Draw Circle
    this.context.beginPath();
    this.context.arc(this.screenWidth/2 - distance, this.screenHeight/2, this.circleRadius, 0, 2*Math.PI); //x, y, radius
    this.context.fill();

    // Subtract circle
    this.context.globalCompositeOperation = 'xor';

    // 2nd Circle
    this.context.beginPath();
    this.context.arc(this.screenWidth/2 + distance, this.screenHeight/2, this.circleRadius, 0, 2*Math.PI); //x, y, radius
    this.context.fill();
}

/******************************
* Add Events
******************************/
var sequenceSM = new sequenceSM();

var glitchSM = new Glitch ('SARAH MEI', -375, 0);
/*sequenceSM.addEvent('01:15:00', function() {glitchSM.animateIn()});
sequenceSM.addEvent('01:19:15', function() {glitchSM.animateOut()});*/

sequenceSM.addEvent('01:08:10', function () {
    sequenceJL.fade(sequenceJL.ring1.children[0], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring2.children[0], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring3.children[0], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring4.children[0], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring5.children[0], 0, 1500, TWEEN.Easing.Bounce.InOut);

    sequenceJL.fade(sequenceJL.ring1.children[1], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring2.children[1], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring3.children[1], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring4.children[1], 0, 1500, TWEEN.Easing.Bounce.InOut);
    sequenceJL.fade(sequenceJL.ring5.children[1], 0, 1500, TWEEN.Easing.Bounce.InOut);
});

sequenceSM.addEvent('01:08:05', function () {
    sequenceSM.vennDiagramIn(2500, TWEEN.Easing.Exponential.InOut);
});

sequenceSM.addEvent('01:14:00', function () {
    sequenceTA.addEvent('00:44:15', function() {
        sequenceTA.fade(sequenceTA.particulator, 0.2, 2500, TWEEN.Easing.Exponential.InOut);
    });

    //sequenceSM.vennDiagramOut(2500, TWEEN.Easing.Exponential.InOut);
});


/******************************
* Add to Timeline
******************************/
timeline.push(sequenceSM);