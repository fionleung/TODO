const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
   creator: String,
   createdTime: Date,
   content: String,
   assignTo: [String],
   done:Boolean,
  
   //history:[]
});

let todoSchema = new Schema({
   
   createTime: { type: Date, default: Date.now },
   creator: String,
   sharewith: [String],
   title: String,
   tasks: [taskSchema],
   deadline: Date,
   tags:[String],
});

module.exports = mongoose.model('List', todoSchema)

