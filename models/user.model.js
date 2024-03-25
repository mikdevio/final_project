const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

// Schema definition
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String
});

userSchema.pre('save', function(next) {
    let user = this;

    // If password is not modified or new got to next
    if (!user.isModified('password')) return next();

    // Generating a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        // If error go to next
        if (err) return next();

        bcrypt.hash(user.password, salt, (err, hash) => {
            // If error go to next
            if (err) return next();
            user.password = hash;
            next();
        });
    });
});

// Method to compare password
userSchema.methods.comparePassword = (passwordToValidate, cb) => {
    bcrypt.compare(passwordToValidate, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Model definition
const User = mongoose.model('User', userSchema);

module.exports = User;