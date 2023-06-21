import {newCart, getAllCartById, newProductInCart, deleteProductCart, updateProductInCartByCant, updateCantProductInCart, deleteProductsCart} from  '../services/cart.services.js'
import {getAllProductsById} from '../services/products.services.js'

export const getCartById = async (req,res) => {
    try{
        const id = req.params.cid
        const cart = await getAllCartById(id);
        res.send(cart);
    }catch(error){
        res.status(500).send({status:"error", error:error.message})
    }
}

export const postCart = async (req,res) => {
    try {
        const carrito = await newCart();
        //console.log(carrito._id.toString())
        res.status(201).send({status:"sucess", carrito})
    } catch (error) {
        res.status(500).send({status:"error", error:error.message})
    }    
}

export const postProductByCart = async (req, res) => {
    try{
        const cid =  req.params.cid;
        const pid = req.params.pid;
        
        const product = await getAllProductsById(pid)
        const cart = await getAllCartById(cid);
    
        if(!cart || cart.status === "error"){
            return res.status(404).send({status: "error", error: `No existe el carrito id ${cid}` })
        }
        if(!product || product.status === "error"){
            return res.status(404).send({status: "error", error: `No existe el producto id ${pid}` })
        }
    
        const result = await newProductInCart(cid,pid);
        res.status(200).send({status:"sucess", result})
    
    }catch (error) {
        res.status(500).send({status:"error", error: "Ha ocurrido un error al agrgar el carrito"})
    }
}

export const deleteProductByCart= async (req, res) => {
    //deberá eliminar del carrito el producto seleccionado.
    try{
        const cid =  req.params.cid;
        const pid = req.params.pid;
        const product = await getAllProductsById(pid)
        const cart = await getAllCartById(cid);

        if(!cart || cart.status === "error"){
            return res.status(404).send({status: "error", error: `No existe el carrito id ${cid}` })
        }
        if(!product || product.status === "error"){
            return res.status(404).send({status: "error", error: `No existe el producto id ${pid}` })
        }
        const result = await deleteProductCart(cid,pid);

        res.status(200).send({status:"sucess", result})
    }catch(error){
        res.status(500).send({status:"error", error:error.message})
    }
}

export const updateProductByCart =  async (req, res) => {
    // deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    try{
        const cid = req.params.cid;
        const products = req.body;

        const cart = await getAllCartById(cid);
        if(!cart || cart.status === "error"){
            return res.status(404).send({status: "error", error: `No existe el carrito id ${cid}` })
        }

        const result = await updateProductInCartByCant(cid, products)
        res.status(200).send({status:"sucess", result})

    }catch(error){
        res.status(500).send({status:"error", error:error.message})
    }
}

export const updateCantProductByCart = async (req,res) => {
    //deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    const cid = req.params.cid
    const pid = req.params.pid
    //const qty = req.body
    const {quantity} = req.body

    const product = await getAllProductsById(pid)
    const cart = await getAllCartById(cid);

    if(!cart || cart.status === "error"){
        return res.status(404).send({status: "error", error: `No existe el carrito id ${cid}` })
    }
    if(!product || product.status === "error"){
        return res.status(404).send({status: "error", error: `No existe el producto id ${pid}` })
    }

    console.log(quantity)

    const result = await updateCantProductInCart(cid, pid, quantity)
    res.status(200).send({status:"sucess", result})
}

export const deleteProductsByCart = async (req, res) => {
    //deberá eliminar todos los productos del carrito
    const cid = req.params.cid
    const cart = await getAllCartById(cid);

    if(!cart || cart.status === "error"){
        return res.status(404).send({status: "error", error: `No existe el carrito id ${cid}` })
    }

    const result = await deleteProductsCart(cid)
    res.status(200).send({status:"sucess", result})
}