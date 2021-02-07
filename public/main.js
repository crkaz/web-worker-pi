//#region Consts
const NEW_LINE = "\n";
const EMPTY = "";
const LOGGING_CHECKBOX = document.getElementById("show-log-checkbox");
const BATCH_TEXTBOX = document.getElementById("batch-size-textbox");
const START_BUTTON = document.getElementById("start-button");
const STOP_BUTTON = document.getElementById("stop-button");
const RESET_BUTTON = document.getElementById("reset-button");
const TOTAL_HITS = document.getElementById("total-hit-count");
const RED_HITS = document.getElementById("red-hit-count");
const BLUE_HITS = document.getElementById("blue-hit-count");
const PI_ESTIMATION = document.getElementById("pi-estimation");
const TEXT_LOG = document.getElementById("text-log");
const CANVAS = document.getElementById("piCanvas");
const CTX = CANVAS.getContext("2d");
const WIDTH = 800;
const HALF_WIDTH = 400;
const TWO_PI = Math.PI * 2;
//#endregion

let loggingEnabled = LOGGING_CHECKBOX.checked;
let worker = new Worker("worker.js");

function start() {
    toggleUiState();
    resetCanvas();
    !TEXT_LOG.disabled ? TEXT_LOG.innerText = EMPTY : null;
    worker.addEventListener("message", function(message) { message.data.type === "A" ? updateCanvas(message.data) : log(message.data); });
    worker.postMessage("CMD_START")
}

function stop() {
    toggleUiState();
    worker.terminate();
    worker = new Worker("worker.js");
}

function updateBatchSize() {
    !BATCH_TEXTBOX.value ? null : worker.postMessage("CMD_UPDATE_BATCH " + BATCH_TEXTBOX.value);
}

function toggleLogging() {
    loggingEnabled = LOGGING_CHECKBOX.checked;
}

function toggleUiState() {
    START_BUTTON.disabled = !START_BUTTON.disabled;
    STOP_BUTTON.disabled = !STOP_BUTTON.disabled;
    RESET_BUTTON.disabled = !RESET_BUTTON.disabled;
}

function log(data) {
    TOTAL_HITS.innerText = data.totalHits;
    RED_HITS.innerText = data.redHits;
    BLUE_HITS.innerText = data.blueHits;
    PI_ESTIMATION.innerText = data.estimation;
    loggingEnabled ? TEXT_LOG.innerText = data.estimation + NEW_LINE + TEXT_LOG.innerText : TEXT_LOG.innerText = EMPTY; // latest value at top
}

// TODO: move to own file.
function initCanvas() {
    CTX.translate(HALF_WIDTH, HALF_WIDTH); // Translate origin to centre.
    CTX.moveTo(0, 0);
    resetCanvas();
}

function resetCanvas() {
    CTX.fillStyle = "#FFFFFF";
    CTX.fillRect(-HALF_WIDTH, -HALF_WIDTH, WIDTH, WIDTH);
    drawCircle();
}

function drawCircle() { 
    CTX.fillStyle = "#000000";
    CTX.beginPath();
    CTX.arc(0, 0, HALF_WIDTH, 0, TWO_PI , true); 
    CTX.stroke();
}

function updateCanvas(data) {
    CTX.fillStyle = data.colour;
    CTX.fillRect(data.y, data.x, 1, 1);
}

initCanvas();