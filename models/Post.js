const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    postBody:{
        type:String,
        required:true,
    },
    publishedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema);