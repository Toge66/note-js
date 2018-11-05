const cp = require('child_process')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const {
    resolve
} = require('path')

;(async () => {
    const script = resolve(__dirname, '../crawler/movie-list')
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
        data.forEach(async item => {
            let movie = await Movie.findOne({
                doubanId: item.doubanId
            })
            if(!movie) {
                movie = new Movie(item)
                console.log(movie)
                try {
                    await movie.save()
                }catch(e) {
                    console.log(e)
                }
            }
        });
    })
})()