
const BookModel= require("../models/bookModel")
const PublisherModel= require("../models/publisherModel")
const AuthorModel= require("../models//authorModel")

const newBook= async function (req, res) {
    let book = req.body

let authorid = await AuthorModel.findById( book.author)
let publisherid =await PublisherModel.findById( book. publisher)
// console .log (authorid)
if (!book.author || !book. publisher){
    return res.send({msg: "this detail is required"})
}else 
    if(authorid==null){
        return res.send({msg: "inter valid authorid"})
    }if (publisherid==null){
        return res.send ({msg: "inter valid publisherid"})
    }

let bookcreated = await BookModel.create(book)
    res.send({data: bookcreated})
}
const getbookwithauthorpublisher=async function(req ,res){
    let getbook= await BookModel.find().populate(['author', 'publisher'])
res.send({data: getbook})
}
 const Newupdatebook= async function(req,res){
let author=await AuthorModel.find({rating:{$gt:3.5}}).select({id:1})
let updateprice=await BookModel.updateMany({author:author},{$inc:{price:10}})
let updatebook= await BookModel.find().populate(['author','publisher'])

res.send({data:updatebook})

 }

module.exports.newBook=newBook
module.exports.getbookwithauthorpublisher=getbookwithauthorpublisher
module.exports.Newupdatebook=Newupdatebook