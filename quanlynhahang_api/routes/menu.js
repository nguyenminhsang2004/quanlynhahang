var express = require('express');
var router = express.Router();
var multer = require('multer');
var menuModel = require('../model/menu');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './../quanlynhahang/public/images/menu')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  })
var upload = multer({storage:storage});

router.get('/get-all-menu', function(req, res, next) {
  menuModel.find({},(err,data) => {
    res.send(data);   
  })
});

router.post('/add-menu', function(req, res, next) {
    var menu = new menuModel(req.body.item);
    menu.save(function(err,result){
        if (err){
            res.sendStatus(500);
        }
        else{
            res.send(menu._id);
        }
    });
});

router.post('/edit-menu', function(req, res, next) {
  var menu = req.body.item;
  menuModel.findByIdAndUpdate(menu.id,{
    name:menu.name,
    description:menu.description,
    price:menu.price,
    image:menu.image,
    discount:menu.discount,
    new:menu.new,
    category_id:menu.category_id
  }).exec();
  res.sendStatus(200);
});

router.post('/update_menu_category', function(req, res, next) {
  var id = req.body.id;
  menuModel.find({category_id : id},(err,data) => {
    data.map(item => {
      menuModel.findByIdAndUpdate(item._id,{category_id:"60d6d0acc9158c41e8ca6af9"}).exec();
    });
  });
  res.sendStatus(200);
});

router.post('/delete-menu', function(req, res, next) {
  var id = req.body.id;
  menuModel.findByIdAndDelete(id).exec();
  res.sendStatus(200);
});

router.post('/file-image', upload.single('image'), function(req, res, next) {
    const file = req.file;
    res.json({fileName:file.filename, filePath:file.path});
});

module.exports = router;