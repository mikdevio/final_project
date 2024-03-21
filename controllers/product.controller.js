const express = require('express');
const Product = require('../models/product.model');

const router = express.Router();


router.get('/products', async (req, res) => {

    const productsList = await Product.find({});
    const colsList = Object.keys(productsList[0]._doc);
    res.render('products', {cols: colsList, data: productsList});
});

module.exports = router;