const mongoose = require('mongoose');
// shortcut variable
const Schema = mongoose.Schema;
const Brand = require('../models/brand');
const User = require('../models/user');

const reviewSchema = new Schema({
  content: {type: String, required: true},
  rating: {type: Number, min: 1, max: 5, default: 5},
  // Add the two new properties below
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const product = new Schema({
  title: {
    type: String,
    required: true
  },
  purchase_date: {
    type: Number,
    default: function() {
      return new Date().getFullYear()
    },
    min: 1927
  },
  condition: {
    type: String,
    enum: ['Damaged', 'Old', 'Used', 'New', 'Wrapped/Boxed']
  },
  address: {type: String, required: true},
  content: {type: String, required: true},
  reviews: [reviewSchema],
  brand: {type: Schema.Types.ObjectId, ref: 'Brand'}, 
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  price: Number
  }, 
   {

 // 
  timestamps: true
});

module.exports = mongoose.model('Product', product);