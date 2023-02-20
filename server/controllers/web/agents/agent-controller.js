const express = require('express');
const app = express();
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");
const Agents = require('../../../models/agent/agent');
const AgentTransaction = require('../../../models/agent/aget-transaction')

const getAgents = async function (req, res){    
    try {
        const agentList = await Agents.find();
        res.send (agentList)
    } catch (error) { 
        res.send(error)   
    }
}

const CreateAgent = async function (req, res){    
    try {
        console.log("this is create Agent")
         console.log(req.body)
        const {first_name,last_name,email,phone_number,password} = req.body
            const AgentList = await Agents.find();
            //console.log(dealerList.length)
            if (AgentList.length ==0 ){
                agent_collection_index = 0;
                //console.log(dealer_collection_index)
            }else{
                Robject =AgentList.slice(-1).pop()
                agent_collection_index  =Robject.agent_collection_index ;
            }
            console.log(agent_collection_index)
            var agent_id = 'ss-agent-'+(Number(agent_collection_index)+1);
                //console.log(dealer_id)
                agent_collection_index = (Number(agent_collection_index)+1)
                //console.log(dealer_collection_index)
            
            
            
            var agent = await Agents.create({
                agent_id,
                agent_collection_index,
                first_name,
                last_name,
                email,
                phone_number,
                password
                
                
            });


            res.status(200).json(success("Success",
                                            agent,
                                    res.statusCode));
    } catch (error) { 
        res.send(error)   
    }
}

const editAgent = async function (req, res){    
    try {
        const data = req.body;
        var cleanData = await CleanData(data);
        //console.log(req.session.user.user_id)
        //const user_id = req.session.user.user_id
        const {agent_id,first_name,last_name,email,phone_number,password,commission_amount} = cleanData;
        const updatedDealer = await Agents.findOneAndUpdate({agent_id:agent_id},{$set :{first_name:first_name,last_name:last_name,email:email,phone_number:phone_number,password:password,commission_amount:commission_amount}});

        const agentList = await Agents.find({agent_id:agent_id});
        res.send (agentList)
    } catch (error) { 
        res.send(error)   
    }
}

const getAgentTransaction = async function (req, res){    
    try {
        const{agent_id} = req.body;
        const arr = []
        const arr2 = []

        const bb= await AgentTransaction.aggregate([
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
                if(e.agent_id== agent_id){
                    var orders = e.orders;
                    var bill_id = e.bill_id
                    var created_at = e.created_at
                    var commission_percentage = e.commission_percentage
                    var commission_amount = e.commission_amount
                    console.log(created_at)
                    for (const b of orders){
                        //console.log(b)
                        var bill_total  = b.bill_total
                        var bill_items = b.bill_items
                        var book_title_arr = []
                        var quantity = [] 

                        for (const c of bill_items) {
                            book_title_arr.push(c.book_title)
                            quantity.push(c.sell_quantity)
                        }
                    }
                    console.log(bill_id)
                    var obj=  {
                        agent_id :agent_id,
                        bill_id :bill_id,
                        bill_total :bill_total,
                        created_at : created_at,
                        book_title_arr:book_title_arr,
                        commission_amount:commission_amount,
                        books_quantity:quantity,
                        commission_percentage:commission_percentage
                    }  
                    arr2.push(obj)
                }


           } 
        res.send (arr2)
    } catch (error) { 
        res.send(error)   
    }
}



module.exports = {
    CreateAgent,
    getAgents,
    editAgent,
    getAgentTransaction
}