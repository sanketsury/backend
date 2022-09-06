const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "First Name is required"]
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is required"],
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model('Author', authorSchema)









