const express = require('express');
const Role = require('../models/role.model');

const router = express.Router();


router.get('/all', async (req, res) => {

    const rolesList = await Role.find({});
    res.render('partials/table.ejs', { data: rolesList, table_title: "Roles", model: "role" });
});


router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const data = await Role.findById(id).exec();
    // console.log(data);
    res.render('partials/edit.form.ejs', { data: data, model_name: "role" });
});

module.exports = router;