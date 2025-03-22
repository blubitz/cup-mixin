export class Mixin {
  static mixin(target) {
    const mixinName = `_${this.name.toLowerCase()}_mixin`
    target[mixinName] = new this()

    function addGetterSetter(parent, instance, name, descriptor) {
      Object.defineProperty(parent, name, {
        get: descriptor.get ? function () { return instance[name]; } : undefined,
        set: descriptor.set ? function (value) { instance[name] = value; } : undefined,
        configurable: true,
        enumerable: true,
      });
    }

    // Expose public methods dynamically
    for (const key of Object.getOwnPropertyNames(this.prototype)) {
      if (key !== "constructor" && !key.startsWith("#")) {
        const descriptor = Object.getOwnPropertyDescriptor(this.prototype, key);

        if (descriptor.get || descriptor.set) {
          addGetterSetter(target, target[mixinName], key, descriptor);
        } else {
          target[key] = function (...args) {
            return target[mixinName][key](...args);
          };
        }
      }
    }

    // Expose public variables dynamically
    for (const key of Object.keys(target[mixinName])) {
      target[key] = target[mixinName][key]
    }

    // Expose static methods
    for (const key of Object.getOwnPropertyNames(target[mixinName].constructor)) {
      if (!['length', 'name', 'prototype'].includes(key)) {
        target.constructor[key] = target[mixinName].constructor[key]
      }
    }
  }
}