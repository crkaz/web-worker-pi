/**
*   main.js manages DOM events.
*/

// #region Consts 
const LOGGING_CHECKBOX = document.getElementById("show-log-checkbox");
const BATCH_TEXTBOX = document.getElementById("batch-size-textbox");
const UI = new MyUI();
const WORKER_INIT_DELAY = 100;
// #endregion

/** Start estimating PI. */
function start() {
        UI.log("Resetting...");
        MyWorker.initialiseThenDo(_ => {
        toggleUiState();
        UI.reset();
        UI.log("Starting...");
        MyWorker.Instance.addEventListener("message", function(message) { message.data.type === "A" ? UI.updateCanvas(message.data) : UI.updateCounters(message.data); });
        MyWorker.Instance.postMessage("CMD_START")
    });
}

/** Stop estimating PI. */
function stop() {
        UI.log("Stopping...");
        toggleUiState();
        MyWorker.Instance.terminate();
}

/** Change the number of points calculated before the estimation is updated. */
function updateBatchSize() {
        UI.log("Updating batch size to " + BATCH_TEXTBOX.value + "...");
        MyWorker.initialiseThenDo(_ => { !BATCH_TEXTBOX.value ? null : MyWorker.Instance.postMessage("CMD_UPDATE_BATCH " + BATCH_TEXTBOX.value); });
}

/** Toggle a 'log' of PI estimations. */
function toggleLogging() {
    UI.toggleLogging(LOGGING_CHECKBOX.checked);
}

/** Toggle the start/stop button states. */
function toggleUiState() {
    UI.toggleUiState();
}
