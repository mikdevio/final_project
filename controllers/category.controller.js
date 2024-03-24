const express = require('express');
const Category = require('../models/category.model');

const router = express.Router();


router.get('/all', async (req, res) => {

    const categoriesList = await Category.find({});
    res.render('partials/table.ejs', { data: categoriesList, table_title: "Roles", model: "role" });
});


router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const data = await Category.findById(id).exec();
    // console.log(data);
    res.render('partials/edit.form.ejs', { data: data, model_name: "role" });
});

module.exports = router;