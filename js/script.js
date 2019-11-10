
//// Variables and Objects ////

var timePnlEl = document.getElementById("timePnl");
var backToStartBtnEl = document.getElementById("backToStartBtn");
var startPauseBtnEl = document.getElementById("startPauseBtn");
var slowerBtnEl = document.getElementById("slowerBtn");

var waveSourceLabelEl = document.getElementById("waveSourceLabel");
var prevWaveSourceBtnEl = document.getElementById("prevWaveSourceBtn");
var nextWaveSourceBtnEl = document.getElementById("nextWaveSourceBtn");
var waveSourceXEl = document.getElementById("waveSourceX");
var waveSourceYEl = document.getElementById("waveSourceY");
var waveSourceAmplMaxEl = document.getElementById("waveSourceAmplMax");
var waveSourceFrequencyEl = document.getElementById("waveSourceFrequency");
var waveSourcePhaseEl = document.getElementById("waveSourcePhase");
var waveSourceRmvBtnEl = document.getElementById("waveSourceRmvBtn");

var fieldSizeXEl = document.getElementById("fieldSizeX");
var fieldSizeYEl = document.getElementById("fieldSizeY");
var waveVelocityEl = document.getElementById("waveVelocity");
var timeEl = document.getElementById("time");
var segmentsXEl = document.getElementById("segmentsX");
var segmentsYEl = document.getElementById("segmentsY");

const fieldSizeXDef = 100;
var fieldSizeX = fieldSizeXDef;

const fieldSizeYDef = 100;
var fieldSizeY = fieldSizeYDef;

const waveVelocityDef = 15;
var waveVelocity = waveVelocityDef;

const timeDef = 0;
var time = timeDef;

var timeRunning = false;
var timeSlower = false;
var slowerFactor = 1;

const segmentsXDef = 30;
var segmentsX = segmentsXDef;

const segmentsYDef = 30;
var segmentsY = segmentsYDef;

const amplMaxDef = 2;
const fDef = 5;
const phaseDef = 2;

var fps = 30;
var fpsInterval = 1000 / fps;
var then = Date.now();
var startTime = then;

var waveSourcesCurtainDown = false;
var fieldCurtainDown = false;

var selectedWaveSource = 1;

var lightThemeOn = false;

function updateField() {

    if (checkValDec(fieldSizeXEl.value)) {
        fieldSizeX = parseFloat(document.getElementById("fieldSizeX").value, 10);
    } else {
        document.getElementById("fieldSizeX").value = fieldSizeXDef;
        fieldSizeX = fieldSizeXDef;
    }

    if (checkValDec(fieldSizeYEl.value)) {
        fieldSizeY = parseFloat(document.getElementById("fieldSizeY").value, 10);
    } else {
        document.getElementById("fieldSizeY").value = fieldSizeYDef;
        fieldSizeY = fieldSizeYDef;
    }

    if (checkValDec(waveVelocityEl.value)) {
        waveVelocity = parseFloat(document.getElementById("waveVelocity").value, 10);
    } else {
        document.getElementById("waveVelocity").value = waveVelocityDef;
        waveVelocity = waveVelocityDef;
    }

    if (checkValDec(timeEl.value)) {
        time = parseFloat(document.getElementById("time").value, 10);
    } else {
        document.getElementById("time").value = timeDef;
        time = timeDef;
    }

    if (checkValInt(segmentsXEl.value)) {
        segmentsX = parseFloat(document.getElementById("segmentsX").value, 10);
    } else {
        document.getElementById("segmentsX").value = segmentsXDef;
        segmentsX = segmentsXDef;
    }

    if (checkValInt(segmentsYEl.value)) {
        segmentsY = parseFloat(document.getElementById("segmentsY").value, 10);
    } else {
        document.getElementById("segmentsY").value = segmentsYDef;
        segmentsY = segmentsYDef;
    }

    updateWaveSource();
}

function stopTime() {
    if (timeRunning) {
        startPauseBtnEl.style.color = "#4CAF50"; //green
        startPauseBtnEl.style.background = "transparent";
        startPause();
    }
}

function backToStart() {

    backToStartBtnEl.onmouseenter = () => {
        backToStartBtnEl.style.color = "white";
        backToStartBtnEl.style.background = "#7d7d7d"; // grey
    }

    backToStartBtnEl.onmouseleave = () => {
        backToStartBtnEl.style.color =  "#7d7d7d"; // grey
        backToStartBtnEl.style.background = "transparent";
    }

    time = 0;
}

