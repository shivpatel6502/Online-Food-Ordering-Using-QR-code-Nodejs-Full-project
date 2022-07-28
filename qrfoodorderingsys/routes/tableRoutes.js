const router = require('express').Router();
const tablectr=require('../controller/tableCtrl');

router.post('/',tablectr.codegn);
router.post('/rfresh',tablectr.refresh)
router.post('/cv',tablectr.codevalid)
router.get('/get',tablectr.get)

module.exports=router;