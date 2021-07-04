var mongoose = require('mongoose');
var menu = new mongoose.Schema({
    id:{type:String},
    name:{type:String},
    description:{type:String},
    image:{type:String},
    price:{type:String},
    discount:{type:Number},
    new:{type:Boolean},
    category_id:{type:String}},
    {collection:'menu'});
module.exports = mongoose.model('menu',menu);