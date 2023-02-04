var router = require('express').Router();

const { 
    getBill,
    createBill,
    deleteBill
    
} = require('../../../controllers/web/bills/bill-controllers');


router.get('/get',getBill);
router.post('/add',createBill);
router.post('/delete',deleteBill);

module.exports = router;