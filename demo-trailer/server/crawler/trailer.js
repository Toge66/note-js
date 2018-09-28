const puppeteer = require('puppeteer')

const base = 'https://movie.douban.com'
const Id = '26979545'
const detailUrl = `${base}/subject/`

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})
;(async () => {

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    await page.goto(detailUrl + Id, {
        waitUntil: "networkidle2" //网络空闲的时候执行
    })
    console.log(detailUrl + Id);

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
        id:Id,
        cover:result.cover,
        video
    }
    browser.close()
    process.send(data)
    process.exit(0)
})()