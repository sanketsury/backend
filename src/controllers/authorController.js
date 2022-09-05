const AuthorModel = require("../models/authorModel")

const createAuthor = async function(req, res){
    try {
       let data = req.body
       
       const author = await AuthorModel.create(data)

       res.status(201).send({status: true, data: author })
    } catch (error) {
        res.status(500).send({status: false, msg: error.message})
    }
}

module.exports.createAuthor = createAuthor