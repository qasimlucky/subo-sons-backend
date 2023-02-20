const express = require('express');
const app = express();
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");
const Purchase = require('../../../models/purchase/purchase');
const Stock = require('../../../models/stock/stock');

const CreatePurchase = async function (req, res){    
    try {
        console.log("this is create Purchase")

            const {reference_number,purchase_date,supplier,location,purchase_status,purchase_amount,payment_status,stock_item,total_stock_item} = req.body
            console.log(req.body)
            const purchaseList = await Purchase.find();
            console.log(purchaseList.length)
            if (purchaseList.length ==0 ){
                purchase_collection_index = 0;
                console.log(purchase_collection_index)
            }else{
                Robject =purchaseList.slice(-1).pop()
                purchase_collection_index  =Robject.purchase_collection_index ;
            }
            console.log(purchase_collection_index)
            var purchase_id = 'st-purchase-'+(Number(purchase_collection_index)+1);
                console.log(purchase_id)
                purchase_collection_index = (Number(purchase_collection_index)+1)
                console.log(purchase_collection_index)
            
            
            var purchase = await Purchase.create({
                purchase_id,
                purchase_collection_index,
                reference_number,
                purchase_date,
                supplier,
                location,
                purchase_amount,
                payment_status,
                purchase_status,
                stock_item,
                total_stock_item
                
            });

            for (let i = 0; i < stock_item.length; i++) {
                //console.log(stock_item[i].stock_id)
                var stock_id = stock_item[i].stock_id;
                const currentStockItem = await Stock.find({stock_id:stock_id});
                console.log(currentStockItem)
                console.log(currentStockItem[0].quantity)
               var change_quantity = (parseInt(currentStockItem[0].quantity) +parseInt(stock_item[i].quantity))
               var whole_sale_price = stock_item[i].whole_sale_price;
               var sale_price = stock_item[i].sale_price
               var purchase_price = stock_item[i].purchase_price
               const updatedDealer = await Stock.findOneAndUpdate({stock_id:stock_id},{$set :{quantity:change_quantity,whole_sale_price:whole_sale_price,sale_price:sale_price,purchase_price:purchase_price }});
            }




            res.status(200).json(success("Success",
                                            purchase,
                                    res.statusCode));

    } catch (error) {   
    }
}


module.exports = {
    CreatePurchase
}