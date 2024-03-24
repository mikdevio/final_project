const express = require('express');
const Product = require('../models/product.model');

const router = express.Router();


router.get('/all', async (req, res) => {

    const productsList = await Product.find({});
    res.render('product.all.ejs', { data: productsList, table_title: "Products", model: "product" });
});


router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const data = await Product.findById(id).exec();
    // console.log(data);
    res.render('user.edit.ejs', { data: data, model_name: "product" });
});

module.exports = router;