const cp = require('child_process')
const {
    resolve
} = require('path')

;
(async () => {
    const script = resolve(__dirname, '../crawler/trailer-list')
    const child = cp.fork(script)
    let invoked = false
    child.on('error', err => {
        if (invoked) return
        invoked = true
        console.log('error', err);
    })
    child.on('exit', code => {
        if (invoked) return
        invoked = false
        const err = code === 0 ? null : new Error('exit code' + code)
        console.log('exit', code);
    })
    child.on('message', data => {
        console.log('message', data);
    })
})()