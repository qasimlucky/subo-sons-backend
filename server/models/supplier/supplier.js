const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    

    supplier_id: {
    type: String,
    required: true,
    },
    supplier_collection_index: {
    type: String,
    required: true,
    },
    first_name: {type: String,
    default: null
    },
    last_name: {type: String,
    default: null
    },
    email: {type: String,
    default: null
    },
    phone_number: {type: String,
    default: null
    },
    password: {type: String,
        default: null
    },
    supplier_status : {type: Boolean,
        default: true
    },
    account_balance : {type: String,
        default: "0"
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

module.exports = mongoose.model('suppliers', SupplierSchema)