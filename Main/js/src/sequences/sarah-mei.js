/******************************
* Extend Scene Prototype
******************************/
var sequenceSarahMei = function() {
    this.sequence = [];
    this.init();
};

sequenceSarahMei.prototype = new Sequence();

/******************************
* Add Objects
******************************/
sequenceSarahMei.prototype.init = function() {
    // Screen size
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    // Get the canvas
    this.canvas = document.getElementById('sarah-mei');
    this.canvas.width = this.screenWidth;
    this.canvas.height = this.screenHeight;
    this.context = this.canvas.getContext('2d');

    this.circleRadius = 150;

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
* Add Animations
******************************/
sequenceSarahMei.prototype.vennDiagramIn = function(duration, easing) {
    var that = this;

    if (this.tween) {
        this.tween.stop();
    }

    this.tween = new TWEEN.Tween({distance: 0, position: -150, opacity: 0})
        .to({distance: this.circleRadius - 50, position: 175, opacity: 1}, duration)
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

sequenceSarahMei.prototype.vennDiagramOut = function(duration, easing) {
    var that = this;

    if (this.tween) {
        this.tween.stop();
    }

    this.tween = new TWEEN.Tween({distance: this.circleRadius - 50, position: 175, opacity: 1})
        .to({distance: 0, position: 0, opacity: 0}, duration)
        .easing(easing)
        .onUpdate(function (time) {

            that.draw(this.distance, this.position, this.opacity);
        })
    .start();
};

sequenceSarahMei.prototype.draw = function(distance, position, opacity) {
    this.context.globalAlpha = opacity;

    // Clear canvas
    this.context.clearRect (0, 0, this.screenWidth, this.screenHeight);
    this.context.fillStyle = 'white';

    // Draw Circle
    this.context.beginPath();
    this.context.arc(this.screenWidth/2 - distance + position, this.screenHeight/2, this.circleRadius, 0, 2*Math.PI); //x, y, radius
    this.context.fill();

    // Subtract circle
    this.context.globalCompositeOperation = 'xor';

    // 2nd Circle
    this.context.beginPath();
    this.context.arc(this.screenWidth/2 + distance + position, this.screenHeight/2, this.circleRadius, 0, 2*Math.PI); //x, y, radius
    this.context.fill();
}

/******************************
* Initialize New Scene
******************************/
var sequenceSarahMei = new sequenceSarahMei();

/******************************
* Add Sequences
******************************/
var speaker = new Glitch ('SARAH MEI', -375, 0);
sequenceSarahMei.addEvent('00:02:00', function() {speaker.animateIn()});
sequenceSarahMei.addEvent('00:06:15', function() {speaker.animateOut()});

sequenceSarahMei.addEvent('00:01:15', sequenceSarahMei.vennDiagramIn, [20000, TWEEN.Easing.Deceleration.InOut]);
sequenceSarahMei.addEvent('00:05:15', sequenceSarahMei.vennDiagramOut, [20000, TWEEN.Easing.Deceleration.InOut]);

/******************************
* Add Sequences
******************************/
sequences.push(sequenceSarahMei);