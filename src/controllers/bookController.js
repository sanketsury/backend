
const BookModel= require("../models/bookModel")
const PublisherModel= require("../models/publisherModel")
const AuthorModel= require("../models//authorModel")

const newBook= async function (req, res) {
    let book = req.body
    //  a
    if(!book.author) {
        return res.send({status: false, msg: "author id is a required"})
    }

    // b)
    let author = await AuthorModel.findById(book.author)
    if(!author) {
        return res.send({status: false, msg: "Author id is not present "})
    }

    // c)
    if(!book.publisher) {
        return res.send({status: false, msg: "Publisher id is a required"})
    }

    //  d)
    let publisher = await PublisherModel.findById(book.publisher)
    if(!publisher) {
        return res.send({status: false, msg: "Publisher id is not valid"})
    }

    let bookCreated = await BookModel.create(book)
    res.send({data: bookCreated})
}

const getAllBooksWithCompleteDetails = async function (req, res) {
    let allBooks = await BookModel.find().populate('author publisher')
    res.send({data: allBooks})

}
const Newupdatebook = async function(req, res) {
    let requiredPublishers = 
    await publisherModel.find({$or: [{name: "Penguin"},{name: "HarperCollins"}]}, {_id: 1})

    let requiredPublisherIds = [] 
    for (let i = 0; i < requiredPublishers.length; i++) {
        requiredPublisherIds.push(requiredPublishers[i]._id)
    }
    let updatedBooks = await bookModel.updateMany({publisher : {$in: requiredPublisherIds}}, {isHardCover: true}, {new: true})
    res.send({data: updatedBooks})
}


module.exports.newBook=newBook
module.exports.getAllBooksWithCompleteDetails=getAllBooksWithCompleteDetails
 module.exports.Newupdatebook=Newupdatebook