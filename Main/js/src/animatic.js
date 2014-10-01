/******************************
* Extend Scene Prototype
******************************/
var Animatic = function() {
    this.sequence = [];
    this.init();
};

Animatic.prototype = new Sequence();

/******************************
* Add Objects
******************************/
Animatic.prototype.init = function() {
    this.currentFrame = 0;

    this.frames = [
        'WD-frames-Dave_v01-02-DAN-HON1.jpg',
        'WD-frames-Dave_v01-02-DAN-HON2.jpg',
        'WD-frames-Dave_v01-02-DAN-HON3.jpg',
        'WD-frames-Dave_v01-02-DAN-HON4.jpg',
        'WD-frames-Dave_v01-02-DAN-HON5.jpg',
        'WD-frames-Dave_v01-02-MATT-WEBB.jpg',
        'WD-frames-Dave_v01-02-TOBIAS-REBEL2.jpg',
        'WD-frames-Dave_v01-02-TOBIAS-REBEL3.jpg',
        'WD-frames-Dave_v01-02-TOBIAS-REBELL1.jpg',
        'WD-frames-Dave_v01-03-GENEVIEVE-BELL1.jpg',
        'WD-frames-Dave_v01-03-GENEVIEVE-BELL2.jpg',
        'WD-frames-Dave_v01-06-JONATHON-COLEMAN1.jpg',
        'WD-frames-Dave_v01-06-JONATHON-COLEMAN2.jpg',
        'WD-frames-Dave_v01-06-JONATHON-COLEMAN3.jpg',
        'WD-frames-Dave_v01-06-JONATHON-COLEMAN4.jpg',
        'WD-frames-Dave_v01-06-JONATHON-COLEMAN5.jpg',
        'WD-frames-Dave_v01-07-JONNY-MACK1.jpg',
        'WD-frames-Dave_v01-07-JONNY-MACK2.jpg',
        'WD-frames-Dave_v01-07-JONNY-MACK3.jpg',
        'WD-frames-Dave_v01-08-YOUNGHEE-JUNG1.jpg',
        'WD-frames-Dave_v01-08-YOUNGHEE-JUNG2.jpg',
        'WD-frames-Dave_v01-09-SCOTT-THOMAS.jpg',
        'WD-frames-Dave_v01-10-DOUGLAS-BOWMAN.jpg',
        'WD-frames-Dave_v01-11-JESSICA-HISCHE1.jpg',
        'WD-frames-Dave_v01-11-JESSICA-HISCHE2.jpg',
        'WD-frames-Dave_v01-11-JESSICA-HISCHE3.jpg',
        'WD-frames-Dave_v01-11-TOM-ARMITAGE.jpg',
        'WD-frames-Dave_v01-12-ERIN-MOORE1.jpg',
        'WD-frames-Dave_v01-12-ERIN-MOORE2.jpg',
        'WD-frames-Dave_v01-13-JAKE-ARCHIBALD1.jpg',
        'WD-frames-Dave_v01-13-JAKE-ARCHIBALD2.jpg',
        'WD-frames-Dave_v01-13-JAKE-ARCHIBALD3.jpg',
        'WD-frames-Dave_v01-13-JAKE-ARCHIBALD4.jpg',
        'WD-frames-Dave_v01-14-JEREMIAH-LEE1.jpg',
        'WD-frames-Dave_v01-14-JEREMIAH-LEE2.jpg',
        'WD-frames-Dave_v01-14-JEREMIAH-LEE3.jpg',
        'WD-frames-Dave_v01-14-JEREMIAH-LEE4.jpg',
        'WD-frames-Dave_v01-15-SARAH-MEI1.jpg',
        'WD-frames-Dave_v01-15-SARAH-MEI2.jpg',
        'WD-frames-Dave_v01-15-SARAH-MEI3.jpg',
        'WD-frames-Dave_v01-16-JULIO-CESAR-ODY-1.jpg',
        'WD-frames-Dave_v01-16-JULIO-CESAR-ODY-2.jpg',
        'WD-frames-Dave_v01-16-JULIO-CESAR-ODY-3.jpg',
        'WD-frames-Dave_v01-16-JULIO-CESAR-ODY-4.jpg',
        'WD-frames-Dave_v01-17-GUY-PODJARNY-1.jpg',
        'WD-frames-Dave_v01-17-GUY-PODJARNY-2.jpg',
        'WD-frames-Dave_v01-18-KATIE-MILLAR-1.jpg',
        'WD-frames-Dave_v01-18-KATIE-MILLAR-2.jpg',
        'WD-frames-Dave_v01-18-KATIE-MILLAR-3.jpg',
        'WD-frames-Dave_v01-19-BILL-SCOTT-1.jpg',
        'WD-frames-Dave_v01-20-EMILY-NAKASHIMA-1.jpg',
        'WD-frames-Dave_v01-20-EMILY-NAKASHIMA-2.jpg',
        'WD-frames-Dave_v01-20-EMILY-NAKASHIMA-3.jpg',
        'WD-frames-Dave_v01-20-EMILY-NAKASHIMA-4.jpg',
        'WD-frames-Dave_v01-21-SARAH-MADDOX-1.jpg',
        'WD-frames-Dave_v01-21-SARAH-MADDOX-2.jpg',
        'WD-frames-Dave_v01-21-SARAH-MADDOX-3.jpg',
        'WD-frames-Dave_v01-21-SARAH-MADDOX-4.jpg',
        'WD-frames-Dave_v01-22-HADI-MICHAEL-1.jpg',
        'WD-frames-Dave_v01-22-HADI-MICHAEL-2.jpg',
        'WD-frames-Dave_v01-22-HADI-MICHAEL-3.jpg',
        'WD-frames-Dave_v01-23-MARK-DALGESH-1.jpg',
        'WD-frames-Dave_v01-23-MARK-DALGESH-2.jpg'
    ];

    // Preload these images
    $(this.frames).each(function () {
        $('<img />').attr('src', 'shared/img/' + this).appendTo('body').hide();
    });
};

/******************************
* Add Animations
******************************/
Animatic.prototype.swapImages = function() {
    $('img').attr('src', 'shared/img/' + this.frames[this.currentFrame]);
    $('img').show();
    this.currentFrame++;
};

/******************************
* Initialize New Scene
******************************/
var animatic = new Animatic();

/******************************
* Add Sequences
******************************/
for (var i=0; i<animatic.frames.length; i++) {
   animatic.addEvent(pbtp.utilities.convertToTimecode((i + 1) * 2), animatic.swapImages);
}



sequences.push(animatic);