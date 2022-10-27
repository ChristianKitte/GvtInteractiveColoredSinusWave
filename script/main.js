/**
 * Hilfsfuktion zum Berechnen der Sinuswerte auf BAsis von Grad
 * @param degree zu berechnender Grad
 * @param y_scale die zu verwendende Skalierung der Amplitude
 * @returns {number} Der skalierte Sinuswert
 */
function sinusFromDegree(degree, y_scale) {
    let radians = degree * Math.PI / 180.0;
    let y_pos = Math.sin(radians) * y_scale;

    return y_pos;
}

/**
 * Baut die Vertices Array für die Linie und Dreiecke auf Basis der Vorgabewerte
 */
function getVerticesPointsArray() {
    var distance = resolution; // legt über distance die Auflösung fest
    var x_zeichenPos = 0 // legt die nächste Ausgabe fest (unabh. vom Startgrad)

    var lastAmplitude = 0
    var bridgeToRight = true;

    curentStart_val = start_val;

    TriangleVertices = new Float32Array([]);
    LineVertices = new Float32Array([]);
    WaveVertices = new Float32Array([]);

    setInfoText();
    pushLine(-8);
    pushLine(0);
    pushLine(0, 0, 0, 1);

    pushLine(368);
    pushLine(0);
    pushLine(0, 0, 0, 1);

    //91
    //360 * 2
    for (let i = 0; i < 361;) {
        let y_pos = sinusFromDegree(i + start_val, y_scale);
        let next_y_pos = sinusFromDegree(i + start_val + distance, y_scale);

        if ((y_pos < next_y_pos && y_pos > 0) || (y_pos > next_y_pos && y_pos < 0)) {
            bridgeToRight = true;
        } else {
            bridgeToRight = false;
        }

        lastAmplitude = y_pos;

        pushWave(i);
        pushWave(y_pos);
        pushWave(1.0, 0.0, 0.0, 1);
        pushWave(i + distance);
        pushWave(next_y_pos);
        pushWave(1.0, 0.0, 0.0, 1);

        if (bridgeToRight) {
            //******************************
            // Erstes Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            pushTriangle(x_zeichenPos);
            pushTriangle(0);
            pushTriangle(0, 1, 0, 1);

            // Punkt 2 des Dreiecks wenn Bridge right
            pushTriangle(x_zeichenPos + distance);
            pushTriangle(next_y_pos);
            pushTriangle(0, 1, 0, 1);

            // Punkt 3 des Dreiecks wenn Bridge right
            pushTriangle(x_zeichenPos);
            pushTriangle(next_y_pos);
            pushTriangle(0, 1, 0, 1);

            //******************************
            // Zweites Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            pushTriangle(x_zeichenPos);
            pushTriangle(0);
            pushTriangle(0, 0, 1, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            pushTriangle(x_zeichenPos + distance);
            pushTriangle(0);
            pushTriangle(0, 0, 1, 1);

            // Punkt 3 des Dreiecks wenn Bridge right
            pushTriangle(x_zeichenPos + distance);
            pushTriangle(next_y_pos);
            pushTriangle(0, 0, 1, 1);
        } else {
            //******************************
            // Erstes Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            pushTriangle(x_zeichenPos);
            pushTriangle(0);
            pushTriangle(0, 1, 0, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            pushTriangle(x_zeichenPos - distance);
            pushTriangle(next_y_pos);
            pushTriangle(0, 1, 0, 1);

            // Punkt 3 des Dreiecks, wenn Bridge left
            pushTriangle(x_zeichenPos);
            pushTriangle(next_y_pos);
            pushTriangle(0, 1, 0, 1);

            //******************************
            // Zweites Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            pushTriangle(x_zeichenPos);
            pushTriangle(0);
            pushTriangle(0, 0, 1, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            pushTriangle(x_zeichenPos - distance);
            pushTriangle(0);
            pushTriangle(0, 0, 1, 1);

            // Punkt 3 des Dreiecks, wenn Bridge left
            pushTriangle(x_zeichenPos - distance);
            pushTriangle(next_y_pos);
            pushTriangle(0, 0, 1, 1);
        }

        // Wichtiger Sonderfall: Der Graph schneidet die Nulllinie. Für den hier verwendeten
        // Algorithmus darf in diesen Fall die Zeichenposition nicht verändert werden. In allen
        // anderen Fällen muss sie um den Wert von Distance erhöht werden.

        if ((y_pos > 0.0 && next_y_pos < 0.0) || (y_pos < 0.0 && next_y_pos > 0.0) || y_pos === 0) {
            //x_zeichenPos = x_zeichenPos;
        } else {
            //x_zeichenPos = x_zeichenPos + distance;
        }

        // nächste Position einstellen
        x_zeichenPos = x_zeichenPos + distance;
        i = i + distance;
    }
}

/**
 * Belegt den Ausgabebuffer des aktuellen WebGL Programms mit den aktuellen Daten neu und zeichnet die
 * Ausgabe. Das WebGL Programm muss zuvor bereits initialisiert und konfiguriert worden sein.
 */
function RefreshWave() {
    // Arrays für neue Ausgabe füllen
    getVerticesPointsArray();

    // Buffer für die Punkte erzeugen und laden
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    // posAttrib erzeugen und verwenden
    var aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(program, 'aColor');
    gl.enableVertexAttribArray(aColor);

    // Zeiger erzeugen und konfigurieren
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 6 * 4, 0);
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 6 * 4, 2 * 4);

    // alte Ausgabe löschen
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Ausgabe Dreiecke...
    gl.bufferData(gl.ARRAY_BUFFER, TriangleVertices, gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, TriangleVertices.length / 6);

    // Ausgabe Nullinie...
    gl.bufferData(gl.ARRAY_BUFFER, LineVertices, gl.STATIC_DRAW);
    gl.drawArrays(gl.LINES, 0, LineVertices.length / 6);

    if (showSinusLine) {
        // Ausgabe Nullinie...
        gl.bufferData(gl.ARRAY_BUFFER, WaveVertices, gl.STATIC_DRAW);
        gl.drawArrays(gl.LINES, 0, WaveVertices.length / 6);
    }
}

/**
 * Startet die WebGL Anwendung und erste Ausgabe der Grafik
 */
iniWebGLApp();
