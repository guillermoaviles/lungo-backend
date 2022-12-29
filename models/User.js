const mongoose = require('../db/connection');
const Schema = mongoose.Schema;


// Item Schema Model
const userSchema = new Schema(
    {
        address: String,
    }
);

module.exports = mongoose.model('User', userSchema);

