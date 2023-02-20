const mongoose = require('mongoose');

const AgentTransactionSchema = new mongoose.Schema({   
  agent_transaction_id: {
    type: String,
    required: true,
  },
  agent_transaction_collection_index: {
    type: String,
    required: true,
  },
  bill_id: {type: String,
    default: null
  },
  commission_amount: {type: String,
    default: null
  },
  commission_percentage: {type: String,
    default: null
  },
  agent_id: {type: String,
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

module.exports = mongoose.model('agent_transactions', AgentTransactionSchema)