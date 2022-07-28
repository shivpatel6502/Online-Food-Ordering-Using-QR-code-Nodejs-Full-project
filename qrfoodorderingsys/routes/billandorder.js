const router = require('express').Router();
const orderctrl=require('../controller/billandorderctrl');
const { route } = require('./cartRoutes');

//ordered place
router.post('/',orderctrl.updateStatus);

//get all cart detail
router.get('/',orderctrl.cartdetail);

//payment flag
router.post('/p/:id',orderctrl.paymentStatus);

//ordered dones
router.put('/',orderctrl.orderedcomplete);

module.exports=router;