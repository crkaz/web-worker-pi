const CANVAS = document.getElementById("piCanvas");
const CTX = CANVAS.getContext("2d");
const WIDTH = 800;
const HALF_WIDTH = 400;
const TWO_PI = Math.PI * 2;

class MyCanvas {
    constructor() {
        this.init();
    }
    
    init() {
        CTX.translate(HALF_WIDTH, HALF_WIDTH); // Translate origin to centre.
        CTX.moveTo(0, 0);
        this.reset();
    }

    reset() {
        CTX.fillStyle = "#FFFFFF";
        CTX.fillRect(-HALF_WIDTH, -HALF_WIDTH, WIDTH, WIDTH);
        this.drawCircle();
    }

    drawCircle() { 
        CTX.fillStyle = "#000000";
        CTX.beginPath();
        CTX.arc(0, 0, HALF_WIDTH, 0, TWO_PI , true); 
        CTX.stroke();
    }

    updateCanvas(data) {
        CTX.fillStyle = data.colour;
        CTX.fillRect(data.y, data.x, 1, 1);
    }
}