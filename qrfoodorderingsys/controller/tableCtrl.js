const { model } = require('mongoose');
const Table = require('../model/table')
const jwt = require('jsonwebtoken');

const tablectr = {

    //give intial value to model
    codegn: async (req, res) => {
        try {
            const code = req.body.code;
            const tbl = req.body.tbl;

            const tblobj = new Table({
                code,
                tbl
            });

            await tblobj.save();
            res.send("data saved")

        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }

    },

    //admin refresh whenever they need to change code
    refresh: async (req, res) => {
        try {
            const code = req.body.code;
            const id = req.body.id;
            await Table.findOneAndUpdate({ _id: id }, {
                code
            });

            res.json({ msg: "code updated successfully!" });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    codevalid: async (req, res) => {
        try {
            const code = req.body.code;
            const id = req.body.id;
            const no = req.body.no;
            const table = await Table.findById({ _id: id });
            console.log(table.tbl[no-1].availst)
            if (code != table.code) {
                return res.status(400).json({ msg: 'Please enter valid code' });
            }else if (!no) {
                return res.status(400).json({ msg: 'Please select table no' });
            }else if(table.tbl[no-1].availst == 1){
                return res.status(400).json({ msg: 'table is not available' });
            }
            else {
                const tablnobr = table.tbl[no - 1].tblno
                res.cookie('tabletoken', tablnobr, {
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 2 hour
                });

                return res.status(200).json({ msg: "data saved in cookie" });
            }
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },
    //send table no from cookie
    get:async (req,res)=>{
        res.send(req.cookies.tabletoken)
    }

}


module.exports = tablectr;
