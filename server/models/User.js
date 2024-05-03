const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})
const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel;