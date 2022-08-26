const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const moment=require('moment')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://sanketsuryawanshi:OwiXFmeJvUfout2G@cluster0.k6oib1b.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        const time =moment ().format ("YYYY-MM-DD hh:mm")
        const ip = req.socket .localAddress
        const path = req.url
        console.log ("you are in middleware")
        console.log (time ,ip ,path)
        next();
  }
  );
app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