function startPause() {

    if (!timeRunning) {

        startPauseBtnEl.innerText = "||";

        startPauseBtnEl.onmouseenter = () => {
            startPauseBtnEl.style.color = "#4CAF50"; //green
            startPauseBtnEl.style.background = "transparent";
        }

        startPauseBtnEl.onmouseleave = () => {
            startPauseBtnEl.style.color = "white";
            startPauseBtnEl.style.background = "#4CAF50"; //green
        }

        if (!timeSlower) {

            timePnlEl.style.color = "#4CAF50"; //green
            timeEl.style.color = "#4CAF50"; //green
        } else {

            timePnlEl.style.color =  "#ff751b"; //orange
            timeEl.style.color =  "#ff751b"; //orange
        }

        timeRunning = true;

        animate();

    } else {

        startPauseBtnEl.innerText = "▷";

        startPauseBtnEl.onmouseenter = () => {
            startPauseBtnEl.style.color = "white";
            startPauseBtnEl.style.background = "#4CAF50"; //green
        }

        startPauseBtnEl.onmouseleave = () => {
            startPauseBtnEl.style.color = "#4CAF50"; //green
            startPauseBtnEl.style.background = "transparent";
        }

        timeRunning = false;

        timePnlEl.style.color = "#7d7d7d"; // grey
        timeEl.style.color = "white";
        animate();
    }
}

function runSlower() {

    if (!timeSlower) {
        slowerBtnEl.onmouseenter = () => {
            slowerBtnEl.style.color = "#ff751b"; //orange
            slowerBtnEl.style.background = "transparent";
        }

        slowerBtnEl.onmouseleave = () => {
            slowerBtnEl.style.color = "white";
            slowerBtnEl.style.background = "#ff751b"; //orange
        }

        slowerFactor = 0.5;
        timeSlower = true;

        if (!timeRunning) {
            timePnlEl.style.color = "white";
            timeEl.style.color = "white";
        } else {
            timePnlEl.style.color = "#ff751b"; //orange
            timeEl.style.color = "#ff751b"; //orange
        }
        animate();

    } else {
        slowerBtnEl.onmouseenter = () => {
            slowerBtnEl.style.color = "white";
            slowerBtnEl.style.background = "#ff751b"; //orange
        }

        slowerBtnEl.onmouseleave = () => {
            slowerBtnEl.style.color = "#ff751b"; //orange
            slowerBtnEl.style.background = "transparent";
        }

        slowerFactor = 1;
        timeSlower = false;
        if (!timeRunning) {
            timePnlEl.style.color = "#7d7d7d"; // grey
            timeEl.style.color = "white";
        } else {
            timePnlEl.style.color = "#4CAF50"; //green
            timeEl.style.color = "#4CAF50"; //green
        }
        animate();
    }
}

function updateWaveSource() {

    waveSources[selectedWaveSource - 1].x = waveSourceXEl.value;
    waveSources[selectedWaveSource - 1].y = waveSourceYEl.value;

    if (checkValDec(waveSourceAmplMaxEl.value)) { waveSources[selectedWaveSource - 1].amplMax = waveSourceAmplMaxEl.value; }
    else { waveSourceAmplMaxEl.value = amplMaxDef; waveSources[selectedWaveSource - 1].amplMax = amplMaxDef; }

    if (checkValDec(waveSourceFrequencyEl.value)) { waveSources[selectedWaveSource - 1].f = waveSourceFrequencyEl.value; }
    else { waveSourceFrequencyEl.value = fDef; waveSources[selectedWaveSource - 1].f = fDef; }

    if (checkValDec(waveSourcePhaseEl.value)) { waveSources[selectedWaveSource - 1].phase = waveSourcePhaseEl.value; }
    else { waveSourcePhaseEl.value = phaseDef; waveSources[selectedWaveSource - 1].phase = phaseDef; }

    updateWaveSourceGeometry();
}

