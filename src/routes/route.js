const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController=require("../controllers/publisherController")

router.get("/test-me", function (req, res) {

    res.send("My first ever api!")
})

router.post("/newAuthor", authorController.newAuthor  )



router.post("/newPublisher", publisherController.newPublisher)

module.exports = router;