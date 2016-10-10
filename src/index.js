const BINDS = Symbol()

export function fixBind (target, property, descriptor) {
  if (!property && !descriptor) return fixBindInstance(target)
  return fixBindDecorator(target, property, descriptor)
}

function fixBindInstance (target) {
  const klass = target.constructor

  if (!klass[BINDS]) return;
  klass[BINDS].forEach(bind => {
    delete target[bind]
  })
}

function fixBindDecorator (target, property, descriptor) {
  const klass = target.constructor

  if (!klass[BINDS]) {
    klass[BINDS] = []
  }

  klass[BINDS].push(property)
}

