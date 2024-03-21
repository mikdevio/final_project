const express = require('express');
const User = require('../models/user.model')

const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {


    res.render('signup');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.get('/users', async (req, res) => {
    const usersList = await User.find({});
    res.render('users', {data: usersList});
});


module.exports = router;