function waveSourcesCurtain() {

    var waveSourcesCurtainEl = document.getElementById("waveSourcesCurtain");
    var waveSourcesCurtainBtnEl = document.getElementById("waveSourcesCurtainBtn");

    waveSourcesCurtainBtnEl.onmouseenter = () => {
        waveSourcesCurtainBtnEl.style.color = "#ff751b"; //orange
    }

    waveSourcesCurtainBtnEl.onmouseleave = () => {
        waveSourcesCurtainBtnEl.style.color = "white";
    }

    if (!waveSourcesCurtainDown) {

        waveSourcesCurtainEl.style.height = "80%";

        waveSourcesCurtainBtnEl.style.bottom = "20px";
        waveSourcesCurtainBtnEl.innerText = "△ wave sources △";

        waveSourcesCurtainDown = true;


    } else {

        waveSourcesCurtainEl.style.height = "32px";

        waveSourcesCurtainBtnEl.style.bottom = "50%";
        waveSourcesCurtainBtnEl.innerText = "▽ wave sources ▽";

        waveSourcesCurtainDown = false;
    }

    updateWaveSourceGeometry();
}

function prevWaveSource() {

    selectedWaveSource--;

    waveSourceLabelEl.innerText = "wave source " + selectedWaveSource;

    if (waveSources.length == 1) {
        nextWaveSourceBtnEl.innerText = "▷+";
        nextWaveSourceBtnEl.onmouseover = () => {nextWaveSourceBtnEl.innerText = "▶+";};
        nextWaveSourceBtnEl.onmouseout = () => {nextWaveSourceBtnEl.innerText = "▷+";};
    }

    if (selectedWaveSource == 1) {
        prevWaveSourceBtnEl.innerText = "";
        prevWaveSourceBtnEl.disabled = true;
    }

    if (selectedWaveSource == waveSources.length - 1) {
        nextWaveSourceBtnEl.innerText = "▷";
        nextWaveSourceBtnEl.onmouseover = () => {nextWaveSourceBtnEl.innerText = "▶";};
        nextWaveSourceBtnEl.onmouseout = () => {nextWaveSourceBtnEl.innerText = "▷";};
    }

    updateWaveSourceCurtain();

    updateWaveSourceGeometry();
}

function nextWaveSource() {

    selectedWaveSource++;

    waveSourceLabelEl.innerText = "wave source " + selectedWaveSource;

    if (selectedWaveSource == 2) {
        prevWaveSourceBtnEl.innerText = "◁";
        prevWaveSourceBtnEl.disabled = false;
    }

    if (selectedWaveSource == waveSources.length) {
        nextWaveSourceBtnEl.innerText = "▷+";
        nextWaveSourceBtnEl.onmouseover = () => {nextWaveSourceBtnEl.innerText = "▶+";};
        nextWaveSourceBtnEl.onmouseout = () => {nextWaveSourceBtnEl.innerText = "▷+";};
    }

    if (selectedWaveSource == waveSources.length + 1) {

        waveSources.push(new WaveSource(round(Math.random() * (1 - 0.01) + 0.01, 2).toFixed(2), round(Math.random() * (1 - 0.01) + 0.01, 2).toFixed(2), 2, 5, 2));

        if (waveSources.length == 2) {
            waveSourceRmvBtnEl.disabled = false;
            waveSourceRmvBtnEl.style.visibility="visible";
        }
    }

    updateWaveSourceCurtain();

    updateWaveSourceGeometry();
}

function updateWaveSourceGeometry() {

    for (i = 0; i <= waveSources.length; i++) {
        scene.remove(scene.getObjectByName(i));
    }

    for (i = 0; i < waveSources.length; i++) {

        var waveSourceGeometry = new THREE.Geometry();
        waveSourceGeometry.vertices.push(
            new THREE.Vector3(waveSources[i].x * fieldSizeX - fieldSizeX / 2, 25, waveSources[i].y * fieldSizeY - fieldSizeY / 2),
            new THREE.Vector3(waveSources[i].x * fieldSizeX - fieldSizeX / 2, -10, waveSources[i].y * fieldSizeY - fieldSizeY / 2)
        );

        var waveSourceMaterial = new THREE.LineBasicMaterial();

        if (i == selectedWaveSource - 1 && waveSourcesCurtainDown) { waveSourceMaterial.color.set(0xff751b); } //orange
        else { waveSourceMaterial.color.set(0x7d7d7d); } //grey

        var waveSourceMesh = new THREE.Line(waveSourceGeometry, waveSourceMaterial);
        waveSourceMesh.name = i;
        scene.add(waveSourceMesh);
    }
}

