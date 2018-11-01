const mongoose = require('mongoose')
const db = 'mongodb://192.168.3.63:27017/trailer'
const glob = require('glob')
const { resolve:r } = require('path')

mongoose.Promise = global.Promise

exports.initSchema = () => {
    glob.sync(r(__dirname,'./schema','**/*.js')).forEach(require)
}

function connect () {
    mongoose.connect(db,{useNewUrlParser:true})
}
exports.connect = () => {
    const maxTimes = 5
    let connectTimes = 0
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug',true)
        }
        connect()
        mongoose.connection.on('disconnected', () => {
            connectTimes++
            if (connectTimes < maxTimes) {
                connect()
            }else {
                throw new Error('连接次数超限制')
            }
        })
    
        mongoose.connection.on('error', (error) => {
            connectTimes++
            if (connectTimes < maxTimes) {
                connect()
            }else {
                throw new Error('连接次数超限制')
            }
        })
        mongoose.connection.once('open', () => {
            mongoose.model('Dog',{name:String})
            require('./schema/movie')
            resolve()
            console.log('open Sucess')
        })
    })
}