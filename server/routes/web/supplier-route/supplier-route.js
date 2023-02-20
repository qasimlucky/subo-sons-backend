var router = require('express').Router();
const { 
    CreateSupplier,
    getSuppliers,
    editSupplier
} = require('../../../controllers/web/supplier/supplier-controller');


router.post('/add',CreateSupplier);
router.get('/get',getSuppliers);
router.post('/edit',editSupplier);

module.exports = router;