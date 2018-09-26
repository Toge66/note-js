const url = 'https://movie.douban.com/tag/#/?sort=S&range=0,10&tags=&playable=1'
const puppeteer = require('puppeteer')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})
;(async() => {
    
    const browser = await puppeteer.launch({
        args:['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    await page.goto(url,{
        waitUntil: "networkidle2"               //网络空闲的时候执行
    })

    // await sleep(3000)

    await page.waitForSelector('.more')

    for (let i = 0; i < 2; i++) {
        await sleep(2000)
        await page.click('.more')
    }
    
    const result = await page.evaluate(_ => {
        var $ = window.$
        var items = $('.list-wp a')
        var links = []
        if (items.length) {
            items.each((index, item) => {
                let it = $(item)
                let id = it.find('div').data('id')
                let title = it.find('.title').text()
                let rate = Number(it.find('.rate').text())
                let poster = it.find('img').attr('src').replace('s_ratio','l_ratio')
                links.push({
                    id,
                    title,
                    rate,
                    poster
                })
            })
        }
        return links
    })

    browser.close()
    console.log(result,result.length);
    
})()