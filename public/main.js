const LOGGING_CHECKBOX = document.getElementById("show-log-checkbox");
const BATCH_TEXTBOX = document.getElementById("batch-size-textbox");
const UI = new MyUI();

let worker = new Worker("worker.js");

function start() {
    toggleUiState();
    UI.reset();
    worker.addEventListener("message", function(message) { message.data.type === "A" ? UI.updateCanvas(message.data) : UI.updateCounters(message.data); });
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
    UI.toggleLogging(LOGGING_CHECKBOX.checked);
}

function toggleUiState() {
    UI.toggleUiState();
}
