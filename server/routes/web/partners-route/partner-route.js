var router = require('express').Router();

const { 
    CreatePartner,
    getPartners,
    getPartnersTransaction
} = require('../../../controllers/web/partners/partner-controller');


router.post('/add',CreatePartner);
router.get('/get',getPartners);
router.post('/transaction',getPartnersTransaction);

module.exports = router;