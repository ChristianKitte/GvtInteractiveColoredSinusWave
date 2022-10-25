//*************************************************************************
// App Werte
//*************************************************************************

/**
 * Die Anzeige für den aktuelle Startgrad
 * @type {HTMLElement} Das definierte span Element
 */
var currentDegree = document.getElementById("value-degree");

/**
 * Die Anzeige für die aktuelle Amplitude
 * @type {HTMLElement} Das definierte span Element
 */
var currentAmplitude = document.getElementById("value-amplitude");

/**
 * Die Anzeige für die aktuelle Auflösung
 * @type {HTMLElement} Das definierte span Element
 */
var currentResolution = document.getElementById("value-resolution");

const RED = new Float32Array([1, 0, 0, 1]);
const GREEN = new Float32Array([0, 1, 0, 1]);
const BLUE = new Float32Array([0, 0, 1, 1]);

//*************************************************************************
// UI Handler
//*************************************************************************

/**
 * Setzt den Wert für den der Startwert (float) der Sinuskurve und
 * initiiert das Neuzeichnen
 */
document.getElementById("degree").oninput = () => {
    start_val = parseFloat(document.getElementById("degree").value);
    RefreshWave();
}

/**
 * Setzt den Wert für die Amplitude (float) der Sinuskurve und
 * initiiert das Neuzeichnen
 */
document.getElementById("amplitude").oninput = () => {
    y_scale = parseFloat(document.getElementById("amplitude").value);
    RefreshWave();
}

/**
 * Setzt den Wert für die Auflösung (float) der Sinuskurve und
 * initiiert das Neuzeichnen
 */
document.getElementById("resolution").oninput = () => {
    resolution = parseFloat(document.getElementById("resolution").value);
    RefreshWave();
}

function setInfoText() {
    currentDegree.innerText = "Aktueller Startwinkel: " + start_val.toString() + " °";
    currentAmplitude.innerText = "Aktuelle Amplitude: " + y_scale.toString();
    currentResolution.innerText = "Aktuelle Auflösung: " + resolution.toString();
}

/**
 * Ladet die Seite neu und refreshed die Anwendung
 */
document.getElementById("reset").onclick = () => {
    // Firefox setzt die Werte bei einem einfachen Reload nicht zurück!
    document.getElementById("degree").value = 0;
    document.getElementById("amplitude").value = 100;
    document.getElementById("resolution").value = 4;

    start_val = parseFloat(document.getElementById("degree").value);
    y_scale = parseFloat(document.getElementById("amplitude").value);
    resolution = parseFloat(document.getElementById("resolution").value);

    RefreshWave();
}

//*************************************************************************
// interne Werte
//*************************************************************************

/**
 * Hält den anfänglichen Startwert der Sinuskurve beim Start
 * @type {number} Der Startwert
 */
var start_val = 0.0; // ==> StartWert

/**
 * Hält den aktuellen Startwert, de im Verlauf der Ausgabe immer weiter
 * anwächst.
 * @type {number} Der aktuelle Startwert
 */
var curentStart_val = 0.0; // ==> StartWert

/**
 * Hält den aktuellen Wert zur Skalierung der Amplitude
 * @type {number} Der Skalierungswert
 */
var y_scale = 100; // ==> Amplitude

/**
 * Hält die aktuelle Auflösung (Wird durch Distanz bestimmt)
 * @type {number} Die Auflösung
 */
var resolution = 4; // ==> Amplitude


