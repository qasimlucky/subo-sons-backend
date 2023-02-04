const express = require('express');
const app = express();
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");
const Dealers = require('../../../models/dealers/dealer');

// Get Dealer
const getDealer = async function (req, res){    
    try {
        const dealerList = await Dealers.find();
        res.send (dealerList)
    } catch (error) { 
        res.send(error)   
    }
}


// create user 
const createDealer = async function (req, res){    
    try {
        console.log("this is create user")
         console.log(req.body)
        const {first_name,last_name,email,phone_number,password,dealer_status} = req.body
            const dealerList = await Dealers.find();
            //console.log(dealerList.length)
            if (dealerList.length ==0 ){
                dealer_collection_index = 0;
                //console.log(dealer_collection_index)
            }else{
                Robject =dealerList.slice(-1).pop()
                dealer_collection_index  =Robject.dealer_collection_index ;
            }
            console.log(dealer_collection_index)
            var dealer_id = 'ss-dealer-'+(Number(dealer_collection_index)+1);
                //console.log(dealer_id)
                dealer_collection_index = (Number(dealer_collection_index)+1)
                //console.log(dealer_collection_index)
            
            
            
            var dealer = await Dealers.create({
                dealer_id,
                dealer_collection_index,
                first_name,
                last_name,
                email,
                phone_number,
                password
                
                
            });


            res.status(200).json(success("Success",
                                            dealer,
                                    res.statusCode));
    } catch (error) { 
        res.send(error)   
    }
}

 
// Edit dealer

const editDealer = async function (req, res){    
    try {
        const data = req.body;
        var cleanData = await CleanData(data);
        //console.log(req.session.user.user_id)
        //const user_id = req.session.user.user_id
        const {dealer_id,first_name,last_name,email,phone_number,password,dealer_status} = cleanData;
        const updatedDealer = await Dealers.findOneAndUpdate({dealer_id:dealer_id},{$set :{first_name:first_name,last_name:last_name,email:email,phone_number:phone_number,password:password,dealer_status:dealer_status}});

        const dealerList = await Dealers.find({dealer_id:dealer_id});
        res.send (dealerList)
    } catch (error) { 
        res.send(error)   
    }
}
  

module.exports = {
    createDealer,
    getDealer,
    editDealer
}