const mongoose = require("mongoose");
const category = require("./category");
const { Schema } = mongoose;

const product = Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    images: [],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

})

module.exports = mongoose.model("Product", product)