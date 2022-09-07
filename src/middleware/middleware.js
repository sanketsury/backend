const jwt = require("jsonwebtoken")

const authentication = async function(req, res, next){
    let token = req.headers['x-api-key']
    if (!token){
        return res.status(404).send({status: false, msg: "token must be present"})
    }

    let decodedToken = jwt.verify(token, "manthan_sanket_suyash_satyajit_group_65")
    if(!decodedToken){
        return res.status(401).send({status: false, msg: "token is invalid"})
    }
    next()
}