const cp = require('child_process')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')
const {
    resolve
} = require('path')

;(async () => {
    const movies = await Movie.find({
        $or: [{
                video: {
                    $exists: false
                }
            },
            {
                video: null
            }
        ]
    })
    const script = resolve(__dirname, '../crawler/trailer')
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
    child.on('message', async data => {
        
        const {
            doubanId,
            video,
            cover
        } = data
        const movie = await Movie.findOne({
            doubanId
        })
        if (video) {
            movie.video = video
            movie.cover = cover
            await movie.save()
        } else {
            await movie.remove()
            const movieTypes = movie.movieTypes

            for (let i = 0; i < movieTypes.length; i++) {
                const type = movieTypes[i]
                const cat = Category.findOne({
                    name: type
                })

                if (cat && cat.movies) {
                    const idx = cat.movies.indexOf(movie._id)

                    if (idx > -1) {
                        cat.movies = cat.movies.splice(idx, 1)
                    }
                    await cat.save()
                }
            }
        }
    })
    child.send(movies)
})()