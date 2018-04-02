function aa(context, next) {
  context.a = 'a'
  console.log('a======' + JSON.stringify(context))
  next()
  context.a = 'aa'
  console.log('aa-----' + JSON.stringify(context))
}

function bb(context, next) {
  context.b = 'b'
  console.log('b======' + JSON.stringify(context))
  next()
  context.b = 'bb'
  console.log('bb-----' + JSON.stringify(context))
}

function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    let index = -1

    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next() {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}

compose([aa, bb])({}).then(_ => {
  console.log('done')
})