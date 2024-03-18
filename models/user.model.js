const mongoose = require('mongoose');

const User = mongoose.Model("User", {
    user_name: String,
    email: String,
    password: String
})

module.exports = User;