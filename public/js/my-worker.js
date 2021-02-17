/**
*   Class to aid adherance to DRY principles by managing an instance of the worker
*   between stopping and starting the estimator.
*/

class MyWorker {
    /** Singleton pattern (o )_(o ) */
    static get Instance() { 
        !MyWorker.worker ? MyWorker.initialise() : null;
        return MyWorker.worker;  
    }

    /** Ensures instance is initalised before trying to use it. */
    static initaliseThenDo(f, t = 100) { 
        MyWorker.initialise();
        setTimeout(() => {
            f();
        }, t);
    }

    /** */
    static initialise() { MyWorker.worker = new Worker("js/pi.js"); }
}
