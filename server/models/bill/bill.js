const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    

    bill_id: {
    type: String,
    required: true,
    },
    bill_collection_index: {
    type: String,
    required: true,
    },
    bill_total: {type: String,
    default: null
    },
    bill_discount: {type: String,
    default: null
    },
    bill_tax: {type: String,
    default: null
    },
    bill_shipping: {type: String,
    default: null
    },
    bill_items: {type: Array}, 
    bill_status: {type: String,
        default: 'Active'
    },
    created_at:{
    type: Date,
    immutable: true,
    default: () => Date.now(),
    },
    updated_at:{
    type: Date,
    default: () => Date.now(),
    },
})

module.exports = mongoose.model('bills', BillSchema)