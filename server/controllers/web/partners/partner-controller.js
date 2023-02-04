const express = require('express');
const app = express();
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");
const Partners = require('../../../models/partners/partner');
const Transaction = require('../../../models/partners/transaction');

// Get user

const CreatePartner = async function (req, res){    
    try {
        console.log("this is create partner")

        const {first_name,last_name,email,phone_number,percentage} = req.body
            const partnerList = await Partners.find();
            console.log(partnerList.length)
            if (partnerList.length ==0 ){
                partner_collection_index = 0;
                console.log(partner_collection_index)
            }else{
                Robject =partnerList.slice(-1).pop()
                partner_collection_index  =Robject.partner_collection_index ;
            }
            console.log(partner_collection_index)
            var partner_id = 'st-partner-'+(Number(partner_collection_index)+1);
                console.log(partner_id)
                partner_collection_index = (Number(partner_collection_index)+1)
            console.log(partner_collection_index)
            
            
            
            var partner = await Partners.create({
                partner_id,
                partner_collection_index,
                first_name,
                last_name,
                email,
                phone_number,
                percentage,
                partner_status:"Active",
                
            });


            res.status(200).json(success("Success",
                                            partner,
                                    res.statusCode));

    } catch (error) {   
    }
}

const getPartners = async function (req, res){    
    try {
        const partnerList = await Partners.find();
        res.send (partnerList)
    } catch (error) { 
        res.send(error)   
    }
}

const getPartnersTransaction = async function (req, res){    
    try {
        const{partner_id} = req.body;
        const partnerList = await Transaction.find({partner_id:partner_id});
        const arr = []
        const arr2 = []
        const bb= await Transaction.aggregate([
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
            if(e.partner_id == partner_id) {
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
                       var partners = c.partner
                       /* if(partners){
                        book_title_arr.push(c.book_title)
                       } */
                       for(const d of partners){
                          //res.send(d)
                        //console.log(d)
                            if(d.partner_id== partner_id){
                                //console.log(d)
                                var partner_name = d.first_name
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
                    partner_id :partner_id,
                    bill_id :bill_id,
                    total_profit :total_profit,
                    created_at : created_at,
                    bill_total : bill_total,
                    book_title_arr:book_title_arr,
                    percentage:percentage,
                    partner_name:partner_name,
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
    CreatePartner,
    getPartners,
    getPartnersTransaction
}