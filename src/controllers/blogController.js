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
}

const deleteBlog = async function (req, res) {
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
}

const deleteBlogByQuery = async function (req, res) {
    try {
        let query = req.query

        if (Object.keys(query).length == 0) {
            return res.status(400).send({ status: false, msg: "Query Params cannot be empty" })
        }

        query.isDeleted = "false"

        let deleteBlogs = await blogModel.updateMany(query, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        console.log(deleteBlogs);
        if (deleteBlogs.matchedCount == 0) {
            return res.status(404).send({ status: false, msg: "Blog Not Found" })
        }

        res.status(200).send({ status: true, msg: "Document is deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: error.message })
    }
}

// try {
//     let blogId = req.params.blogId;
//     let blogData = req.body;
//     if(blogData.isPublished === true){
//       blogData.publishedAt= Date.now()
//     }else if(blogData.isPublished === false){
//       blogData.publishedAt=null;
//     }
//     let updatedBlog = await blogsmodel.findOneAndUpdate(
//       { _id: blogId, isDeleted: false },
//       { title: blogData.title, body: blogData.body, isPublished: blogData.isPublished, publishedAt: blogData.publishedAt, $push: { tags: blogData.tags, subcategory: blogData.subcategory }},
//       { new: true }
//     );
//     if(!updatedBlog) return res.status(404).send({status:false,msg:"No blogs found"})

//     res.status(200).send({ status: true, data: updatedBlog });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: false, msg: error.message });
//   }

//     let query = req.query
//     console.log(query);
//     if(!query){
//         return res.status(400).send({status: false, msg: "Query is required"})
//     }

//     let checkId = await blogModel.find({authorId: query.authorId, isDeleted: false})
//     console.log(checkId);

//     if(!checkId){
//         res.status(404).send({status: false, msg: "Nothing to delete"})
//     }

//     let deletedData = await blogModel.updateMany({authorId: query.authorId}, {$set: {isDeleted: true}}, {new: true})

//     res.status(200).send({status: true})


module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogByQuery = deleteBlogByQuery