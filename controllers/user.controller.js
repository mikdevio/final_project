const express = require('express');
const User = require('../models/user.model')

const {dataEmptyFromModel, dataFilledFromModel} =require('../utils/func');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('user.login.ejs');
});

router.post('/login', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send(data);
});

router.get('/signup', (req, res) => {
    res.render('user.signup.ejs');
});

router.post('/signup', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send(data);
});

router.get('/dashboard', (req, res) => {
    res.render('user.dashboard.ejs');
});

router.get('/all', async (_, res) => {
    const usersList = await User.find({});
    res.render('partials/table.ejs', { data: usersList, table_title: "Users", model: "user" });
});

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = await User.findById(id).exec();
    let fields = dataFilledFromModel(User, data);
    // console.log(fields);
    res.render('partials/edit.form.ejs', { data: fields, model_name: "user" });
});

router.get('/new', (req, res) => {
    let fields = dataEmptyFromModel(User);
    res.render('partials/new.form.ejs', { data: fields, model_name: "user" });
});

router.post('/create', async (req, res) => {
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    try {
        const result = await newUser.save();
        res.redirect("/user/all");
    } catch (err) {
        console.log(err);
    }
});

router.post('/update/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findOneAndUpdate({_id: userId}, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        res.redirect('/user/all');
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findOneAndDelete({_id: productId});
        res.redirect('/user/all');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;