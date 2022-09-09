var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
 // useCreateIndex: true,
  useUnifiedTopology: true
});

// shortcut to mongoose.connection object
var db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

/*db.dropCollection('brands', function(err, result) {
  console.log(result);
  console.log('herenow');
});
db.dropCollection('products', function(err, result) {
  console.log(result);
  console.log('herenow');
});
db.dropCollection('users', function(err, result) {
  console.log(result);
  console.log('herenow');
}); */