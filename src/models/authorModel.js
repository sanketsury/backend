const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
      authorName:String,
       age:String,
       adress:String,
       rating:Number
    
    

}, { timestamps: true });

module.exports = mongoose.model('newAuthor', authorSchema)
