import { Mixin } from '../index.js'
import assert from 'assert';

class Test extends Mixin {
  #privateVar = 12

  constructor() {
    super()
    this.publicVar = 9
  }

  #privateMethod() {
    return 'private'
  }

  publicMethod() {
    return 'public'
  }

  privateMethod() {
    return this.#privateMethod()
  }

  privateVar() {
    return this.#privateVar
  }

  get val() {
    return this.#privateVar + 1
  }

  set val(num) {
    this.#privateVar = num
  }

  static staticMethod() {
    return 'hi'
  }
}

class MyClass {
  constructor() {
    Test.mixin(this); // Auto-attach mixin with dynamic name
  }
}

const obj = new MyClass();

it('should mix in public methods', () => {
  assert.equal(obj.publicMethod(), 'public')
})
it('should mix in private methods', () => {
  assert.equal(obj.privateMethod(), 'private')
})
it('should mix in public variables', () => {
  assert.equal(obj.publicVar, 9)
})
it('should mix in private variables', () => {
  assert.equal(obj.privateVar(), 12)
})
it('should mix in getters', () => {
  assert.equal(obj.val, 13)
})
it('should mix in setters', () => {
  obj.val = 42
  assert.equal(obj.privateVar(), 42)
})
it('should mix in static methods', () => {
  assert.equal(MyClass.staticMethod(), 'hi')
})