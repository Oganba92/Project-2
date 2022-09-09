var express = require('express');
var router = express.Router();
var productsCtrl = require('../controllers/products');
const isLoggedIn = require('../config/auth');

router.post('/filtered', productsCtrl.filterBybrand);
router.get('/', productsCtrl.index);
router.get('/new', isLoggedIn, productsCtrl.new);
router.get('/:id', productsCtrl.show);
router.post('/', isLoggedIn, productsCtrl.create);
router.post('/:id', isLoggedIn, productsCtrl.update);
router.delete('/:id', isLoggedIn, productsCtrl.delete);



module.exports = router;
