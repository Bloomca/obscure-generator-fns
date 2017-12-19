module.exports = function runWithIgnore(fn, ...args) {
  const gen = fn(...args);
  return new Promise((resolve, promiseReject) => {
    onFulfilled();

    function onFulfilled(res) {
      proceed({ data: res });
    }

    // these are errors from yielded promises
    // and we want to ignore them
    // so we act like usual, except we pass an error
    function onRejected(error) {
      proceed({ error });
    }

    function proceed(data) {
      let result;
      try {
        result = gen.next(data);
      } catch (e) {
        // these errors are sync errors (like TypeError, etc)
        return reject(e);
      }
      // in order to differentiate errors and normal results
      // we execute it with
      next(result);
    }

    function next({ done, value }) {
      if (done) {
        return resolve(value);
      }
      // we assume we always receive promises, so no type checks
      return value.then(onFulfilled, onRejected);
    }
  });
};
