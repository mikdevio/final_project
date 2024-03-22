const express = require('express');
const Product = require('../models/product.model');

const router = express.Router();


router.get('/products', async (req, res) => {

    const productsList = await Product.find({});
    res.render('products', { data: productsList, table_title: "Products" });
});

module.exports = router;