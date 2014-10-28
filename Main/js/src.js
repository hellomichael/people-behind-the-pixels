// People Behind the Pixels
    //= src/namespace.js
    //= src/utilities.js
    //= src/renderator.js
    //= src/particulator.js
    //= src/emitter.js
    //= src/audio.js
    //= src/glitch.js
    //= src/hexgrid.js

// Objects
    //= src/objs/TriangleGeometry.js
    //= src/objs/TriangleShape.js
    //= src/objs/TetrahedronMesh.js
    //= src/objs/RingMesh.js
    //= src/objs/AsteroidsMesh.js
    //= src/objs/IcosahedronMesh.js
    //= src/objs/DacrocyteLine.js
    //= src/objs/CubeMesh.js

var peopleBehindthePixels = (function () {
    'use strict';

    var timeline = [];
    var renderator = new Renderator();
    var prevTimestamp;
    var delta;
    var noise;
    var speakers;
    var $stats;

    // Initialisation
    var init = function (playtime) {
        if (playtime === undefined) playtime = 0.0;

        // Load audio
        //pbtp.audio.init('shared/audio/interstellar.mp3');
        noise = false;
        pbtp.audio.init('shared/audio/music.mp3');
        //pbtp.audio.seek('01:05:00');
        pbtp.audio.seek('00:20:00');
        //pbtp.audio.mute();

        // Import sequences
            //= src/sequence.js

            //= src/sequences/tobias-revell.js
            //= src/sequences/matt-webb.js

            //= src/sequences/jonny-mack.js
            //= src/sequences/younghee-jung.js

            //= src/sequences/jake-archibald.js
            //= src/sequences/tom-armitage.js
            //= src/sequences/douglas-bowman.js
            //= src/sequences/jeriamiah-lee.js
            // = src/sequences/sarah-mei.js

            // = src/sequences/jessica-hische.js
            // = src/sequences/jessica-hische2.js
            // = src/sequences/erin-moore.js


            // = src/sequences/guy-podjarny.js
            // = src/sequences/emily-nakashami.js




            // = src/sequences/hadi-michael.js
            // = src/sequences/julio-cesar-ody.js
            // = src/sequences/mark-dalgesh.js
            // = src/sequences/paul-theriault.js


            // src/sequences/web-directions.js


        // Speakers
        speakers = [
            'x TOBIAS REVELL',
            'x MATT WEBB',
            'x JONNY MACK',
            'x YOUNGHEE JUNG',
            'x DOUGLAS BOWMAN',
            'x SCOTT THOMAS',
            'x TOM ARMITAGE',
            'x JESSICA HISCHE',
            'x ERIN MOORE',
            'x JAKE ARCHIBALD',
            'x JEREMIAH LEE',
            'x SARAH MEI',
            'x GUY PODJARNY',
            'x KATIE MILLER',
            'x SARAH MADDOX',
            'x DAN HON',


            '- PAUL THERIAULT',
            '- MARK DALGLEISH',
            '- EMILY NAKASHIMA',


            'GENEVIEVE BELL',
            'JONATHON COLMAN',
            'BILL SCOTT',
            'JULIO CESAR ODY',
            'HADI MICHAEL',
        ];

        // Display Stats
        $stats = $('#stats');

        if (noise) {
           $('#noise').css('background', 'url("../shared/img/noise.gif") center center');
        }

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