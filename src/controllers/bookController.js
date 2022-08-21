const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")

const newBook= async function (req, res) {
    let book = req.body
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}





module.exports.newBook=newBook