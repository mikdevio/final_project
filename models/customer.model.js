const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    first_name: String,
    last_name: String,
    tax_number: String,
    email: String,
    phone: String,
    password: String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;