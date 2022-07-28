const router = require("express").Router();
const cartController = require("../controller/cartCtrl");

router.post("/add", cartController.addItemToCart);
router.post("/delete", cartController.deleteItemfromCart);
router.get("/", cartController.getCart);
router.put("/up", cartController.addItemToCart);
router.delete("/empty-cart", cartController.emptyCart);
module.exports = router;