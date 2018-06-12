# FootprintEmitter

```js
const FootprintEmitter = require("./FootprintEmitter");

const emitter = new FootprintEmitter(1);
emitter.onEmit = (index, x, y, z) => {
  console.log(index, x, y, z);
};

emitter.update(0, 0, 0);
emitter.update(5, 5, 0);
emitter.update(10, 10, 0);
emitter.update(10, 15, 0);
emitter.update(0, 0, 0);
```
