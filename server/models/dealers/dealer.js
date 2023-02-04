const mongoose = require('mongoose');

const DealerSchema = new mongoose.Schema({
    

    dealer_id: {
    type: String,
    required: true,
    },
    dealer_collection_index: {
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
    dealer_status : {type: Boolean,
        default: true
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

module.exports = mongoose.model('dealers', DealerSchema)