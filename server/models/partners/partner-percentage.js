const mongoose = require('mongoose');

const PercentageSchema = new mongoose.Schema({   
  percentage_id: {
    type: String,
    required: true,
  },
  percentage_collection_index: {
    type: String,
    required: true,
  },
  stock_id: {type: String,
    default: null
  },
  partner: {type: Array},
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

module.exports = mongoose.model('percentages', PercentageSchema)