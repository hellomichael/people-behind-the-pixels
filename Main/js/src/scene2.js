/******************************
* Extend Scene Prototype
******************************/
var Scene2 = function(name) {
    this.name = name;
    this.sequence = [];
};

Scene2.prototype = new Scene1();

/******************************
* Add Animations
******************************/
Scene2.prototype.daveGlare = function() {
    console.log("Dave Glares");
    $eyes.show();
    $eyesClosed.hide();
};

Scene2.prototype.daveMeditate = function() {
    console.log("Dave Meditate");
    $eyes.hide();
    $eyesClosed.show();
};

Scene2.prototype.daveBop = function() {
    console.log("Dave Bop");
    $dave.transition({
        y: '3px',
        duration: 150,
        easing: 'easeInOutQuad'
    }).transition({
        y: '0',
        duration: 150,
        delay: 50,
        easing: 'easeInOutQuad'
    });

    $head.transition({
        y: '2px',
        duration: 150,
        easing: 'easeInOutQuad'
    }).transition({
        y: '0',
        duration: 150,
        delay: 50,
        easing: 'easeInOutQuad'
    });

    $glasses.transition({
        y: '1px',
        duration: 150,
        delay: 75,
        easing: 'easeInOutQuad'
    }).transition({
        y: '0',
        duration: 150,
        delay: 50,
        easing: 'easeInOutQuad'
    });

    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    $body.css('background-color', randomColor);
};

/******************************
* Add Sequences
******************************/
var scene2 = new Scene2('Scene 2');
scenes.push(scene2);

// Automagically create a sequence based on bpm
var bpm = 91;
var startTime = pbtp.utilities.convertToSeconds('00:11:20');
var endTime = pbtp.utilities.convertToSeconds('04:15:26');
var count = 0;
var eyesSwitch = false;

for (var i = startTime; i<endTime; i += 60/bpm) {
    var timeCode = pbtp.utilities.convertToTimecode(i);

    scene2.addSequence(timeCode, 'daveBop');

    if (count%4 === 0) { // Every 4 beats close/open eyes
        if (eyesSwitch) {
            scene2.addSequence(timeCode, 'daveGlare');
        }

        else {
            scene2.addSequence(timeCode, 'daveMeditate');
        }

        eyesSwitch = !eyesSwitch;
    }

    count++;
}