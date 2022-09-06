const AuthorModel = require("../models/authorModel")

const createAuthor = async function (req, res) {
    try {

        const regexEmail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

        if(!req.body.email.match(regexEmail)){
            return res.status(400).send({status: false, msg: "Invalid Email"})
        }

        let data = req.body

        const author = await AuthorModel.create(data)

        res.status(201).send({ status: true, data: author })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createAuthor = createAuthor