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

    setInfoText();

    //91
    for (let i = 0; i < 360 * 2;) {
        let y_pos = sinusFromDegree(i + start_val, y_scale);
        let next_y_pos = sinusFromDegree(i + start_val + distance, y_scale);

        if ((y_pos < next_y_pos && y_pos > 0) || (y_pos > next_y_pos && y_pos < 0)) {
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
            push(0, 1, 0, 1);

            // Punkt 2 des Dreiecks wenn Bridge rigt
            push(x_zeichenPos + distance);
            push(next_y_pos);
            push(0, 1, 0, 1);

            // Punkt 3 des Dreiecks wenn Bridge right
            push(x_zeichenPos);
            push(next_y_pos);
            push(0, 1, 0, 1);

            //******************************
            // Zweites Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            push(x_zeichenPos);
            push(0);
            push(0, 0, 1, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            push(x_zeichenPos + distance);
            push(0);
            push(0, 0, 1, 1);

            // Punkt 3 des Dreiecks wenn Bridge right
            push(x_zeichenPos + distance);
            push(next_y_pos);
            push(0, 0, 1, 1);

        } else {
            //******************************
            // Erstes Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            push(x_zeichenPos);
            push(0);
            push(0, 1, 0, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            push(x_zeichenPos + distance);
            push(next_y_pos);
            push(0, 1, 0, 1);

            // Punkt 3 des Dreiecks, wenn Bridge left
            push(x_zeichenPos);
            push(next_y_pos);
            push(0, 1, 0, 1);

            //******************************
            // Zweites Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            push(x_zeichenPos);
            push(0);
            push(0, 0, 1, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            push(x_zeichenPos + distance);
            push(0);
            push(0, 0, 1, 1);

            // Punkt 3 des Dreiecks, wenn Bridge left
            push(x_zeichenPos + distance);
            push(next_y_pos);
            push(0, 0, 1, 1);

        }

        //curentStart_val = curentStart_val + distance; // legt den Grad für diee nächste Berechnung fest

        // Wichtiger Sonderfall: Der Graph schneidet die Nulllinie. Für den hier verwendeten
        // Algorithmus darf in diesen Fall die Zeichenposition nicht verändert werden. In allen
        // anderen Fällen muss sie um den Wert von Distance erhöht werden.

        if ((y_pos > 0.0 && next_y_pos < 0.0) || (y_pos < 0.0 && next_y_pos > 0.0) || y_pos === 0) {
            x_zeichenPos = x_zeichenPos;
        } else {
            x_zeichenPos = x_zeichenPos + distance;
        }

        i = i + distance;

        //console.log(x_zeichenPos);
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

    //gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 2 * 4, 0);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 6 * 4, 0);
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 6 * 4, 2 * 4);

    // Ausgabe mit drawArray
    gl.clear(gl.COLOR_BUFFER_BIT);
    // isolated Triangles...
    gl.drawArrays(gl.TRIANGLES, 0, verticesPointsArray.length / 3 * 2);

}

/**
 * Startet die WebGL Anwendung und erste Ausgabe der Grafik
 */
iniWebGLApp();
