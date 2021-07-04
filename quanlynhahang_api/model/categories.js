var mongoose = require('mongoose');
var categories = new mongoose.Schema({
    id:{type:String},
    name:{type:String},
    description:{type:String},
    flag:{type:Boolean}},
    {collection:'categories'});
module.exports = mongoose.model('categories',categories);