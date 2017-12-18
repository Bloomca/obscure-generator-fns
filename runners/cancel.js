export default function cancellableRunner(genFn) {
  const gen = genFn();
  return new Promise((resolve, reject) => {});
}
