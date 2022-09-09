var express = require('express');
var router = express.Router();
var productsCtrl = require('../controllers/products');
var usersCtrl = require('../controllers/users');
const isLoggedIn = require('../config/auth');


//router.get('/users/new', isLoggedIn, productsCtrl.new);
router.get('/users/see/:id', usersCtrl.show);
router.post('/users/:id', isLoggedIn, usersCtrl.update);

module.exports = router;
