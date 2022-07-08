const mongoose = require("mongoose");

const { Schema } = mongoose;

const category = Schema(
    {
        name: {type: String, required: true},
        options: [],
        products: [
            { 
                type: Object,
                ref: 'Product' 
            }
        ]
    }
)

module.exports = mongoose.model("Category", category)