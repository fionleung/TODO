const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
   content: String,
   assignTo:String
 });

let todoSchema = new Schema({
   // _id:Schema.Types.ObjectId,
   // createTime: {type:Date, default:Date.now},
        creator: String,
        // sharewith:[String],
        title:String,
        // tasks:[taskSchema],
        // deadline:Date,
   
});

module.exports = mongoose.model('List', todoSchema)
