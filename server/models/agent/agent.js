const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    

    agent_id: {
    type: String,
    required: true,
    },
    agent_collection_index: {
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
    agent_status : {type: Boolean,
        default: true
    },
    commission_amount : {type: String,
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

module.exports = mongoose.model('agents', AgentSchema)