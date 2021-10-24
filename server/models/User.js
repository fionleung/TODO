const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tags:[String],
   created:[ObjectId],
   role:String,

});

module.exports = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});

//use asyn validator instead https://medium.com/@rinciarijoc/angular-custom-async-validators-13a648d688d8