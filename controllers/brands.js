
   
const Brand = require('../models/brand');
const Product = require('../models/product');

module.exports = {
  new: newBrand,
  create,
};


function create(req, res) {
  Brand.create(req.body, function (err, brand) {
    console.log(brand);
    brand.save(function(err){
    res.redirect('/brands/new');})
  });
}

function newBrand(req, res) {
  Brand.find({})
  .sort('name')
  .exec(function (err, brands) {
    res.render('brands/new', {
      title: 'Add Brand',
      brands
    });
  });
}