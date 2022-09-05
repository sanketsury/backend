const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")

router.get("/", function() {
    console.log('Hello');
})

//author
router.post("/createAuthor", authorController.createAuthor)

//blog
router.post("/createBlog", blogController.createBlog)
router.get("/getBlog", blogController.getBlog)

module.exports = router;