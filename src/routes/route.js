const express = require('express');
const router = express.Router(); //Skip
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware = require("../middleware/middleware")

//Author
router.post("/authors", authorController.createAuthor) //Create Author

//Blog
router.post("/blogs", blogController.createBlog) //Create Blog
router.get("/blogs", middleware.authentication,middleware.authorisation, blogController.getBlog) //Get All Blogs
router.put("/blogs/:blogId", middleware.authentication, middleware.authorisation, blogController.updateBlog) //Update Blog
router.delete("/blogs/:blogId", blogController.deleteBlog) //Delete Blog by Specific Id
router.delete("/blogss", blogController.deleteBlogByQuery) //Delete Blog by Using Query
router.post("/login", authorController.login)


module.exports = router;