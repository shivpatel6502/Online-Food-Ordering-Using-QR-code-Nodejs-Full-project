const Repository = require('../repostory')
const cart = require('../model/cart')
const table=require('../model/table')

const orderctrl = {

    //ordered placed
    updateStatus: async (req, res) => {
        try {
            const tblno = req.cookies.tabletoken;
            const ordst = req.body.ordst
            await cart.findOneAndUpdate({ table: tblno }, {
                ordsttus: ordst
            });

            await table.updateOne({_id:"628f68d4dc51f1f0e92858ff","tbl.tblno":`${tblno}`},{
                $inc : {"tbl.$.availst" : 1} 
            });

            res.status(200).json("data saved");


        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }

    },

    //payment 
    paymentStatus: async (req, res) => {
        try {
            const paymethod = req.params.id;
            const tblno = req.cookies.tabletoken;
            
            await cart.findOneAndUpdate({ table: tblno }, {
                paymentmethod:paymethod
            });

            if(paymethod==2){
                //code for onine payment
            }

            res.status(200).json("data saved");


        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }

    },

    //get cart detail
    cartdetail: async (req, res) => {
        try{
            const cartdetaile=await cart.find();
            res.send(cartdetaile)

        }catch (err) {
            res.status(400).json({
                err: err
            })
        }
    },

    //orderd completed
    orderedcomplete: async (req, res) => {
        try {
            const tblno = req.cookies.tabletoken
            await cart.findOneAndUpdate({ table: tblno }, {
                ordsttus: 2
            });

            res.status(200).json("orderd completed");


        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }

    },
}

module.exports = orderctrl;