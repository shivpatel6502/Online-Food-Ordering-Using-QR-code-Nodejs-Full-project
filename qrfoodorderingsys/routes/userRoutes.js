const router = require('express').Router();
const userctrl=require('../controller/userCtrl')

router.post('/register',userctrl.register)
router.post('/login',userctrl.login)
router.post('/refresh_token', userctrl.getAccessToken)
router.get('/logout',userctrl.logout)

module.exports=router;