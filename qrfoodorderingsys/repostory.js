const Cart = require("./model/cart");
const Menu = require("./model/menu");

exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total"
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}

exports.products = async () => {
    const menus = await Menu.find();
    return menus;
};
exports.productById = async id => {
    const menu = await Menu.findById(id);
    return menu;
}
exports.createProduct = async payload => {
    const newmenu= await Menu.create(payload);
    return newmenu;
}
exports.removeProduct = async id => {
    const menu = await Menu.findByIdAndRemove(id);
    return menu
}