
const express = require('express');
const router = express.Router();
const BookModel = require("../models/bookModel.js")

const BookController= require("../controllers/bookController")






router.post("/createBook", BookController.createBook  )

router.get("/booklist", BookController.booklist)


router.post("/getBooksInYear", BookController.getBooksInYear)

router.post("/getParticularBooks", BookController.getParticularBooks)

router.get("/getXINRBooks", BookController.getXINRBooks)

router.get("/getRandomBooks", BookController.getRandomBooks)

module.exports = router;