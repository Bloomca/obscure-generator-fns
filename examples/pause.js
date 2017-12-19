const runWithPause = require("../runners/pause");

function sleep(amount) {
  return new Promise(res => setTimeout(res, amount));
}

const { pause, resume } = runWithPause(function*() {
  for (let i = 0; ; i++) {
    console.log(i);
    yield sleep(500);
  }
});

sleep(3000)
  .then(pause)
  .then(() => sleep(6000))
  .then(resume);
