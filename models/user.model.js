const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema definition
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String
});

// Model definition
const User = mongoose.model('User', userSchema);

module.exports = User;