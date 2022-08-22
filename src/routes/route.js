const express = require('express');
const router = express.Router();

const AuthorController= require("../controllers/authorController")

const BookController= require("../Controllers/bookcontroller")





router.post("/createAuthor", AuthorController.createAuthor )

router.post("/createbook",   BookController.createBook  )

router.get("/getBook",   BookController.getBook  )

router.get("/updateBook",   BookController.updateBook)

router.get("/bookrange",   BookController.bookrange)


module.exports = router;