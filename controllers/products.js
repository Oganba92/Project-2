const Product = require('../models/product');
const Brand = require('../models/brand');
const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
  index,
  show,
  new: newProduct,
  create,
  delete: deleteProduct,
 filterBybrand,
 update
};

function index(req, res) {
  Product.find({}).populate('brand').populate('user').exec(function(err, products) {
    console.log(products);
    Brand.find({}).exec(function(err,brands) {
    res.render('products/index', { title: 'All Products', products, brands });
    })
  });
}

function show(req, res) {
    Product.findById(req.params.id).populate('user').populate('brand').
    exec(function(err, product) {
      if(product.brand){  
        console.log('exists');
       // Brand.find(
         //   {name: product.brand.name},
           // function(err, brand) {
             // console.log(brand);
             Brand.find({}).exec(function(err,brands){
              res.render('products/show', {
                title: 'Product Detail', product, brands, brand: product.brand, prod_owner: product.user});
              });}
    else{
      brand = 'none inputted';
      res.render('products/show', {
        title: 'Product Detail', product, brand_name: brand, prod_owner: product.user
      });
    }
})}

 function newProduct(req, res) {
  res.render('products/new', { title: 'Add Product',  });
}
  async function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    console.log(req.body);
    req.body.user = mongoose.Types.ObjectId(req.user._id);
    //req.body.userName = String(req.user.name);
    //req.body.purchase_date = parseInt(req.body.purchase_date);
    // remove whitespace next to commas
    // split if it's not an empty string

      // Add the user-centric info to req.body (the new review)
      
  
      // Push the subdoc for the review
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }

    let i = 0;
    
    
    console.log("inside");
    console.log(req.user);
    const b = await Brand.findOne({ name: String(req.body.brand)});
    const c = await User.findById(req.user._id);
    console.log(b);
    console.log(c);
    req.body.brand = b._id;
    //req.body.user = c
    const producttest = await new Product(req.body);
    console.log(producttest);
    //req.body.brand = mongoose.Types.ObjectId(b._id);
    console.log(req.body); 
    producttest.save( function (err){
        console.log(producttest);
        console.log(typeof(producttest));
            // one way to handle errors
            if (err) {console.log(err);return res.redirect('/products/new');};
            console.log(producttest);
            // for now, redirect right back to new.ejs
            res.redirect(`/products/${producttest._id}`);
          });
    ;
  }

  function deleteProduct(req, res, next) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Product.findById(req.params.id).then(function(product) {
      // Find the review subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const user = product.user._id;
      // Ensure that the review was created by the logged in user
      if (!user.equals(req.user._id)) return res.redirect(`/products/${product._id}`);
      // Remove the review using the remove method of the subdoc
      product.remove();
      // Save the updated movie
      
        // Redirect back to the movie's show view
        res.redirect(`/`);
      
      });
    };
  

  function filterBybrand(req,res){
    console.log(req.body);
    brand_f_p = mongoose.Types.ObjectId(req.body.brand);
    console.log(brand_f_p);
    Product.find({brand: brand_f_p}).populate('brand').populate('user').exec(function(err, products){
    console.log(products);
    Brand.find({}).exec(function(err,brands) {
        console.log(brands);
        res.render('products/index', { title: 'All Products', products, brands });
        })
    });
  }


  function update(req,res) {
    Product.findById(req.params.id).populate('user').exec(function(err, product) { 
        console.log(product);
        for (let key in req.body) {
            if (req.body[key] === '') delete req.body[key];
          }
          for (let key in req.body) {
            product[key] =  req.body[key];
          }
       /* user.email = String(req.body.email);
        user.address = String(req.body.address);
        user.phone_no = req.body.phone_no;
        user.pref_payment = req.body.pref_payment;
        user.avatar = String(req.body.avatar);*/
        product.populate('brand', function(err) {
          console.log(product);
        })
        product.save(function(err) {
          console.log(product);
            User.find({user: product.user},function(err,user){
              Brand.find({}).exec(function(err,brands) {
        res.render('products/show', {
                title: 'Product Detail', product, brands, brand: product.brand, prod_owner: product.user});

    })}) 
    })})}