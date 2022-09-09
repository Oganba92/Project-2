const Product = require('../models/product');

module.exports = {
  create,
  delete: deleteReview
};

function create(req, res) {
  // Find the movie to embed the review within
  Product.findById(req.params.id, function(err, product) {

    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    // Push the subdoc for the review
    product.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
    product.save(function(err) {
      res.redirect(`/products/${product._id}`);
    });
  });
}

function deleteReview(req, res, next) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Product.findOne({'reviews._id': req.params.id}).then(function(product) {
    // Find the review subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const review = product.reviews.id(req.params.id);
    // Ensure that the review was created by the logged in user
    if (!review.user.equals(req.user._id)) return res.redirect(`/products/${product._id}`);
    // Remove the review using the remove method of the subdoc
    review.remove();
    // Save the updated movie
    product.save().then(function() {
      // Redirect back to the movie's show view
      res.redirect(`/products/${product._id}`);
    }).catch(function(err) {
      // Let Express display an error
      return next(err);
      // res.redirect(`/movies/${movie._id}`);
    });
  });
}
