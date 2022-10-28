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
 * Hilfsfunktion zum Anlegen des Vertex Array für die Null Linie
 */
function fillLineArray() {
    /**
     * JavaScript Array für die Vertices der Null-Linie
     * @type {Float32Array}
     */
    LineVertices = new Float32Array([]);

    pushLine(-8);
    pushLine(0);
    pushLine(0, 0, 0, 1);

    pushLine(368);
    pushLine(0);
    pushLine(0, 0, 0, 1);
}

/**
 * Baut die Vertices Array für die Linie und Dreiecke auf Basis der Vorgabewerte
 */
function getVerticesPointsArray() {
    /**
     * JavaScript Array für die Vertices der Dreiecke
     * @type {Float32Array}
     */
    TriangleVertices = new Float32Array([]);
    /**
     * JavaScript Array für die Vertices der Sinuskurve
     * @type {Float32Array}
     */
    WaveVertices = new Float32Array([]);

    /**
     * Die X Position für den Wert i
     * @type {number}
     */
    var x_pos = 0;
    /**
     * Die Y Position für den Werte i
     * @type {number}
     */
    var y_pos = 0;
    /**
     * Die Y Position für den Werte i + distance
     * @type {number}
     */
    var next_y_pos = 0;
    /**
     * True, wenn das Dreieck nach rechts gezeichnet wird
     * @type {boolean}
     */
    var bridgeToRight = true

    /**
     * Setzt den Infotext auf Basis der aktuellen Werte
     */
    setInfoText();
    /**
     * Füllt das JavaSycript Array mit den Vertices für die Null Linie
     */
    fillLineArray();


    //91
    /**
     * Füllt alle benötigten Array mit den Positionen und Farbwerten der Vertices.
     */
    for (let Winkelgrad = 0; Winkelgrad < 361;) {
        /**
         * Winkelgrad + Startwert (Offset)
         * @type {number} Winkelgrad zum Rechnen
         */
        let realWinkelgrad = Winkelgrad + Winkelgrad_startValue;

        y_pos = sinusFromDegree(realWinkelgrad, y_scale);
        next_y_pos = sinusFromDegree(realWinkelgrad + resolution, y_scale);

        /**
         * Punkte und Farbe der nächsten Punkte der Sinuswelle ausgeben
         */
        pushWave(Winkelgrad);
        pushWave(y_pos);
        pushWave(1.0, 0.0, 0.0, 1);
        pushWave(Winkelgrad + resolution);
        pushWave(next_y_pos);
        pushWave(1.0, 0.0, 0.0, 1);

        /**
         * Bestimmen, ob das nächste Dreieck nach rechts oder links gezeichnet werden muss.
         */
        if ((next_y_pos >= y_pos) && y_pos > 0 || (next_y_pos <= y_pos) && y_pos < 0) {
            bridgeToRight = true;
        } else {
            bridgeToRight = false;
        }

        /**
         * Bestimmen, ob das nächste Dreieck nach rechts oder links gezeichnet werden muss.
         */
        /*if ((Winkelgrad >= 0 && Winkelgrad < 90) || (Winkelgrad >= 180 && Winkelgrad < 270)) {
            bridgeToRight = true;
        } else {
            bridgeToRight = false;
        }*/

        if (bridgeToRight) {
            //******************************
            // Erstes Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            pushTriangle(x_pos);
            pushTriangle(0);
            pushTriangle(0, 1, 0, 1);

            // Punkt 2 des Dreiecks wenn Bridge right
            pushTriangle(x_pos + resolution);
            pushTriangle(y_pos);
            pushTriangle(0, 1, 0, 1);

            // Punkt 3 des Dreiecks wenn Bridge right
            pushTriangle(x_pos);
            pushTriangle(y_pos);
            pushTriangle(0, 1, 0, 1);

            //******************************
            // Zweites Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            pushTriangle(x_pos);
            pushTriangle(0);
            pushTriangle(0, 0, 1, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            pushTriangle(x_pos + resolution);
            pushTriangle(0);
            pushTriangle(0, 0, 1, 1);

            // Punkt 3 des Dreiecks wenn Bridge right
            pushTriangle(x_pos + resolution);
            pushTriangle(y_pos);
            pushTriangle(0, 0, 1, 1);
        } else {
            //******************************
            // Erstes Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            pushTriangle(x_pos);
            pushTriangle(0);
            pushTriangle(0, 1, 0, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            pushTriangle(x_pos + resolution);
            pushTriangle(y_pos);
            pushTriangle(0, 1, 0, 1);

            // Punkt 3 des Dreiecks, wenn Bridge left
            pushTriangle(x_pos);
            pushTriangle(y_pos);
            pushTriangle(0, 1, 0, 1);

            //******************************
            // Zweites Dreieck
            //******************************

            // Punkt 1 des Dreiecks
            pushTriangle(x_pos);
            pushTriangle(0);
            pushTriangle(0, 0, 1, 1);

            // Punkt 2 des Dreiecks wenn Bridge left
            pushTriangle(x_pos + resolution);
            pushTriangle(0);
            pushTriangle(0, 0, 1, 1);

            // Punkt 3 des Dreiecks, wenn Bridge left
            pushTriangle(x_pos + resolution);
            pushTriangle(y_pos);
            pushTriangle(0, 0, 1, 1);
        }

        x_pos = x_pos + resolution;
        Winkelgrad = Winkelgrad + resolution;
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

    // optional Ausgabe Sinuskurve...
    if (showSinusLine) {
        gl.bufferData(gl.ARRAY_BUFFER, WaveVertices, gl.STATIC_DRAW);
        gl.drawArrays(gl.LINES, 0, WaveVertices.length / 6);
    }
}

/**
 * Startet die WebGL Anwendung und erste Ausgabe der Grafik
 */
iniWebGLApp();
