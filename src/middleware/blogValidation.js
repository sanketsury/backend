const blogModel = require("../models/blogModel")
const blogController = require("../controllers/blogController")

const regexCharAndNum = new RegExp(/^[a-z\d\-_\s]+$/i)  

// Create Blog Validation

const blogValidation = function(req, res, next){
let data = req.body

        if (!data.title || !data.title.match(regexCharAndNum)) {
            return res.status(400).send({ status: false, msg: "Title is required and must be valid" })
        }

        if (!data.body) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        }
         
        if (typeof (data.tags) != "object") {
            res.status(400).send({ status: false, msg: "Tags should be string" })
        }

        if (typeof (data.category) != 'object') {
            res.status(400).send({ status: false, msg: "Category should be string 12" })
        }

        if (typeof (data.subcategory) != 'object') {
            res.status(400).send({ status: false, msg: "Subcategory should be string" })
        }
        next()
    }


// Update Validation

const updateValidation = function(req, res, next){
let detail = req.body.title
let body = req.body.body
let tags = req.body.tags
let subcategory = req.body.subcategory
if (!detail.match(regexCharAndNum)) {
    return res.status(400).send({ status: false, msg: "Title is required and must be valid" })
}

if (!body) {
    return res.status(400).send({ status: false, msg: "Body is required" })
}

if (tags && typeof (tags) != 'object') {
    res.status(400).send({ status: false, msg: "Tags should be string " })
}

if (subcategory && typeof (subcategory) != 'object') {
    res.status(400).send({ status: false, msg: "Subcategory should be string" })
}
next()
}

module.exports.blogValidation = blogValidation 

module.exports.updateValidation = updateValidation