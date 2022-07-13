const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    gallery: String,
    price: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        required: new Date()
    },
    custom: {
        type: String
    }
})