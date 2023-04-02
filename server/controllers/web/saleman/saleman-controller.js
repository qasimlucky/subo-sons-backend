const express = require('express');
const app = express();
const { success, error, validation } = require("../../../helpers/apiResponse");
const Saleman = require('../../../models/saleman/saleman');
const SalemanTransaction = require('../../../models/saleman/saleman-transaction');

// Get user

const CreateSaleman = async function (req, res){    
    try {
        console.log("this is create Saleman")

        const {first_name,last_name,email,phone_number,percentage} = req.body
            const salemanList = await Saleman.find();
            console.log(salemanList.length)
            if (salemanList.length ==0 ){
                saleman_collection_index = 0;
                console.log(saleman_collection_index)
            }else{
                Robject =salemanList.slice(-1).pop()
                saleman_collection_index  =Robject.saleman_collection_index ;
            }
            
            var saleman_id = 'st-saleman-'+(Number(saleman_collection_index)+1);
                console.log(saleman_id)
                saleman_collection_index = (Number(saleman_collection_index)+1)
            console.log(saleman_collection_index)
            
            
            
            var saleman = await Saleman.create({
                saleman_id,
                saleman_collection_index,
                first_name,
                last_name,
                email,
                phone_number,
                percentage,
                saleman_status:"Active",
                
            });


            res.status(200).json(success("Success",
                                            saleman,
                                    res.statusCode));

    } catch (error) {   
    }
}

const getSaleman = async function (req, res){    
    try {
        const salemanList = await Saleman.find();
        res.send (salemanList)
    } catch (error) { 
        res.send(error)   
    }
}


const getSalemanTransaction = async function (req, res){    
    try {
        const{saleman_id} = req.body;
        const partnerList = await SalemanTransaction.find({saleman_id:saleman_id});
        const arr = []
        const arr2 = []
        const bb= await SalemanTransaction.aggregate([
            { $lookup:
             {
                from: "bills",
                localField: "bill_id",
                foreignField: "bill_id",
                as: "orders"
             }
           }
           ])

           for(const e of bb){
            if(e.saleman_id == saleman_id) {
                var bill_id = e.bill_id;
               // var total_profit = e.total_profit;
               var total_profit  =0;
                var created_at = e.created_at;
                var orders = e.orders
               // console.log(orders)
                for (const b of orders){
                    //console.log(b)
                    var bill_total  = b.bill_total
                    var bill_items = b.bill_items
                    var book_title_arr = []
                    var percentage = [] 
                    var each_book_profit = []
                    for (const c of bill_items) {
                         
                       console.log(c)
                       var salemans = c.saleman
                       /* if(partners){
                        book_title_arr.push(c.book_title)
                       } */
                       for(const d of salemans){
                          //res.send(d)
                        //console.log(d)
                            if(d.saleman_id== saleman_id){
                                //console.log(d)
                                var saleman_name = d.first_name
                                var eachBookProfitAmount = (parseInt(c.whole_sale_price)-parseInt(c.purchase_price))
                                console.log(parseInt(c.purchase_price))
                                console.log(parseInt(c.whole_sale_price))
                                var currentPartnerprofit = (((d.percentage)/100)*eachBookProfitAmount)
                                book_title_arr.push(c.book_title)
                                var total_profit = (total_profit+currentPartnerprofit);
                                each_book_profit.push(currentPartnerprofit)
                                percentage.push(d.percentage)
                                //console.log(d.percentage) 
                            }
                       }

                    }
                    //console.log(percentage)
                    
                }
                //console.log(book_title_arr)
                var obj=  {
                    saleman_id :saleman_id,
                    bill_id :bill_id,
                    total_profit :total_profit,
                    created_at : created_at,
                    bill_total : bill_total,
                    book_title_arr:book_title_arr,
                    percentage:percentage,
                    saleman_name:saleman_name,
                    each_book_profit:each_book_profit


                }
                arr.push(e)
                arr2.push(obj)
            }
        }

        //console.log(arr2)
        res.send(arr2)
    } catch (error) { 
        res.send(error)   
    }
}


module.exports = {
    CreateSaleman,
    getSaleman,
    getSalemanTransaction
}