# Generator runners

> Generators are part of the [modern JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

This repository contains different generator runners. Usually, if you encounter generators in the wild, it is either [koa.js](http://koajs.com/) (or [co](https://github.com/tj/co) itself), or attempts to get [async/await syntax](https://github.com/tc39/ecmascript-asyncawait) before standartizing.

However, generators, being subset of CSP, are very powerful, and we can build really interesting workflows with them. I have to note, though, that I don't consider this as a production library, since they are really "obscure", and you should treat them more like a gist and inspiration, rather than reference implementation. They are hard to understand to the newcomer to your codebase, so you should think twice before implementing.

Implemented runners:
- Batch/scheduling [example](./examples/batch.js) | [source code](./runners/batch.js)
- Pause/resume [example](./examples/pause.js) | [source code](./runners/pause.js)
- Cancel example | [source code](./runners/cancel.js)

## License

MIT
