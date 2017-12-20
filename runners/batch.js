function sleep(amount) {
  return new Promise(resolve => setTimeout(resolve, amount));
}

module.exports = function runWithBatch(chunk, fn, ...args) {
  const gen = fn(...args);
  let num = 0;
  return new Promise((resolve, promiseReject) => {
    onFulfilled();

    function onFulfilled(res) {
      let result;
      try {
        result = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(result);
      return null;
    }

    function next({ done, value }) {
      if (done) {
        return resolve(value);
      }

      if (num++ % chunk === 0) {
        // we wait 1s just to demonstrate, in practice
        // 10ms is more than enough
        return sleep(1500).then(proceed);
      } else {
        return proceed();
      }

      function proceed() {
        return onFulfilled(value);
      }
    }
  });
};
