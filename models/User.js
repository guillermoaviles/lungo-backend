const mongoose = require('../db/connection');
const Schema = mongoose.Schema;


// User Schema Model
const userSchema = new Schema(
    {
        address: String,
        addresses: [String]
    }
);

module.exports = mongoose.model('User', userSchema);

