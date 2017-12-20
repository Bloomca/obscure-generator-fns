const batchRunner = require("../runners/batch");

console.log("Starting batching job:");
console.log("=====================================================");
console.log("");

batchRunner(3, function*() {
  for (let i = 0; i < 20; i++) {
    yield i;
    console.log("Executing synchronous code, result is: ", i);
  }
});
