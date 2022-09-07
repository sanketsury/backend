const AuthorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")


const createBlog = async function (req, res) {
    try {
        if (!req.body.authorId) {
            res.status(400).send({ status: false, msg: "invalid request, Author Id is manditory" })
        }

        const authorCheck = await AuthorModel.findOne({ _id: req.body.authorId })
        if (!authorCheck) {
            res.status(404).send({ status: false, msg: "Author Id is incorrect" })
        }

        let data = req.body

        const blog = await blogModel.create(data)

        res.status(201).send({ status: true, data: blog })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getBlog = async function (req, res) {
    try {
        const query = req.query
        const blogs = await blogModel.find({ $and: [query, { isDeleted: false }, { isPublished: true }] })

        if (!blogs) {
            res.status(404).send({ status: false })
        }
        res.status(200).send({ status: true, data: blogs })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const updateBlog = async function (req, res) {
    try {
        let param = req.params.blogId
        let blogId = await blogModel.findById(param)
        if (!blogId) {
            return res.status(404).send({ status: false, msg: "blogId is not found" })
        }
        let detail = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subcategory = req.body.subcategory
        
        let data1 = await blogModel.updateMany({ _id: param, isPublished: true }, { title: detail, body: body, publishedAt: Date.now(), $push: { tags: tags, subcategory: subcategory } }, { new: true })  //Skip

        res.status(200).send({ satus: true, msg: data1 })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteBlog = async function (req, res) {
    try {
        let id = req.params.blogId
        if (!id) {
            res.send({ msg: "id is mandatory" })
        }
        let checkId = await blogModel.findById(id)
        if (!checkId) {
            res.send({ msg: "id is incorrect" })
        }
        if (checkId.isDeleted == true) {
            res.status(404).send({ status: false, msg: "blog is already deleted" })
        }
        let checkDelete = await blogModel.updateMany({ _id: id }, { $set: { isDeleted: true } }, { new: true })
        res.status(200).send({ status: true })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteBlogByQuery = async function (req, res) {
    try {
        let query = req.query
        console.log(query)

        if (Object.keys(query).length == 0) {
            return res.status(400).send({ status: false, msg: "Query Params cannot be empty" })
        }

        query.isDeleted = false//Skip
        //query.isPublished = true
        

        let deleteBlogs = await blogModel.updateMany(query, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        console.log(deleteBlogs);
        if (deleteBlogs.matchedCount == 0) {
            return res.status(404).send({ status: false, msg: "Blog Not Found or deleated" })
        }

        res.status(200).send({ status: true, msg: "Document is deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: error.message })
    }
}




module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogByQuery = deleteBlogByQuery