const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
    username: {
        unique: true,
        required: true,
        type: String
    },
    password: {
        unique: true,
        required: true,
        type: String
    },
    email: {
        unique: true,
        required: true,
        type: String
    },
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil: Number,
    meta: {
        createAt: {
            type: Date,
            default:Date.now()
        },
        updateAt: {
            type: Date,
            default:Date.now()
        }
    }
})

userSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else {
        this.meta.updateAt = Date.now()
    }
    next()
})

userSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now())
})

userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return next()
    bcrypt.getSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next()
        bcrypt.hash(this.password, salt, function (error, hashPwd) {
            if(error) return next()
            this.password = hashPwd
            next()
        })
    })
})

userSchema.methods = {
    comparePwd: function(_pwd, pwd) {
        return new Promise(function(resolve, reject) {
            bcrypt.compare(_pwd, pwd, function(err, isMatch) {
                if (!!err) return reject(err)
                resolve(isMatch)
            })
        })
    },
    inLogininAttepts: (user) => {
        return new Promise(function(resolve, reject) {
            if(this.lockUntil && this.lockUntil < Date.now()) {
                const update = {
                    $set: {
                        loginAttempts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                }
                this.update(update, function(err) {
                    if(err) return reject(err)
                    resolve(true)
                })
            }else {
                const update = {
                    $inc: {
                        loginAttempts: 1
                    }
                }
                if(this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
                    update.$set = {
                        lockUntil: Date.now() + LOCK_TIME
                    }
                }
                this.update(update, function(err) {
                    if(err) return reject(err)
                    resolve(true)
                })
            }
        })
    }
}

mongoose.model('User', userSchema)