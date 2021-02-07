const NEW_LINE = "\n";
const WIDTH = 800;
const HALF_WIDTH = 400;
const R2 = 160000;

let blueHits = 0;
let redHits = 0;
let batchSize = 1;

addEventListener("message", function(message) {
    const parsedMessage = parseMessage(message.data);
    switch (parsedMessage[0]) {
        case "CMD_START": start(); break;
        case "CMD_UPDATE_BATCH": updateBatchSize(parsedMessage[1]); break;
        default: console.log("Unrecognised command from main thread.");
    }
});

function start() {
    while (true) {
        for (let i = 0; i < batchSize; i += 1){
            const coords = generateCoords();
            updateHitCounters(coords.x, coords.y);
        }
        postMessage(estimatePi());
    }
}

function updateBatchSize(value) {
    batchSize = value;
}

// ---

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

function generateCoords() {
    const x = Math.floor((Math.random() * WIDTH) - HALF_WIDTH); 
    const y = Math.floor((Math.random() * WIDTH) - HALF_WIDTH);
    return {"x": x, "y": y};
}

function updateHitCounters(x, y) {
    const d2 = (x * x) + (y * y); 
    let colour = "#0000FF";
    if (d2 > R2) {
        redHits += 1
        colour = "#FF0000";
} else {
        blueHits += 1;
    }
    postMessage({"type" : "A", "x": x, "y": y, "colour": colour});
}

function estimatePi() {
    const totalHits = blueHits + redHits;
    const estimation = redHits != 0 ?  4 * (blueHits / totalHits) : 0;
    return {"type": "B", "estimation": estimation, "totalHits": totalHits, "blueHits": blueHits, "redHits": redHits};
}
