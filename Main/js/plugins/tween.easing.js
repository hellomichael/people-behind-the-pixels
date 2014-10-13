TWEEN.Easing.Deceleration = {};

TWEEN.Easing.Deceleration.InOut = function(k) {
    var t = (k*100); // add this
    var d = 100; // add this

    var result = -Math.pow(15, -15 * t/d) + 1;

    return result;
};