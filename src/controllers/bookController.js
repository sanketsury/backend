const { count } = require("console")
const AuthorModel = require("../models/authorModel")
const BookModel= require("../models/bookModel")


const createBook= async function (req, res) {
    let data= req.body
 let savedData= await BookModel.create(data)
    res.send({msg: savedData})
  
}
const getBook= async function (req, res) {
    // let data= req.body
 let savedData= await AuthorModel.find({author_name:"Chetan Bhagat"})
 let book= await BookModel.find({author_id:{$eq:savedData[0].author_id}})
    res.send({msg: book})
}
const updateBook=async function (req, res) {
 let bookprice= await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true})  
 let updateprice=bookprice.price;
 let authorupdate = await AuthorModel.find({author_id:{$eq:bookprice.author_id}}).select({author_name:1,_id:0})
 res.send({authorupdate ,updateprice})
}

const bookrange= async function (req,res){
    let range= await BookModel.find({price:{$gte:50 ,$lte:100}})
    let a = range.map(x=>x.author_id)
    let newrange=await AuthorModel.find({author_id:a}).select({author_name:1,_id:0})
res.send(newrange)
}




module.exports.createBook= createBook
module.exports.getBook= getBook
module.exports.updateBook=updateBook
module.exports.bookrange=bookrange