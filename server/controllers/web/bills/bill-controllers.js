const express = require('express');
const app = express();
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");
const Bills = require('../../../models/bill/bill');
const Stock = require('../../../models/stock/stock');
const Partners = require('../../../models/partners/partner');
const Transaction = require('../../../models/partners/transaction');

// Get user

    const getBill = async function (req, res){    
        try {
            const billList = await Bills.find();
            res.send(billList)
            console.log("this is getbiil")
        } catch (error) { 
            res.send(error)   
        }
    }

// create user 

    const createBill = async function (req, res){ 
        try {
            console.log("this is create Bill")
            //console.log(req.body)

            const {bill_total,bill_discount,bill_tax,bill_shipping,bill_items,partner} = req.body
                const billList = await Bills.find();
                //console.log(billList.length)
                if (billList.length ==0 ){
                    bill_collection_index = 0;
                    //console.log(bill_collection_index)
                }else{
                    Robject =billList.slice(-1).pop()
                    bill_collection_index  =Robject.bill_collection_index ;
                }
               // console.log(bill_collection_index)
                var bill_id = 'st-bill-'+(Number(bill_collection_index)+1);
                    //console.log(bill_id)
                    bill_collection_index = (Number(bill_collection_index)+1)
                //console.log(bill_collection_index)
                
                
                
            var bill = await Bills.create({
                    bill_id,
                    bill_collection_index,
                    bill_total,
                    bill_discount,
                    bill_tax,
                    bill_shipping,
                    bill_items,
                    
                }); 

                for (let i = 0; i < bill_items.length; i++) {
                    var status_stock_id =(bill_items[i].stock_id);
                    var record_level = bill_items[i].record_level
                    var total_quantity_stock =(bill_items[i].quantity)
                    var sell_quantity = (bill_items[i].sell_quantity)
                    var change_quantity = total_quantity_stock-sell_quantity;
                    var stock_id_change = (bill_items[i].stock_id)
                    if(change_quantity >=record_level){
                        const updatedDealer = await Stock.findOneAndUpdate({stock_id:stock_id_change},{$set :{quantity:change_quantity}});
                        //console.log(change_quantity)
                    }else{
                        const updatedDealer = await Stock.findOneAndUpdate({stock_id:stock_id_change},{$set :{quantity:change_quantity,stock_status:"InActive" }});
                        ///console.log(change_quantity)
                    }

                  }

                  for (let i = 0; i < bill_items.length; i++) {
                    //console.log(bill_items[i])
                    var profit_price = ((bill_items[i].whole_sale_price)-(bill_items[i].purchase_price))
                    var book_partners =  bill_items[i].partner
                    for (let i = 0; i < book_partners.length; i++) {

                        const transactionList = await Transaction.find();
                        //console.log(billList.length)
                        if (transactionList.length ==0 ){
                            transaction_collection_index = 0;
                            //console.log(bill_collection_index)
                        }else{
                            Robject =transactionList.slice(-1).pop()
                            transaction_collection_index  =Robject.transaction_collection_index ;
                        }
                       // console.log(bill_collection_index)
                        var transaction_id = 'st-trans-'+(Number(transaction_collection_index)+1);
                            //console.log(bill_id)
                            transaction_collection_index = (Number(transaction_collection_index)+1)
                        //console.log(bill_collection_index)
                        var partner_id = book_partners[i].partner_id;
                        console.log(bill_id)

                        var percentage = book_partners[i].percentage
                        var accountBalance = ((percentage/100)*profit_price)

                        var transaction = await Transaction.create({
                            transaction_id,
                            transaction_collection_index,
                            bill_id,
                            total_profit:accountBalance,
                            partner_id  
                        }); 
                        // acoount balance in partner account

                        const list = await Partners.find({partner_id:partner_id});
                        var preAccountBalance = list[0].account_balance
                        console.log(list[0].account_balance)
                        console.log("this is pre balance")
                        //console.log(preAccountBalance)
                        if(preAccountBalance){
                            var account_balance = (parseInt(preAccountBalance)+parseInt(accountBalance))
                        }else{
                            var account_balance = accountBalance
                        }
                        const updatedPatnerAccount = await Partners.findOneAndUpdate({partner_id:partner_id},{$set :{account_balance:account_balance}});
                        console.log("this is pre balance")
                        //console.log(account_balance)

                    }
                  }
                  
                  //console.log(partner)



                res.status(200).json(success("Success",
                                                bill,
                                        res.statusCode));
        } catch (error) { 
            res.send(error)   
        }
    }
 
    const deleteBill = async function (req, res){    
        try {
            console.log(req.body)
            const {bill_id} = req.body
            const updatedDealer = await Bills.findOneAndUpdate({bill_id:bill_id},{$set :{bill_status:"InActive" }});
            const billList = await Bills.find();
            res.send(billList)
        } catch (error) { 
            res.send(error)   
        }
    }

module.exports = {
    getBill,
    createBill,
    deleteBill
}