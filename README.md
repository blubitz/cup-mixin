# cup-mixin

This module enables multiple inheritance in JavaScript, supporting **ES2020+** private fields, methods, static methods, and getters/setters.

## Installation

```bash
npm i cup-mixin
```

## Motivation

![Files](https://raw.githubusercontent.com/blubitz/console-in-browser/main/images/dread_of_inheritance.png)

## Usage

Extend the `Mixin` class in your modules to enable multiple inheritance. Call the `mixin()` static method inside the descendant class (passing `this`) to dynamically apply module functionality at runtime.

```js
import { Mixin } from 'node_modules/cup-mixin/index.js'
```

First module

```js
class A extends Mixin {
    constructor() {
        super()
    }

    aMethod() {
        console.log('hello')
    }
}
```

Second module

```js
class B extends Mixin {
    constructor() {
        super()
    }

    bMethod() {
        console.log('world')
    }
}
```

Descendant class

```js
class MyClass {
    constructor() {
        /* Multiple inheritance... */
        A.mixin(this)
        B.mixin(this)
        /* Simple as this! */
    }
}

const myClass = new MyClass()

myClass.aMethod()   // 'hello'
myClass.bMethod()   // 'world'
```

### Supported Inheritance Types

| Feature           | Supported |
|-------------------|-----------|
| Public Methods    | ✅        |
| Private Methods   | ✅        |
| Public Variables  | ✅        |
| Private Variables | ✅        |
| Getters           | ✅        |
| Setters           | ✅        |
| Static Methods    | ✅        |

## What does 'cup' stand for?

It's like cup noodles; quick and not fancy.

## Tests

```shell
npm run test
```

## License

Released under [MPL-2.0](./LICENSE) by [@blubitz](https://github.com/blubitz).