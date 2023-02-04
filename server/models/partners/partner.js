const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({   
  partner_id: {
    type: String,
    required: true,
  },
  partner_collection_index: {
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
    default: null},
   percentage: {type: String,
        default: null
      },
  account_balance: {type: String,
    default: "0"
  },
    partner_status : {type: String,
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

module.exports = mongoose.model('partners', PartnerSchema)