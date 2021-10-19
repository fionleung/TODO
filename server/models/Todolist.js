const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
   creator: String,
   createdTime: Date,
   content: String,
   assignTo: [String],
   //history:[]
});

let todoSchema = new Schema({
   
   createTime: { type: Date, default: Date.now },
   creator: String,
   sharewith: [String],
   title: String,
   tasks: [taskSchema],
   deadline: Date,

});

module.exports = mongoose.model('List', todoSchema)
