const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
},
{
    versionKey: false
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;