const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
// const  uniqueValidator = require('mongoose-unique-validator');

const ItemSchema = new mongoose.Schema({
    name: String, 
    price: Number
}, { timestamps: true });

const ReceiptSchema = new mongoose.Schema({
    service: String,
    store: String,
    date: Date,
    items: [ItemSchema] ,
    image: String,
    jsonResult: String,
}, { timestamps: true });

const Item = mongoose.model('item', ItemSchema);
const Receipt = mongoose.model('receipt', ReceiptSchema);

// PetSchema.plugin(uniqueValidator,{message: "Error: {PATH} must be unique!"}, { type: 'mongoose-unique-validator' });
module.exports = { Receipt, Item };