function updateWaveSourceCurtain() {

    if (waveSources.length == 1) {
        nextWaveSourceBtnEl.innerText = "▷+";
        nextWaveSourceBtnEl.onmouseover = () => {nextWaveSourceBtnEl.innerText = "▶+";};
        nextWaveSourceBtnEl.onmouseout = () => {nextWaveSourceBtnEl.innerText = "▷+";};
    }

    waveSourceXEl.value = waveSources[selectedWaveSource - 1].x;
    waveSourceYEl.value = waveSources[selectedWaveSource - 1].y;
    waveSourceXLbl2.innerText = round(waveSources[selectedWaveSource - 1].x * fieldSizeX, 2).toFixed(2) + ' UL';
    waveSourceYLbl2.innerText = round(waveSources[selectedWaveSource - 1].y * fieldSizeY, 2).toFixed(2) + ' UL';
    waveSourceAmplMaxEl.value = waveSources[selectedWaveSource - 1].amplMax;
    waveSourceFrequencyEl.value = waveSources[selectedWaveSource - 1].f;
    waveSourcePhaseEl.value = waveSources[selectedWaveSource - 1].phase;
}

function removeWaveSource() {

    waveSources.splice(selectedWaveSource - 1, 1);

    if (selectedWaveSource == waveSources.length + 1) {
        prevWaveSource();
        scene.remove(scene.getObjectByName(selectedWaveSource));
    } else {
        updateWaveSourceCurtain();
    }

    updateWaveSourceGeometry();

    if (waveSources.length == 1) {
        waveSourceRmvBtn.style.visibility="hidden";
        waveSourceRmvBtnEl.disabled = true;
    }
}

function fieldCurtain() {

    var fieldCurtainEl = document.getElementById("fieldCurtain");
    var fieldCurtainBtnEl = document.getElementById("fieldCurtainBtn");

    fieldCurtainBtnEl.onmouseenter = () => {
        fieldCurtainBtnEl.style.color = "#006bb3"; //blue
    }

    fieldCurtainBtnEl.onmouseleave = () => {
        fieldCurtainBtnEl.style.color = "white";
    }

    if (!fieldCurtainDown) {

        fieldCurtainEl.style.height = "80%";

        fieldCurtainBtnEl.style.bottom = "20px";
        fieldCurtainBtnEl.innerText = "△ field △";

        fieldCurtainDown = true;

    } else {

        fieldCurtainEl.style.height = "32px";

        fieldCurtainBtnEl.style.bottom = "50%";
        fieldCurtainBtnEl.innerText = "▽ field ▽";

        fieldCurtainDown = false;
    }
}

function lightTheme() {

    if (!lightThemeOn) {

        lightThemeOn = true;
        renderer.setClearColor('#b3b3b3'); // light-grey
    } else {
        lightThemeOn = false;
        renderer.setClearColor('#262626'); // clear-grey
    }
}

function WaveSource (x, y, amplMax, f, phase) {
    this.x = x;
    this.y = y;
    this.amplMax = amplMax;
    this.f = f;
    this.phase = phase;
}

var waveSources = [
    new WaveSource(0.2, 0.2, 2, 5, 2),
    new WaveSource(0.8, 0.2, 2, 5, 2)
];

function checkValDec(value) {

    return !isNaN(parseFloat(value)) && isFinite(value);
}

function checkValInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function distance(x1, y1, x2, y2) { return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)) }


document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        startPause();
    }
});


//// Three.js ////

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 75;
camera.position.z = 150;

updateWaveSourceGeometry();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#262626');
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.zoomSpeed = 2;
controls.maxDistance = 1500;

window.addEventListener('resize', () => {

    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

var directionalLight = new THREE.DirectionalLight();
directionalLight.position.set(-3, 5, 5);
scene.add(directionalLight);


//// Animation ////

animate();

function animate() {

    requestAnimationFrame(animate);

    var now = Date.now();
    var elapsed = now - then;

    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);

        if (timeRunning) {
            time += (fpsInterval / 1000) * slowerFactor;
        }

        timePnlEl.innerText = round(time, 2).toFixed(2) + ' s';
        if (timeRunning) {
            timeEl.value = round(time, 2).toFixed(2);
        }

        var fieldGeometry = new THREE.ParametricGeometry(paramFunction, segmentsX, segmentsY);

        var fieldMaterial = new THREE.MeshPhongMaterial( {color: 0x006bb3, side: THREE.DoubleSide} ); //blue
        var fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);

        scene.add(fieldMesh);

        controls.update();

        renderer.render(scene, camera);

        scene.remove(fieldMesh);

        fieldMesh.geometry.dispose();
        fieldMesh.material.dispose();
    }
}
