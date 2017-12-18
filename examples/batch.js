const batchRunner = require("../runners/batch");

batchRunner(5, function*() {
  for (let i = 0; i < 20; i++) {
    console.log(i);
    yield i;
  }
});
