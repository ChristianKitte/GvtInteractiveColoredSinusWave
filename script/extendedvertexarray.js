/**
 * Array, das die aktuellen Vertices hält
 * @type {Float32Array} Ein neues Float32 Array
 */
vertices = new Float32Array([]);

/**
 * Hilfsfunktion, um im Array vertices dynamisch einen neuen Wert
 * hinzuzufügen
 *
 * https://stackoverflow.com/questions/24410418/push-on-float32array
 */
function push() {
    vertices = new Float32Array([...vertices, ...arguments]);
}