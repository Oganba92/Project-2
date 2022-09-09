const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, default: 'Not Set'},
    googleId: {
      type: String,
      required: true
    },
    email: {type: String, default: 'Not Set'},
    avatar: {type: String, default: ''},
    address: {type: String, default: 'Not Set'},
    phone_no: {type: Number, default: 0},
    pref_payment: {
        type: String,
        default: 'Not Set',
        enum: ['Cash', 'Credit', 'Check', 'Venmo','Not Set']
      },
  }, {
    timestamps: true
  });


module.exports = mongoose.model('User', userSchema);