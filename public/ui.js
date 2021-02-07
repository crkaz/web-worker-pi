//#region Consts
const CANVAS = document.getElementById("piCanvas");
const CTX = CANVAS.getContext("2d");
const WIDTH = 800;
const HALF_WIDTH = 400;
const TWO_PI = Math.PI * 2;
const TOTAL_HITS = document.getElementById("total-hit-count");
const RED_HITS = document.getElementById("red-hit-count");
const BLUE_HITS = document.getElementById("blue-hit-count");
const PI_ESTIMATION = document.getElementById("pi-estimation");
const START_BUTTON = document.getElementById("start-button");
const STOP_BUTTON = document.getElementById("stop-button");
const TEXT_LOG = document.getElementById("text-log");
const NEW_LINE = "\n";
const EMPTY = "";
//#endregion

let loggingEnabled = false;

class MyUI {
    constructor() {
        CTX.translate(HALF_WIDTH, HALF_WIDTH); // Translate origin to centre.
        CTX.moveTo(0, 0);
        this.reset();
    }

    reset() {
        CTX.fillStyle = "#FFFFFF";
        CTX.fillRect(-HALF_WIDTH, -HALF_WIDTH, WIDTH, WIDTH);
        this.drawCircle();
        this.updateCounters({"totalHits":0, "redHits":0, "blueHits":0,  "estimation":0});
        TEXT_LOG.innerText = "";
    }

    toggleUiState() {
        START_BUTTON.disabled = !START_BUTTON.disabled;
        STOP_BUTTON.disabled = !STOP_BUTTON.disabled;
    }

    updateCanvas(data) {
        CTX.fillStyle = data.colour;
        CTX.fillRect(data.y, data.x, 1, 1);
    }

    updateCounters(data) {
        TOTAL_HITS.innerText = data.totalHits;
        RED_HITS.innerText = data.redHits;
        BLUE_HITS.innerText = data.blueHits;
        PI_ESTIMATION.innerText = data.estimation;
        this.log(data.estimation);
    }

    toggleLogging(enabled) {
        !enabled ? TEXT_LOG.innerText = "" : null; 
        loggingEnabled = enabled;
    }

    // ---

    drawCircle() { 
        CTX.fillStyle = "#000000";
        CTX.beginPath();
        CTX.arc(0, 0, HALF_WIDTH, 0, TWO_PI , true); 
        CTX.stroke();
    }

    log(entry) {
        loggingEnabled ? TEXT_LOG.innerText = entry + NEW_LINE + TEXT_LOG.innerText : TEXT_LOG.innerText = EMPTY;
    }
}
