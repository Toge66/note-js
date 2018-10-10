const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema({
    name:{
        unique: true,
        type: String
    },
    movies: [{
        type: ObjectId,
        ref: 'Movie'
    }],
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

categorySchema.pre('save', next => {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else {
        this.meta.updateAt = Date.now()
    }
})

mongoose.model('Category', categorySchema)