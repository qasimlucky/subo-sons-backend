const express = require('express');
const app = express();
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");
const Suppliers = require("../../../models/supplier/supplier")

const getSuppliers = async function (req, res){    
    try {
        const supplierList = await Suppliers.find();
        res.send (supplierList)
    } catch (error) { 
        res.send(error)   
    }
}


const CreateSupplier = async function (req, res){    
    try {
        console.log("this is create Supplier")
         console.log(req.body)
        const {first_name,last_name,email,phone_number,password} = req.body
            const SupplierList = await Suppliers.find();
            //console.log(dealerList.length)
            if (SupplierList.length ==0 ){
                supplier_collection_index = 0;
                //console.log(dealer_collection_index)
            }else{
                Robject =SupplierList.slice(-1).pop()
                supplier_collection_index  =Robject.supplier_collection_index ;
            }
           // console.log(agent_collection_index)
            var supplier_id = 'ss-supplier-'+(Number(supplier_collection_index)+1);
                //console.log(dealer_id)
                supplier_collection_index = (Number(supplier_collection_index)+1)
                //console.log(dealer_collection_index)
            
            
            
            var supplier = await Suppliers.create({
                supplier_id,
                supplier_collection_index,
                first_name,
                last_name,
                email,
                phone_number,
                password
                
                
            });


            res.status(200).json(success("Success",
                                        supplier,
                                    res.statusCode));
    } catch (error) { 
        res.send(error)   
    }
}

const editSupplier = async function (req, res){    
    try {
        const data = req.body;
        var cleanData = await CleanData(data);
        //console.log(req.session.user.user_id)
        //const user_id = req.session.user.user_id
        const {supplier_id,first_name,last_name,email,phone_number,password} = cleanData;
        const updatedDealer = await Suppliers.findOneAndUpdate({supplier_id:supplier_id},{$set :{first_name:first_name,last_name:last_name,email:email,phone_number:phone_number,password:password}});

        const agentList = await Suppliers.find({supplier_id:supplier_id});
        res.send (agentList)
    } catch (error) { 
        res.send(error)   
    }
}

module.exports = {
    CreateSupplier,
    getSuppliers,
    editSupplier
}
