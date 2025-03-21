import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true // createdAt, updatedAt
});

const Item = mongoose.model('Item', itemSchema); // mongoose converts it to lowerCase and plural

export default Item;