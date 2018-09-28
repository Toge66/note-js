const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
const { qiniu: { bucket, AK, SK } } = config

const mac = new qiniu.auth.digest.Mac(AK,SK)

var cfg = new qiniu.conf.Config()
//config.useHttpsDomain = true;
config.zone = qiniu.zone.Zone_z0
var bucketManager = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = (url, key) => {
    return new Promise((resolve, reject) => {
        bucketManager.fetch(url, bucket, key, (err, respBody, respInfo) => {
            if (err) {
                console.log(err);
                reject(err)
              } else {
                if (respInfo.statusCode == 200) {
                  console.log(respBody.key);
                  console.log(respBody.hash);
                  console.log(respBody.fsize);
                  console.log(respBody.mimeType);
                  resolve(respoBody.key)
                } else {
                  console.log(respInfo.statusCode);
                  console.log(respBody);
                  reject(respInfo)
                }
              }
        })
    })
}

(async () => {
    const movies = [{
        id: '26979545',
        cover: 'https://img3.doubanio.com/img/trailer/medium/2502618393.jpg?',
        video: 'http://vt1.doubanio.com/201809272114/2ef4691b974ab857d3d22658d4720e63/view/movie/M/302220893.mp4',
        title: '蓝色星球2',
        rate: 9.9,
        poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2518413249.jpg'
    }]
    movies.forEach(async (item) => {
        try{
            const videoQiniuKey = uploadToQiniu(item.video, nanoid() + '.mp4')
            const coverQiniuKey = uploadToQiniu(item.video, nanoid() + '.jpg')
            const posterQiniuKey = uploadToQiniu(item.poster, nanoid() + '.jpg')

            if(videoQiniuKey) {
                item.videoQiniuKey = videoQiniuKey
            }
            if(coverQiniuKey) {
                item.coverQiniuKey = coverQiniuKey
            }
            if(posterQiniuKey) {
                item.posterQiniuKey = posterQiniuKey
            }
        }
        catch (err) {
            console.log(err);
        }
    })
})()