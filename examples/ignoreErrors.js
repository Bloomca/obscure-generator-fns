const runWithIgnore = require("../runners/ignoreErrors");

function sleep(amount) {
  return new Promise(res => setTimeout(res, amount));
}

async function executeRandomly() {
  await sleep(1000);

  const shouldThrow = Math.random() > 0.8;

  if (shouldThrow) {
    throw new Error(":( error");
  }

  return Math.random() * 100;
}

console.log("Start to execute job with ignoring all errors");
console.log("=====================================================");
console.log("");

runWithIgnore(function*() {
  for (;;) {
    const { error, data } = yield executeRandomly();

    if (data) {
      console.log("Call was successfull. The result is: ", data);
    } else {
      console.log("Error happened. Here is the error: ", error);
    }
  }
});
