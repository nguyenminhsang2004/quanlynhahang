var express = require('express');
var router = express.Router();
var categoryModel = require('../model/categories');

router.get('/get-all-categories', function(req, res, next) {
  categoryModel.find({},(err,data) => {
    res.send(data);   
  })
});

router.post('/add-category', function(req, res, next) {
  var category = new categoryModel(req.body.item);
  category.save(function(err,result){
    if (err){
      res.sendStatus(500);
    }
    else{
      res.send(category._id);
    }
  });
});

router.post('/edit-category', function(req, res, next) {
  var category = req.body.item;
  categoryModel.findByIdAndUpdate(category.id,{name:category.name,description:category.description}).exec();
  res.sendStatus(200);
});

router.post('/delete-category', function(req, res, next) {
  var id = req.body.id;
  categoryModel.findByIdAndDelete(id).exec();
  res.sendStatus(200);
});

module.exports = router;
