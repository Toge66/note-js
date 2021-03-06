const puppeteer = require('puppeteer')

const base = 'https://movie.douban.com'
const Id = '26979545'
const detailUrl = `${base}/subject/`

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})
process.on('message', async movies => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    for (let i = 0; i < movies.length; i++) {
        const element = movies[i]
        const {doubanId} = element
        
        await page.goto(detailUrl + doubanId, {
            waitUntil: "networkidle2" //网络空闲的时候执行
        })
        console.log(detailUrl + doubanId);
    
        await sleep(1000)
        const result = await page.evaluate(_ => {
            var $ = window.$
            var item = $('.related-pic-video')
            if(item && item.length) {
                let link = item.attr('href')
                let cover = (item.attr('style') || '').match(/\((\S*)\)/)[1]
                return {
                    link,
                    cover
                }
            }
            return {}
        })
        let video = ''
        if(result.link) {
            await page.goto(result.link, {
                waitUntil: "networkidle2" 
            })
            await sleep(2000)
            video = await page.evaluate(_ => {
                var $ = window.$
                var item = $('source')
                if(item) {
                    return item.attr('src')
                }
                return ''
            })
        }
        const data = {
            doubanId,
            cover:result.cover,
            video
        }
        process.send(data)
    }
    browser.close()
    process.exit(0)
})