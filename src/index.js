const express = require("express")
const mongoose = require("mongoose") //Skip library or function
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //Skip

mongoose.connect("mongodb+srv://satyajitbera1796:18LuJ6umpLy3A35i@cluster0.puyfnq4.mongodb.net/Group65?retryWrites=true&w=majority", {
    useNewUrlParser: true //Skip
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


