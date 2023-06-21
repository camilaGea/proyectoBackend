import {getAllProducts, getRealTimeProducts, getCarts} from '../services/views.services.js'

export const realtimeproducts =async (req, res) => {
    const productos = await getRealTimeProducts()
    res.render("realTimeProducts", {productos});
}

export const chat = async (req,res) => {
    res.render('chat', {})
}

export const register = async (req,res) => {
    res.render('register')
}

export const login = async (req, res) => {
    res.render('login')
}

export const products = async (req,res) => {
    //para visualizar todos los productos con su respectiva paginación.
    let { limit,page = 1,category,disp,sort } = req.query;
    const productos = await getAllProducts(limit,page,category,disp,sort);
    res.render('products', {productos});
}

export const cart = async (req, res) => {
    //para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 
    let id = req.params.cid;
    let cart = await getCarts(id)
    res.render('cart', {cart});
}