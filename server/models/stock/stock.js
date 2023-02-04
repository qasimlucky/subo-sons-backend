const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    

    stock_id: {
    type: String,
    required: true,
    },
    stock_collection_index: {
    type: String,
    required: true,
    },
    book_title: {type: String,
    default: null
    },
    quantity: {type: String,
    default: null
    },
    whole_sale_price: {type: String,
    default: null
    },
    sale_price: {type: String,
    default: null
    },
    description: {type: String,
        default: null
    },
    auther : {type: String,
        default: null
    },
    stock_image : {type: String,
        default: null
    },
    stock_status : {type: String,
        default: 'Active'
    },
    partner: {type: Array},
    Publisher_name: {type: String,
        default: null
    },
    purchase_price: {type: String,
        default: null
    },
    isbn: {type: String,
        default: null
    },
    categories: {type: String,
        default: null
    },
    record_level: {type: String,
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

module.exports = mongoose.model('stock', StockSchema)