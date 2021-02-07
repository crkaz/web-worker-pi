# Web Worker PI
Mini project posed by one of my colleagues to explore the utility of web workers.
- Challenge based on [this video](https://youtu.be/5cNnf_7e92Q).
- Web worker understanding gained [here](https://youtu.be/7Rrv9qFMWNM) and [here](https://www.bookstack.cn/read/AsyncPerformance/125877).
- Run with [http-server](https://www.npmjs.com/package/http-server).

# Web Workers
Web workers are a relatively simple way to imitate a multi-threaded application by moving application logic from the main thread to the UI thread. This is especially useful for intensive processing that would otherwise block UI updates.
I used the native implementation because I am familiar with the pub-sub pattern but [comlink](https://github.com/GoogleChromeLabs/comlink) is a small (1.1kb) Google library that aims to simplify their usage.  

# How to Use
1. Press 'start' to begin the web worker and estimation of pi.
2. Pressing stop will call terminate() on the web worker and stop the estimation.
3. Change the batch size to increase the number of hits/points calculated per UI update; higher numbers mean more processing and slower updates.
4. Check 'show log' to show all estimations as they happen.