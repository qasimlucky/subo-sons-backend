const express = require('express');
const app = express();
const multer  = require('multer')
const path = require("path");
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");
const Stock = require('../../../models/stock/stock');
const Percentage = require('../../../models/partners/partner-percentage')
const Stock_Categories = require('../../../models/stock/categories')


// Get stock
const getStock = async function (req, res){    
    try {
        
        const stockList = await Stock.find();
        res.send (stockList)
    } catch (error) { 
        res.send(error)   
    }
} 
const getStockByAuther = async function (req, res){    
    try {
        const {auther} = req.body
        const stockList = await Stock.find({auther:auther});
        res.send (stockList)
    } catch (error) { 
        res.send(error)   
    }
} 

var stockstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "server/public/stock")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now()+".jpg");
        var filePath = file.fieldname + "-" + Date.now()+".jpg";
    } 
});

// create stock 
const createStock = async function (req, res){    
    try {
        console.log(req.file)
        console.log(req.body)
        console.log("this is create stock")
        console.log(req.body)
        const  partner = JSON.parse(req.body.partner)
        const {book_title,quantity,whole_sale_price,sale_price,description,auther,Publisher_name,purchase_price,isbn,categories,record_level} = req.body
        const stockList = await Stock.find();
        if (stockList.length ==0 ){
            stock_collection_index = 0;
        }else{
            Robject =stockList.slice(-1).pop()
            stock_collection_index  =Robject.stock_collection_index ;
        }
        var stock_id = 'ss-stock-'+(Number(stock_collection_index)+1);
            stock_collection_index = (Number(stock_collection_index)+1)
            if(req.file){
                const stock_image =("https://subo-sons-backend.onrender.com/static"+req.file.filename);
                var stock = await Stock.create({
                    stock_id,
                    stock_collection_index,
                    book_title,
                    quantity,
                    whole_sale_price,
                    sale_price,
                    description,
                    auther ,
                    stock_image,
                    partner,
                    Publisher_name,
                    purchase_price,
                    isbn,
                    categories,
                    record_level            
                });
            }else{
                var stock = await Stock.create({
                    stock_id,
                    stock_collection_index,
                    book_title,
                    quantity,
                    whole_sale_price,
                    sale_price,
                    description,
                    auther,
                    partner,
                    Publisher_name,
                    purchase_price,
                    isbn,
                    categories,
                    record_level   
                });
            }

            if(stock){
                const percentageList = await Percentage.find();
                console.log(percentageList)
                if (percentageList.length ==0 ){
                    percentage_collection_index = 0;
                }else{
                    Robject =percentageList.slice(-1).pop()
                    percentage_collection_index  =Robject.percentage_collection_index ;
                }
                console.log(percentage_collection_index)
                var percentage_id = 'ss-%-'+(Number(percentage_collection_index)+1);
                percentage_collection_index = (Number(percentage_collection_index)+1)
                console.log(percentage_collection_index)
                var percentage = await Percentage.create({
                    percentage_id,
                    percentage_collection_index,
                    stock_id,
                    partner              
                });
            }
            console.log(percentage)

            



            res.status(200).json(success("Success",
                                            stock,
                                    res.statusCode));
    } catch (error) { 
        res.send(error)   
    }
}

 
// Edit dealer

 const editStock = async function (req, res){    
    try {
        
        if(req.file){
            const  partner = JSON.parse(req.body.partner)
            console.log("this is req.file")
            const stock_image =("https://subo-sons-backend.onrender.com/static/"+req.file.filename);
            const data = req.body;
            //var cleanData = await CleanData(data);
            const {stock_id,book_title,quantity,whole_sale_price,sale_price,description,auther,Publisher_name,purchase_price,isbn,categories,record_level} = req.body;
            const updatedDealer = await Stock.findOneAndUpdate({stock_id:stock_id},{$set :{book_title:book_title,quantity:quantity,purchase_price:purchase_price,sale_price:sale_price,description:description,auther:auther,stock_image:stock_image,whole_sale_price:whole_sale_price,Publisher_name:Publisher_name,purchase_price:purchase_price,isbn:isbn,categories:categories,record_level:record_level,partner:partner}});
            const stockList = await Stock.find({stock_id:stock_id});
            res.send (stockList)

        }else{
            console.log("!this is req.file")
            //const data = req.body;
            //var cleanData = await CleanData(data);
            console.log(req.body)
            //const  partner = JSON.parse(req.body.partner)
            if(req.body.partner == undefined){
                const {stock_id,book_title,quantity,whole_sale_price,sale_price,description,auther,Publisher_name,isbn,record_level,purchase_price,categories} = req.body;
                const updatedDealer = await Stock.findOneAndUpdate({stock_id:stock_id},{$set :{book_title:book_title,quantity:quantity,purchase_price:purchase_price,sale_price:sale_price,description:description,auther:auther,whole_sale_price:whole_sale_price,Publisher_name:Publisher_name,isbn:isbn,categories:categories,record_level:record_level}});
                const stockList = await Stock.find({stock_id:stock_id});
                res.send (stockList)
            }else{
                const  partner = JSON.parse(req.body.partner)
                const {stock_id,book_title,quantity,whole_sale_price,sale_price,description,auther,Publisher_name,isbn,record_level,purchase_price,categories} = req.body;
                const updatedDealer = await Stock.findOneAndUpdate({stock_id:stock_id},{$set :{book_title:book_title,quantity:quantity,purchase_price:purchase_price,sale_price:sale_price,description:description,auther:auther,whole_sale_price:whole_sale_price,Publisher_name:Publisher_name,isbn:isbn,categories:categories,record_level:record_level,partner:partner}});
                const stockList = await Stock.find({stock_id:stock_id});
                res.send (stockList)
            }

        }

    } catch (error) { 
        res.send(error)   
    }
}

