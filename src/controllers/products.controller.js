import {getAllProducts, getAllProductsById, newProduct, updateProductById, deleteProduct} from '../services/products.services.js'

export const getProducts = async(req,res) =>{
    try{
        let { limit,page = 1,category,disp,sort } = req.query;
        let products = await getAllProducts(limit,page,category,disp,sort);
        res.send({status: "Sucess", products})
    }catch (error){
        res.status(500).send({status:"error", error:error.message})
    }
}

export const getProductsById = async (req,res) =>{
    try{
        const id = req.params.id;
        const produc = await getAllProductsById(id);
        res.send({mensaje:"Producto id",products: produc})
    } catch (error) {
        res.status(500).send({status:"error", error:error.message})
    } 
}

export const postProduct = async (req,res) => {
    try{
        const {title, description, price, thumbnail, code, stock, category, status} = req.body
        const producto = await newProduct(title,description,price,thumbnail,code,stock, category, status)
        
        if (producto.status === "error") {
            return res.status(404).send({
                status: "error",
                error: producto,
            });
        }
        res.send({status: 'Success', mensaje:"Products", producto})    
    }catch (error){
        res.status(500).send({status:"error", error:error.message})
    }
}

export const putProductById = async (req, res) => {
    try{
        const { body } = req;
        const { id } = req.params;
        const producto = await updateProductById(id, body);
        res.status(200).send({mensaje: "Producto actualizado",producto})

    }catch (error){
        res.status(500).send({status:"error", error:error.message})
    }
}

export const deleteProductById = async (req, res) => {
    try{
        const id = req.params.id
        const producto = await deleteProduct(id)
        res.send({status: 'Success', mensaje:"Product eliminado", producto})    
    } catch (error) {
        res.status(500).send({status:"error", error:error.message})
    } 
}