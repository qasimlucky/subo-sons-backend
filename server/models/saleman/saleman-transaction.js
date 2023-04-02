const mongoose = require('mongoose');

const SalemanTransactionSchema = new mongoose.Schema({   
  saleman_transaction_id: {
    type: String,
    required: true,
  },
  saleman_transaction_collection_index: {
    type: String,
    required: true,
  },
  bill_id: {type: String,
    default: null
  },
  total_profit: {type: String,
    default: null
  },
  saleman_id: {type: String,
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

module.exports = mongoose.model('sale_transactions', SalemanTransactionSchema)