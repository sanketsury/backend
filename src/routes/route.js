const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")


router.get("/", function() {
    console.log('Hello');
})

//author
router.post("/authors", authorController.createAuthor)

//blog
router.post("/blogs", blogController.createBlog)
router.get("/blogs", blogController.getBlog)
router.put("/blogs/:blogId", blogController.updateBlog )
router.delete("/blogs/:blogId", blogController.deleteBlog)

module.exports = router;