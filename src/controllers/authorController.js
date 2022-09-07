const authorModel = require("../models/authorModel");
const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")




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

const login = async function (req, res){
    let userName = req.body.email
    let password = req.body.password
    let user = await authorModel.findOne({email:userName, password:password})
    if(!user){
        return res.status(404).send({status: false, msg: "email id or password incorect"})
    }
    let token = jwt.sign(
        {
            userId: user.fname.toString(),
            group: 65,
        },
        "manthan_sanket_suyash_satyajit_group_65"
    )
    res.status(200).send({statsu:true, msg: token})
}

module.exports.createAuthor = createAuthor
module.exports.login = login