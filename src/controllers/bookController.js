const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const booklist  = async function (req, res) {
    let allBooks= await BookModel.find().select ({bookName:1 , authorName:1 , _id:0})
    res.send({msg: allBooks})
}
  const getBooksInYear =async function (req, res){
    let input=req.query.input 
    let allBooks= await BookModel.find({year:{$eq:input}}) 
    res.send({msg: allBooks})
}
const getParticularBooks =async function (req, res){
    let book=req.body
    let allBooks= await BookModel.find(book)
    res.send({msg: allBooks})
}

const getXINRBooks=async function (req, res) {
    let allBooks= await BookModel.find({ "prices.indianPrice":{$in:["100INR", "200INR"]}})
    res.send({msg: allBooks})
}

 const getRandomBooks=async function (req, res) {
let allBooks= await BookModel.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]})

    res.send({msg: allBooks})
 }



module.exports.createBook= createBook
module.exports.booklist= booklist
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks
