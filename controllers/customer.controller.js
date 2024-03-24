const express = require('express');
const Customer = require('../models/customer.model');

const router = express.Router();


router.get('/all', async (req, res) => {

    const customerList = await Customer.find({});
    res.render('partials/table.ejs', { data: customerList, table_title: "Customer", model: "customer" });
});


router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const data = await Customer.findById(id).exec();
    // console.log(data);
    res.render('partials/edit.form.ejs', { data: data, model_name: "customer" });
});

module.exports = router;