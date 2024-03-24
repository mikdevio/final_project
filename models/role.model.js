const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: String,
    description: String,
    permissions: [{ type: String }]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;