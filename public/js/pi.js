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
let batchSize = 0;
let startTime = 0;

/** Listener for Worker message, "message". */
addEventListener("message", function(message) {
    const parsedMessage = parseMessage(message.data);
    batchSize = parsedMessage[1];
    parsedMessage[0] === "CMD_START" ? start() : null ;
});

/** Starts PI estimation when the CMD_START command is received. */
function start() {
    while (true) {
        startTime = new Date().getTime();
        for (let i = 0; i < batchSize; i += 1){
            const coords = generateCoords();
            updateHitCounters(coords.x, coords.y);
        }
        postMessage(estimatePi());
    }
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
function generateCoords() {
    const x = Math.floor((Math.random() * WIDTH) - HALF_WIDTH); 
    const y = Math.floor((Math.random() * WIDTH) - HALF_WIDTH);
    return {"x": x, "y": y};
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
    const deltaTime = new Date().getTime() - startTime;
    return new UpdateEstimationEvent(estimation, totalHits, blueHits, redHits, deltaTime);
}
