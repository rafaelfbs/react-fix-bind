const BINDS = Symbol()

export default function fixBind (target, property, descriptor) {
  if (!property && !descriptor && target.constructor !== Object) return fixBindInstance(target)
  return fixBindMaybeCalledDecorator(target, property, descriptor)
}

function fixBindInstance (target) {
  const klass = target.constructor

  if (!klass[BINDS]) return;
  klass[BINDS].forEach(bind => {
    delete target[bind.property]
  })
}

function fixBindMaybeCalledDecorator (options, property, descriptor) {
  if (!property && !descriptor)
    return (target, property, descriptor) => fixBindDecorator(target, property, descriptor, options)
  return fixBindDecorator(options, property, descriptor, {})
}

function fixBindDecorator (target, property, descriptor, options) {
  const klass = target.constructor

  if (!klass[BINDS]) {
    klass[BINDS] = []
  }

  klass[BINDS].push({
    property,
    options
  })

  if (options.autobind) {
    const { enumerable, configurable = true, writable = true } = descriptor || {}
    const method = target[property]

    return {
      enumerable,
      configurable: true,
      get: function() {
        const boundMethod = method.bind(this)
        Object.defineProperty({ enumerable, configurable, value: boundMethod })
        return boundMethod
      }
    }
  }
}
