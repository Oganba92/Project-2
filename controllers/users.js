
const Product = require('../models/product');
const Brand = require('../models/brand');
const User = require('../models/user');


module.exports = {
  update,
  show
  //new: newProduct,
  //create
};

/*Product.find({user: user._id},function(err,products){
    console.log(products);*/

function show(req, res) {
    User.findById(req.params.id,function(err, user) { 
        console.log(req.params.id);
        console.log(user);
        console.log("user works");
        Product.find({user: user._id},function(err,products){
            console.log(products);
           res.render('users/show', {
                title: 'User Detail', user,products});
              }
              )
            }
       ) }
          
        

function update(req,res) {
    User.findById(req.params.id).exec(function(err, user) { 
        console.log(user);
        for (let key in req.body) {
            if (req.body[key] === '') delete req.body[key];
          }
          for (let key in req.body) {
            user[key] =  req.body[key];
          }
       /* user.email = String(req.body.email);
        user.address = String(req.body.address);
        user.phone_no = req.body.phone_no;
        user.pref_payment = req.body.pref_payment;
        user.avatar = String(req.body.avatar);*/
        user.save(function(err) {
            Product.find({user: user._id},function(err,products){
        res.render('users/show', {
                title: 'User Detail', user, products});

     }) 
    })})}

        