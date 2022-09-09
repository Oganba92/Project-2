const express = require('express');
const router = express.Router();
const brandsCtrl = require('../controllers/brands');
const isLoggedIn = require('../config/auth');

// This router is mounted to a "starts with" path of '/'

router.get('/brands/new', isLoggedIn, brandsCtrl.new);
router.post('/brands', isLoggedIn, brandsCtrl.create);

module.exports = router;