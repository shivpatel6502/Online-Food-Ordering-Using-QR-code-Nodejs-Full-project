const router = require('express').Router();
const menuct=require('../controller/menuCtrl');


router.post('/add',menuct.create);
router.get('/get',menuct.findall);
router.get('/:id',menuct.findOne);
router.put('/:id',menuct.update);
router.delete('/:id',menuct.delete);

module.exports=router;