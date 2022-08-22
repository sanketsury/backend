const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const publisherController=require("../controllers/publisherController")
const bookController= require("../controllers/bookController")
router.get("/test-me", function (req, res) {

    res.send("My first ever api!")
})

router.post("/newAuthor", authorController.newAuthor  )
router.post("/newPublisher", publisherController.newPublisher)
router.post("/newBook",bookController.newBook)
router.get("/getbookwithauthorpublisher",bookController.getbookwithauthorpublisher)
router.put("/Newupdatebook",bookController.Newupdatebook)
module.exports = router;