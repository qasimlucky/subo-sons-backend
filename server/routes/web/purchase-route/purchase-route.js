var router = require('express').Router();

const { 
    CreatePurchase,
} = require('../../../controllers/web/purchase/purchase-controller');


router.post('/add',CreatePurchase);

module.exports = router;