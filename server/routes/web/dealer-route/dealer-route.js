var router = require('express').Router();

const { 
    createDealer,
    getDealer,
    editDealer
    
} = require('../../../controllers/web/dealers/dealer-controller');


router.post('/add',createDealer);
router.get('/get',getDealer);
router.post('/edit',editDealer);

module.exports = router;