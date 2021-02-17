/**
*   Class for updating the UI counters and managing the HTML5 Canvas.  
*/

// #region Consts
const CANVAS = document.getElementById("piCanvas");
const CTX = CANVAS.getContext("2d");
const WIDTH = 800;
const HALF_WIDTH = 400;
const PI = Math.PI;
const TWO_PI = Math.PI * 2;
const TOTAL_HITS = document.getElementById("total-hit-count");
const RED_HITS = document.getElementById("red-hit-count");
const BLUE_HITS = document.getElementById("blue-hit-count");
const PI_ESTIMATION = document.getElementById("pi-estimation");
const PI_BEST_ESTIMATION = document.getElementById("pi-best-estimation");
const START_BUTTON = document.getElementById("start-button");
const STOP_BUTTON = document.getElementById("stop-button");
const TEXT_LOG = document.getElementById("text-log");
const NEW_LINE = "\n";
const EMPTY = "";
const WHITE = "#FFFFFF";
const BLACK = "#000000";
// #endregion

let loggingEnabled = true;
let bestEstimation = 0;

class MyUI {

    constructor() {
        CTX.translate(HALF_WIDTH, HALF_WIDTH); // Translate origin to centre.
        CTX.moveTo(0, 0);
        this.reset();
    }

    /** Reset all UI elements to default state and/or value. */
    reset() {
        CTX.fillStyle = WHITE;
        CTX.fillRect(-HALF_WIDTH, -HALF_WIDTH, WIDTH, WIDTH);
        this.drawCircle();
        this.updateCounters({"totalHits":0, "redHits":0, "blueHits":0,  "estimation":"..."});
        TEXT_LOG.innerText = "";
    }

    /** Toggle start/stop buttons. */
    toggleUiState() {
        START_BUTTON.disabled = !START_BUTTON.disabled;
        STOP_BUTTON.disabled = !STOP_BUTTON.disabled;
    }

    /** Draw on Canvas at coordinates in postMessage data. */
    updateCanvas(data) {
        CTX.fillStyle = data.colour;
        CTX.fillRect(data.y, data.x, 1, 1);
    }

    /** Update counters with values in postMessage data. */
    updateCounters(data) {
        TOTAL_HITS.innerText = data.totalHits;
        RED_HITS.innerText = data.redHits;
        BLUE_HITS.innerText = data.blueHits;
        PI_ESTIMATION.innerText = data.estimation;
        this.updateBestEstimation(data.estimation);
        this.log(data.estimation + " (" + data.deltaTime + "ms)");
    }

    /** Calculate if the the latest estimation is the closest to actual PI yet. */
    updateBestEstimation(estimation) {
        Math.abs(PI - estimation) < Math.abs(PI - bestEstimation) ? bestEstimation = estimation : null;
        PI_BEST_ESTIMATION.innerText = "Best: " + bestEstimation; 
    }

    /** Toggle a primitive log of PI estimations. */
    toggleLogging(enabled) {
        !enabled ? TEXT_LOG.innerText = "" : null; 
        loggingEnabled = enabled;
    }

    // ---

    /** Part of Canvas setup. */
    drawCircle() { 
        CTX.fillStyle = BLACK;
        CTX.beginPath();
        CTX.arc(0, 0, HALF_WIDTH, 0, TWO_PI , true); 
        CTX.stroke();
    }

    /** Write text to a the UI 'log'. */
    log(entry) {
        loggingEnabled ? TEXT_LOG.innerText = entry + NEW_LINE + TEXT_LOG.innerText : TEXT_LOG.innerText = EMPTY;
    }
}
