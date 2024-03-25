const express = require('express');
const Role = require('../models/role.model');

const {dataEmptyFromModel, dataFilledFromModel} =require('../utils/func');

const router = express.Router();

router.get('/all', async (req, res) => {

    const rolesList = await Role.find({});
    res.render('partials/table.ejs', { data: rolesList, table_title: "Roles", model: "role" });
});


router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Role.findById(id).exec();
    let fields = dataFilledFromModel(Role, data);
    // console.log(fields);
    res.render('partials/edit.form.ejs', { data: fields, model_name: "role" });
});

router.get('/new', (req, res) => {
    let fields = dataEmptyFromModel(Role);
    res.render('partials/new.form.ejs', { data: fields, model_name: "role" });
});

router.post('/create', async (req, res) => {
    const newCustomer = new Role({
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions
    });

    try {
        const result = await newCustomer.save();
        res.redirect("/role/all");
    } catch (err) {
        console.log(err);
    }

});

router.post('/update/:id', async (req, res) => {
    const customerId = req.params.id;
    try {
        await Customer.findOneAndUpdate({_id: customerId}, {
            name: req.body.name,
            description: req.body.description,
            permissions: req.body.permissions
        });
        res.redirect('/role/all');
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async (req, res) => {
    const roleId = req.params.id;
    try {
        await Role.findOneAndDelete({_id: roleId});
        res.redirect('/role/all');
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;