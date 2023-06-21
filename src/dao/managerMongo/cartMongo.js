import cartModel from "../models/cart.model.js"

export default class CartMongo{

    async getCarts (){
        try{
            return await cartModel.find()
        }catch(error){
            return { status: "error", error: error };
        }
    }

    async addCart(){
        try{
            return await cartModel.create({})
        }catch(error){
            return { status: "error", error: error };
        }
    }

    async getCartById(cid){
        try{
            return await cartModel.findOne({_id: cid}).lean()
        }catch(error){
            return { status: "error", error: error }; 
        }
    }

    async addProductInCart (cid, pid){
        try{
            let cart = await cartModel.findOne({ _id: cid })
            const product = cart.product.find((prod) => prod.idProduct._id == pid)
            if(product){
                return await cartModel.updateOne({_id:cid,'product.idProduct': pid}, {$inc: {'product.$.quantity': 1}})
            }else{
                return await cartModel.updateOne({_id:cid}, {$push: {product: {idProduct: pid , quantity: 1}}})
            }
        }catch(error){
            return { status: "error", error: "no se pudo realizar el metodo" }; 
        }
    }

    async deleteProductInCart (cid,pid){
        try{
            let cart = await cartModel.findOne({ _id: cid })
            const products = cart.product.filter((prod) => prod.idProduct._id != pid)
            return await cartModel.updateOne({_id: cid}, {$set: {product: products}})
        }catch(error){
            return { status: "error", error: error };
        }
    }

    async updateProductInCart (cid, cambio){
        try{
            return await cartModel.updateOne({_id:cid}, {$set: {product: cambio}} )
        }catch(error){
            return { status: "error", error: error };
        }
    }

    async updateQtyProductInCart (cid, pid , qty){
        try{
            return await cartModel.updateOne({'product.idProduct': pid, _id:cid} , {$set: { 'product.$.quantity': qty }})
        }catch(error){
            return { status: "error", error: error };
        }
    }

    async deleteProductsInCart(cid){
        try{
            return await cartModel.updateOne({_id:cid}, {$set: {product: []}} )
        }catch(error){
            return { status: "error", error: error };
        }
    }
}