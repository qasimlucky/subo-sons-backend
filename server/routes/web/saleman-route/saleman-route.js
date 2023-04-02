var router = require('express').Router();

const { 
    CreateSaleman,
    getSaleman,
    getSalemanTransaction
} = require('../../../controllers/web/saleman/saleman-controller');


router.post('/add',CreateSaleman);
router.get('/get',getSaleman);
router.post('/transaction',getSalemanTransaction);

module.exports = router;