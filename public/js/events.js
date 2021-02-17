/**
*   Models for postMessage messages/events FROM worker to main thread.  
*/

/** Base class. */
class Event {
    constructor(type) {
        this.type = type;
    }
}

/** Communicates the coordinates and classification of a point. */
class UpdateCountersEvent extends Event {
    constructor(x, y, colour){
        super("A");
        this.x = x;
        this.y = y;
        this.colour = colour;
    }
}

/** Communicates counters and estimation data. */
class UpdateEstimationEvent extends Event {
    constructor(estimation, totalHits, blueHits, redHits, deltaTime){
        super("B");
        this.estimation = estimation;
        this.totalHits = totalHits;
        this.blueHits = blueHits;
        this.redHits = redHits;
        this.deltaTime = deltaTime;
    }
}