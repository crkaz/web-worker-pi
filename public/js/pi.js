/**
*   worker.js is instantiated as web worker and is responsible for listening to
*   and parsing messages sent by the main thread, and communicating back to the
*   main thread via postMessage().
*/

importScripts('events.js');

// #region Consts
const NEW_LINE = "\n";
const WIDTH = 800;
const HALF_WIDTH = 400;
const R2 = 160000;
const RED = "#FF0000";
const BLUE = "#0000FF";
// #endregion

let blueHits = 0;
let redHits = 0;
let batchSize = 5000;

/** Listener for Worker message, "message". */
addEventListener("message", function(message) {
    const parsedMessage = parseMessage(message.data);
    switch (parsedMessage[0]) {
        case "CMD_START": start(); break;
        case "CMD_UPDATE_BATCH": updateBatchSize(parsedMessage[1]); break;
        default: console.log("Unrecognised command from main thread.");
    }
});

/** Starts PI estimation when the CMD_START command is received. */
function start() {
    while (true) {
        for (let i = 0; i < batchSize; i += 1){
            const coords = generateCoords().next().value;
            updateHitCounters(coords.x, coords.y);
        }
        postMessage(estimatePi());
    }
}

/** Updates the batchSize var when the CMD_UPDATE_BATCH command is received. */
function updateBatchSize(value) {
    this.batchSize = value;
}

// ---

/** Parses a command string recieved via postMessage from the main thread 
*   into a command and (optionally) 1 arg.
*/
function parseMessage(message) {
    let cmd = "";
    let arg = "";
    try {
        cmd = message.split(" ")[0];
        arg = message.split(" ")[1];
    }
    catch {}
    return [cmd, arg];
}

/** Determines a new point within the dimensions of the Canvas. */
function* generateCoords() {
    const x = Math.floor((Math.random() * WIDTH) - HALF_WIDTH); 
    const y = Math.floor((Math.random() * WIDTH) - HALF_WIDTH);
    yield {"x": x, "y": y};
}

/** Determines whether a point lands inside the circle on the Canvas and
*   sends the coordinates and appropriate colour to the main thread.
*/
function updateHitCounters(x, y) {
    const d2 = (x * x) + (y * y); 
    let colour = BLUE;
    if (d2 > R2) {
        redHits += 1
        colour = RED;
    } else {
        blueHits += 1;
    }
    postMessage(new UpdateCountersEvent(x, y, colour));
}

/** Estimates PI based on the hit counter vars. */
function estimatePi() {
    const totalHits = blueHits + redHits;
    const estimation = redHits != 0 ?  4 * (blueHits / totalHits) : 0;
    return new UpdateEstimationEvent(estimation, totalHits, blueHits, redHits);
}
