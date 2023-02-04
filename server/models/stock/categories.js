const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    

    categories_id: {
    type: String,
    required: true,
    },
    categories_collection_index: {
    type: String,
    required: true,
    },
    categories_title: {type: String,
        default: null
    },
    categories_status : {type: String,
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

module.exports = mongoose.model('stock_categories', CategoriesSchema)