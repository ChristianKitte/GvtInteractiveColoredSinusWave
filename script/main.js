/**
 * Baut ein Vertices Array auf Basis der Vorgabewerte
 * @returns {Float32Array|*}
 */
function getVerticesPointsArray() {
    var distance = resolution; // legt über distance die Auflösung fest
    var x_zeichenPos = 1; // legt die nächste Ausgabe fest (unabh. vom Startgrad)
    var y_pos = 0;

    var lastAmplitude = 0
    var bridgeToRight = true;

    curentStart_val = start_val;

    vertices = new Float32Array([]);

    currentDegree.innerText = "Aktueller Startwinkel: " + start_val.toString() + " °";
    currentAmplitude.innerText = "Aktuelle Amplitude: " + y_scale.toString();
    currentResolution.innerText = "Aktuelle Auflösung: " + resolution.toString();

    for (let i = 0; i < 91; i++) {
        let radians = curentStart_val * Math.PI / 180.0;
        y_pos = Math.sin(radians) * y_scale;

        let nextRadians = (curentStart_val + distance) * Math.PI / 180.0;
        let nextY_pos = Math.sin(nextRadians) * y_scale;

        if ((y_pos < nextY_pos && y_pos > 0) || (y_pos > nextY_pos && y_pos < 0)) {
            bridgeToRight = true;
        } else {
            bridgeToRight = false;
        }

        lastAmplitude = y_pos;

        if (bridgeToRight) {
            //******************************
            // Erstes Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            push(x_zeichenPos);
            push(0);

            // Punkt 2 des Dreiecks wenn Bridge left
            push(x_zeichenPos + distance);
            push(y_pos);

            // Punkt 3 des Dreiecks wenn Bridge right
            push(x_zeichenPos);
            push(y_pos);

            push(firstColor[0]);
            push(firstColor[1]);
            push(firstColor[2]);
            push(firstColor[3]);
            //******************************
            // Zweites Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            push(x_zeichenPos);
            push(0);

            // Punkt 2 des Dreiecks wenn Bridge left
            push(x_zeichenPos + distance);
            push(0);

            // Punkt 3 des Dreiecks wenn Bridge right
            push(x_zeichenPos + distance);
            push(y_pos);

            push(secondColor[0]);
            push(secondColor[1]);
            push(secondColor[2]);
            push(secondColor[3]);
        } else {
            //******************************
            // Erstes Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            push(x_zeichenPos);
            push(0);

            // Punkt 2 des Dreiecks wenn Bridge left
            push(x_zeichenPos);
            push(y_pos);

            // Punkt 3 des Dreiecks, wenn Bridge left
            push((x_zeichenPos) - distance);
            push(y_pos);

            push(firstColor[0]);
            push(firstColor[1]);
            push(firstColor[2]);
            push(firstColor[3]);
            //******************************
            // Zweites Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            push(x_zeichenPos);
            push(0);

            // Punkt 2 des Dreiecks wenn Bridge left
            push((x_zeichenPos) - distance);
            push(y_pos);

            // Punkt 3 des Dreiecks, wenn Bridge left
            push((x_zeichenPos) - distance);
            push(0);

            push(secondColor[0]);
            push(secondColor[1]);
            push(secondColor[2]);
            push(secondColor[3]);
        }

        curentStart_val = curentStart_val + distance; // legt den Grad für diee nächste Berechnung fest

        // Wichtiger Sonderfall: Der Graph schneidet die Nulllinie. Für den hier verwendeten
        // Algorithmus darf in diesen Fall die Zeichenposition nicht verändert werden. In allen
        // anderen Fällen muss sie um den Wert von Distance erhöht werden.
        if ((y_pos > 0.0 && nextY_pos < 0.0) || (y_pos < 0.0 && nextY_pos > 0.0) || y_pos === 0) {
            x_zeichenPos = x_zeichenPos;
        } else {
            x_zeichenPos = x_zeichenPos + distance;
        }
    }

    return vertices;
}

/**
 * Belegt den Ausgabebuffer des aktuellen WebGL Programms mit den aktuellen Daten neu und zeichnet die
 * Ausgabe. Das WebGL Programm muss zuvor bereits initialisiert und konfiguriert worden sein.
 */
function RefreshWave() {
    // Aktuelle Punkte berechnen und zurückgeben lassen
    var verticesPointsArray = getVerticesPointsArray();

    // Buffer für die Punkte erzeugen und laden
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verticesPointsArray, gl.STATIC_DRAW);

    // posAttrib erzeugen und verwenden
    var aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(program, 'aColor');
    gl.enableVertexAttribArray(aColor);

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 6 * 4, 0);
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 6 * 4, 2 * 4);

    // Ausgabe mit drawArray
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 90);

}

/**
 * Startet die WebGL Anwendung und erste Ausgabe der Grafik
 */
iniWebGLApp();
