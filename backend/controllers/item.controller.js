import mongoose from "mongoose";
import Item from "../models/item.model.js";

export const getItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json({ success: true, data: items });

    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createItem = async (req, res) => {
    const item = req.body; // user sends this data

    const isDataInvalid = !item.name || !item.price;
    if(isDataInvalid) {
        return res.status(400).json({ success: false, message: "not all  fields were given" });
    }

    const newItem = new Item(item);

    try {
        await newItem.save();
        res.status(201).json({ success: true, data: newItem });
    } catch (error) {
        console.error("Error in Create item: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const item = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: `Item with id=${id} not found!` });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, item, {new: true});
        res.status(200).json({ success: true, data: updatedItem })
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteItem = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Item Id!" });
    }

    try {
        await Item.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Item was successfully deleted." })
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}