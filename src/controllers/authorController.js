const AuthorModel= require("../models/authorModel")

const newAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}



module.exports.newAuthor=newAuthor
