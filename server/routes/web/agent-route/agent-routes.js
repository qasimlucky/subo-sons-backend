var router = require('express').Router();
const { 
    CreateAgent,
    getAgents,
    editAgent,
    getAgentTransaction
} = require('../../../controllers/web/agents/agent-controller');


router.post('/add',CreateAgent);
router.get('/get',getAgents);
router.post('/edit',editAgent);
router.post('/transaction',getAgentTransaction);

module.exports = router;