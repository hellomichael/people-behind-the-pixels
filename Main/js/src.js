// People Behind the Pixels
    //= src/namespace.js
    //= src/utilities.js
    //= src/renderator.js
    //= src/particulator.js
    //= src/emitter.js
    //= src/audio.js
    //= src/glitch.js

// Objects
    //= src/objs/TriangleGeometry.js
    //= src/objs/TriangleShape.js
    //= src/objs/TetrahedronMesh.js
    //= src/objs/RingMesh.js
    //= src/objs/AsteroidsMesh.js
    //= src/objs/IcosahedronMesh.js
    //= src/objs/DacrocyteLine.js

var peopleBehindthePixels = (function () {
    'use strict';

    var timeline = [];
    var renderator = new Renderator();
    var prevTimestamp;
    var delta;
    var speakers;
    var $stats;

    // Initialisation
    var init = function (playtime) {
        if (playtime === undefined) playtime = 0.0;

        // Load audio
        //pbtp.audio.init('shared/audio/interstellar.mp3');
        pbtp.audio.init('shared/audio/music.mp3');
        pbtp.audio.seek('00:55:00');
        //pbtp.audio.mute();

        // Import sequences
            //= src/sequence.js

            // src/sequences/tobias-rebell.js
            // src/sequences/matt-webb.js

            // src/sequences/jonny-mack.js
            // src/sequences/younghee-jung.js

            //= src/sequences/jake-archibald.js
            //= src/sequences/tom-armitage.js
            //= src/sequences/douglas-bowman.js
            //= src/sequences/jeriamiah-lee.js

            //= src/sequences/sarah-mei.js
            //= src/sequences/jessica-hische.js
            //= src/sequences/jessica-hische2.js
            //= src/sequences/erin-moore.js

            // src/sequences/emily-nakashami.js
            // src/sequences/hadi-michael.js

        // Speakers
        speakers = [
            'TOBIAS REVELL',
            'MATT WEBB',
            'GENEVIEVE BELL',
            'DAN HON',
            'JONATHON COLMAN',
            'JONNY MACK',
            'YOUNGHEE JUNG',
            'SCOTT THOMAS',
            'DOUGLAS BOWMAN',
            'TOM ARMITAGE',
            'JESSICA HISCHE',
            'ERIN MOORE',
            'JAKE ARCHIBALD',
            'JEREMIAH LEE',
            'SARAH MEI',
            'JULIO CESAR ODY',
            'GUY PODJARNY',
            'KATIE MILLER',
            'BILL SCOTT',
            'EMILY NAKASHIMA',
            'SARAH MADDOX',
            'MARK DALGLEISH',
            'HADI MICHAEL',
            'PAUL THERIAULT'
        ];

        // Display Stats
        $stats = $('#stats');

        mainLoop(0);
    };

    var mainLoop = function(timestamp) {
        // Determine delta
        if (timestamp == undefined) {
            prevTimestamp = timestamp = 0;
        }

        delta = (timestamp - prevTimestamp) / 1000.0;
        prevTimestamp = timestamp;

        // Updates
        updateSequence(pbtp.audio.getCurrentTime(), delta);
        TWEEN.update(timestamp);

        // Render
        renderator.render(delta);

        // Set callback
        requestAnimationFrame(mainLoop);
    };


    var updateSequence = function (currentTimeAudio, delta) {
        // Refactor to only play one scene at a time
        for (var i = 0; i < timeline.length; i++) {
            timeline[i].update(delta);
            timeline[i].play(currentTimeAudio);
        }

        // Add timecode to page
        $stats.html(Util.toTimecode(currentTimeAudio));
    };


    return {
        init: init
    };
}());