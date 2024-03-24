const express = require('express');
const User = require('../models/user.model')

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
    res.render('user.all.ejs', { data: usersList, table_title: "Users", model: "user" });
});

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const data = await User.findById(id).exec();
    // console.log(data);
    res.render('user.edit.ejs', { data: data, model_name: "user" });
});


module.exports = router;