// categories 
const createStockCategories = async function (req, res){    
    try {
        console.log("this is create category")
        const {categories_title} = req.body;
        console.log(req.body)
        const categoriesList = await Stock_Categories.find();
        console.log(categoriesList)
        if (categoriesList.length ==0 ){
            categories_collection_index = 0;
        }else{
            Robject =categoriesList.slice(-1).pop()
            categories_collection_index  =Robject.categories_collection_index ;
        }
        var categories_id = 's-category-'+(Number(categories_collection_index)+1);
        categories_collection_index = (Number(categories_collection_index)+1)
        console.log(categories_id)
        console.log(categories_collection_index)

                var stock_categories = await Stock_Categories.create({
                    categories_id,
                    categories_collection_index,
                    categories_title,             
                    
                });

                res.send(stock_categories)

    } catch (error) { 
        res.send(error)   
    }
}

const getStockCategories = async function (req, res){    
    try {
        const stockCategoriesList = await Stock_Categories.find();
        res.send(stockCategoriesList)
    } catch (error) { 
        res.send(error)   
    }
} 

//
const getStockAuther = async function (req, res){    
    try {
        const requiredAuther= [];
       const stockList = await Stock.find();
       for (let i = 0; i < stockList.length; i++) {
        const exists = requiredAuther.findIndex(element => element.auther === stockList[i].auther) > -1;
        if(!exists){
            requiredAuther.push(stockList[i])
        }
                  
        }
      
       res.send(requiredAuther)
    } catch (error) { 
        res.send(error)   
    }
} 

const getCategoriesBooks = async function (req, res){    
    try {
        const {categories} = req.body
        const stockList = await Stock.find({categories:categories});
        res.send (stockList)
    } catch (error) { 
        res.send(error)   
    }
}

const getCategoriesName = async function (req, res){    
    try {
        const requiredCategories= [];
       const stockList = await Stock.find();
       for (let i = 0; i < stockList.length; i++) {
        const exists = requiredCategories.findIndex(element => element.categories === stockList[i].categories) > -1;
        if(!exists){
            requiredCategories.push(stockList[i])
        }
                  
        }
      
       res.send(requiredCategories)
    } catch (error) { 
        res.send(error)   
    }
}
module.exports = {
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

}