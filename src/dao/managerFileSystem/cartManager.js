import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../files/cart.json");

export default class CartManager{
    constructor(){
        this.carts = [],
        this.idCart = 1,
        this.path = filePath
    }

    getCarts = async() => {
        if(fs.existsSync(this.path)){
            const cartData =  await fs.promises.readFile(this.path, "utf-8"); //lee y devuelve los datos
            const carts = JSON.parse(cartData);
            console.log(carts)
            return carts
        }else{
            console.log('[]')
            return []
        }
    }

    create = async() =>{
        try {
            const carts = await this.getCarts();
            let cart= {
                id: this.idCart ++,
                products: []
            }
            carts.push(cart);
            await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2),"utf-8");
            return cart; 
        } catch (error) {
           console.log(error);     
        }
    }

    getCartsById= async(id) =>{
        const cartData = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartData);
        const cartId = carts.find(cart => cart.id == id)
        if(cartId){
            return cartId
        }else{
            return `El carrito con ID: ${id} no encontrado`
        }
    }


    addProductInCart = async(idCart, idProd)=>{
        const carts = await this.getCarts(); // traigo todo los carritos
        const cartId = carts.find((cart) => cart.id == idCart); // filtro el carrito con el id
        let productsInCart = cartId.products; // asigno a la varible los productos de ese carrito
        const productoIndex = productsInCart.findIndex((prod) => prod.id == idProd) // existe el product? indice del  primero que cumpla la condicion

        if (productoIndex === -1) {
            let producto = {
                id: idProd,
                quantity: 1
            }
            productsInCart.push(producto)
        } else{
            productsInCart[productoIndex].quantity = productsInCart[productoIndex].quantity + 1 ;
        }
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2),"utf-8");
        return cartId;
    }
}