import CartMongo from "../dao/managerMongo/cartMongo.js"

export const carts = new CartMongo()

export const getAllCartById = async (id) => {
    const cart = await carts.getCartById(id);
    return cart
}

export const newCart = async () => {
    const cart = await carts.addCart();
    return cart
}

export const newProductInCart = async (cid, pid) => {
    const result = await carts.addProductInCart(cid,pid);
    return result
}

export const deleteProductCart = async (cid,pid) => {
    const result = await carts.deleteProductInCart(cid,pid);
    return result
}

export const updateProductInCartByCant = async (cid, products) => {
    const result = await carts.updateProductInCart(cid, products);
    return result
}

export const updateCantProductInCart = async (cid, pid, quantity) => {
    const result = await carts.updateQtyProductInCart(cid, pid, quantity);
    return result
}

export const deleteProductsCart = async (cid) => {
    const result = await carts.deleteProductsInCart(cid);
    return result 
}