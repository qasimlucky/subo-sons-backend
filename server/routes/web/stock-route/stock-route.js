var router = require('express').Router();
const multer  = require('multer')
const path = require("path");

const { 
    createStock,
    getStock,
    editStock,
    stockstorage,
    getStockByAuther,
    getStockAuther,
    createStockCategories,
    getStockCategories,
    getCategoriesBooks,
    getCategoriesName

    
} = require('../../../controllers/web/stock/stock');

const maxSize = 1 * 1000 * 1000 *10000;
var RouteUploadStockImage = multer({ storage: stockstorage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }else{            
          cb("Error: File upload only supports the " + "following filetypes - " + filetypes); 
        }
      
        
      } 
}).single('file');


router.post('/add',RouteUploadStockImage,createStock);
router.get('/get',getStock);
router.post('/edit',RouteUploadStockImage,editStock);
router.post('/get/auther',getStockByAuther);
router.get('/get/authername',getStockAuther);
router.post('/add/categories',createStockCategories);
router.get('/get/categories',getStockCategories);
router.post('/get/categorybook',getCategoriesBooks);
router.get('/get/categoryname',getCategoriesName);



module.exports = router;