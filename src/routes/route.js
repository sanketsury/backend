const express = require('express');
const router = express.Router(); //Skip
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")

//Author
router.post("/authors", authorController.createAuthor) //Create Author

//Blog
router.post("/blogs", blogController.createBlog) //Create Blog
router.get("/blogs", blogController.getBlog) //Get All Blogs
router.put("/blogs/:blogId", blogController.updateBlog) //Update Blog
router.delete("/blogs/:blogId", blogController.deleteBlog) //Delete Blog by Specific Id
router.delete("/blogss", blogController.deleteBlogByQuery) //Delete Blog by Using Query
router.post("/login", authorController.login)

module.exports = router;