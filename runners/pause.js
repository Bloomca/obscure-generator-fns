module.exports = function runWithPause(genFn, ...args) {
  let pausePromiseResolve = null;
  let pausePromise;

  const gen = genFn(...args);

  const promise = new Promise((resolve, reject) => {
    onFulfilledWithPromise();

    function onFulfilledWithPromise(res) {
      if (pausePromise) {
        pausePromise.then(() => onFulfilled(res));
      } else {
        onFulfilled(res);
      }
    }

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

    function onRejected(err) {
      var result;
      try {
        result = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(result);
    }

    function next({ done, value }) {
      if (done) {
        return resolve(value);
      }
      // we assume we always receive promises, so no type checks
      return value.then(onFulfilledWithPromise, onRejected);
    }
  });

  return {
    pause: () => {
      pausePromise = new Promise(resolve => {
        pausePromiseResolve = resolve;
      });
    },
    resume: () => {
      pausePromiseResolve();
      pausePromise = null;
    },
    promise
  };
};
