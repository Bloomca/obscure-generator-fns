const runWithPause = require("../runners/pause");

function sleep(amount) {
  return new Promise(res => setTimeout(res, amount));
}

console.log("Starting executing asynchronous job with pause/resume");
console.log("=====================================================");
console.log("");

const { pause, resume } = runWithPause(function*() {
  for (let i = 0; ; i++) {
    console.log("Executing our async job, result is: ", i);
    yield sleep(500);
  }
});

sleep(3000)
  .then(() => {
    console.log("Pausing execution!");
    console.log("=====================================================");
    console.log("");
    pause();
  })
  .then(() => sleep(6000))
  .then(() => {
    console.log("Resuming execution!");
    console.log("=====================================================");
    console.log("");
    resume();
  });
