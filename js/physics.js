
var paramFunction = (u, v, target) => {

    var u = u * fieldSizeX;
    var v = v * fieldSizeY;

    ampl = 0;

    for (i = 0; i < waveSources.length; i++) {

        var waveLength = waveVelocity / waveSources[i].f;
        var period = 1 / waveSources[i].f;
        var dist = distance(u, v, waveSources[i].x * fieldSizeX, waveSources[i].y * fieldSizeY);

        if (time * waveVelocity >= dist) { ampl += waveSources[i].amplMax * Math.sin((time / period - dist / waveLength) + waveSources[i].phase * Math.PI); }
    }

    var x = u;
    var y = ampl;
    var z = v;

    target.set(x - fieldSizeX / 2, y, z - fieldSizeY / 2);
}
