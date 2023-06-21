import ProductManagerMongo from "../dao/managerMongo/productMongo.js";
import {carts} from "../services/cart.services.js"
const pm = new ProductManagerMongo();

export const getAllProducts = async (limit,page,category,disp,sort)=>{
    const products = await pm.getProducts(limit,page,category,disp,sort)
    return products
}

export const getRealTimeProducts = async () => {
    const products = await pm.getP()
    return products
}

export const getCarts = async (id)=> {
    let cart = await carts.getCartById(id)
    return cart
}