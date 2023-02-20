const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    
    purchase_id: {
    type: String,
    required: true,
    },
    purchase_collection_index: {
    type: String,
    required: true,
    },
    reference_number: {type: String,
    default: null
    },
    purchase_date: {type: String,
        default: null
    },
    supplier: {type: String,
    default: null
    },
    location: {type: String,
    default: null
    },
    purchase_status: {type: String,
    default: null
    },
    purchase_amount: {type: String,
        default: null
        },
    payment_status: {type: String,
        default: true
    },
    payment_due  : {type: String,
        default: null
    },
    purchase_tax  : {type: String,
        default: null
    },
    added_by  : {type: String,
        default: null
    },
    stock_item : {type: Array,
        default: null
    },
    total_stock_item : {type: String,
        default: null
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

module.exports = mongoose.model('purchase', PurchaseSchema)