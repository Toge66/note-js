const baseUrl = 'https://api.douban.com/v2/movie/subject'
const rp = require('request-promise-native')

async function fetchMovie(item) {
    const url = `${baseUrl}/${item.id}`
    const request = await rp(url)
    return request
}

(async() => {
    let movies = [{ 
        id: 1292052,
        title: '肖申克的救赎',
        rate: 9.6,
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p480747492.jpg' 
    }, { 
        id: 1296141,
        title: '控方证人',
        rate: 9.6,
        poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p1505392928.jpg' 
    }]
    movies.map(async movie => {
        const m = await fetchMovie(movie)
        try {
            const movieData = JSON.parse(m)
        }
        catch {

        }
        console.log(m);
    })
})()