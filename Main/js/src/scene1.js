/******************************
* Extend Scene Prototype
******************************/
var Scene1 = function(name) {
    this.name = name;
    this.sequence = [];
};

Scene1.prototype = new Scene();

/******************************
* Dom Elements
******************************/
var $body = $('body');
var $dave = $('.dave');
var $head = $('.head');
var $face = $('.face');
var $eyes = $('.eyes');
var $eyesClosed = $('.eyes-closed');
var $browLeft = $('.brow-left');
var $browRight = $('.brow-right');
var $hair = $('.hair');
var $glasses = $('.glasses');

/******************************
* Add Animations
******************************/
Scene1.prototype.daveReturns = function() {
    console.log("Dave Returns");
    $dave.transition({
        opacity: 1,
        duration: 1500
    });
};

Scene1.prototype.daveBrows = function() {
    console.log("Dave Brows");
    $browLeft.transition({
        y: '-2px',
        rotate: '-5deg',
        duration: 2000
    }).transition({
        y: '0',
        rotate: '0',
        duration: 1500
    });

    $browRight.transition({
        y: '-2px',
        rotate: '5deg',
        duration: 2000
    }).transition({
        y: '0',
        rotate: '0',
        duration: 1500
    });
};

Scene1.prototype.daveMeditate = function() {
    console.log("Dave Meditate");
    $eyes.hide();
    $eyesClosed.show();
};

/******************************
* Add Sequences
******************************/
var scene1 = new Scene1('Scene 1');
scenes.push(scene1);
scene1.addSequence('00:01:00', 'daveReturns');
scene1.addSequence('00:06:02', 'daveBrows');