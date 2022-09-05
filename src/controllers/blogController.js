const BlogModel = require("../models/blogModel")
const AuthorModel = require("../models/authorModel")

const createBlog = async function (req, res) {
    try {
        if (!req.body.authorId) {
            res.status(404).send({ status: false, msg: "Author Id is manditory" })
        }

        const authorCheck = await AuthorModel.findOne({_id: req.body.authorId})
        if (!authorCheck) {
            res.status(404).send({ status: false, msg: "Author Id is incorrect"  })
        }
        
        let data = req.body

        const blog = await BlogModel.create(data)

        res.status(201).send({ status: true, data: blog })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getBlog = async function (req, res) {
    try {
        const authorId = req.query.authorId
        const category = req.query.category
        const tags = req.query.tags
        const subcategory = req.query.subcategory

        const query = req.query

        //?authorId=2423&category=Electronics

        const blogs = await BlogModel.find({ $and: [query, { isDeleted: false }, { isPublished: true }] })

        if (!blogs) {
            res.status(404).send({ status: false })
        }
        res.status(200).send({ status: true, data: blogs })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createBlog = createBlog
module.exports.getBlog = getBlog