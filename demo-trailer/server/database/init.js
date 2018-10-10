const mongoose = require('mongoose')
const db = 'mongodb://localhost/trailer'

mongoose.Promise = global.Promise

exports.connect = () => {
    const maxTimes = 5
    let connectTimes = 0
    return new Promise((resovle, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug',true)
        }
        mongoose.connect(db)
        mongoose.connection.on('disconnected', () => {
            connectTimes++
            if (connectTimes < maxTimes) {
                mongoose.connect(db)
            }else {
                throw new Error('连接次数超限制')
            }
        })
    
        mongoose.connection.on('error', (error) => {
            connectTimes++
            if (connectTimes < maxTimes) {
                mongoose.connect(db)
            }else {
                throw new Error('连接次数超限制')
            }
        })
        mongoose.connection.once('open', () => {
            const Dog = mongoose.model('Dog',{name:String})
            const a = new Dog({name: 'xiaohei'})

            a.save().then(() => {
                console.log('save sucess')
            })
            resovle()
        })
    })
    
}