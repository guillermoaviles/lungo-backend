const mongoose = require('../db/connection');

const Schema = mongoose.Schema;


// Adress Schema Model
const addressSchema = new Schema(
    {
        addresses: [String],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

module.exports = mongoose.model('Address', addressSchema);

