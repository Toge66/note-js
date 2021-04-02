function MyPromise(executor) {

    let self = this
    self.status = 'pending'
    self.data = undefined
    self.onResolvedCallback = []
    self.onRejectedCallback = []

    const resolve = (value) => {
        if (self.status === 'pending') {
            self.data = value
            self.status = 'resolved'
            self.onResolvedCallback.forEach(cb => cb(value))
        }
    }

    const reject = (reason) => {
        if (self.status === 'pending') {
            self.data = reason
            self.status = 'rejected'
            self.onRejectedCallback.forEach(cb => cb(reason))
        }
    }
    try {
        executor(resolve, reject)
    } catch(e) {
        reject(e)
    }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
    let self = this
    let promise2
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason
    if (self.status === 'resolved') {
        promise2 = new MyPromise((resolve, reject) => {
            try {
                const r  = onResolved(self.data)
                if (r instanceof MyPromise) {
                    r.then(resolve, reject)
                }else{
                    resolve(r)
                }
            }catch(e) {
                reject(e)
            }
        })
    }
    if (self.status === 'rejected') {
        promise2 = new MyPromise((resolve, reject) => {
            try {
                const r  = onRejected(self.data)
                if (r instanceof MyPromise) {
                    r.then(resolve, reject)
                }else{
                    resolve(r)
                }
            }catch(e) {
                reject(e)
            }
        })
    }
    if (self.status === 'pending') {
        promise2 = new MyPromise((resolve, reject) => {
            self.onResolvedCallback.push((value) => {
                try {
                    const x = onResolved(value)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                    }else{
                        resolve(x)
                    }
                } catch (e) {
                    reject(e)
                }
            })

            self.onRejectedCallback.push((reason) => {
                try {
                    const x = onRejected(reason)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                    }else{
                        reject(x)
                    }
                } catch (e) {
                    reject(e)
                }
            })

        })
    }
    return promise2
}

MyPromise.prototype.all = function(promises) {
    const result = []
    const errR = []
    return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
            try {
                promise.then(value => {
                    result.push(value)
                })
            }catch(e) {
                errR.push(e)
            }

        })
        if (errR.length) {
            reject(errR)
        } else {
            resolve(result)
        }
    })
}

MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
}

const a = new MyPromise((resolve, reject) => {
    setTimeout(() =>{
        resolve(11)
    }, 2000)
})

a.then(r => {
    console.log(r)
    throw 3
// }).then(r => {
//     console.log(r)
// }, (e) => {
//     console.log(e)
}).catch(e => {
    console.log(e)
})

