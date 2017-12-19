const runWithIgnore = require("../runners/ignoreErrors");

function sleep(amount) {
  return new Promise(res => setTimeout(res, amount));
}

async function executeRandomly() {
  await sleep(200);

  const shouldThrow = Math.random() > 0.8;

  if (shouldThrow) {
    throw new Error(":( error");
  }

  return Math.random() * 100;
}

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
