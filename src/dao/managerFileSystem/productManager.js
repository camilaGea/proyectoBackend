import fs from 'fs';
import  __dirname  from '../../utils.js'


const filePath = __dirname + '/files/productos.json'

export default class ProductManager{
    constructor(){
        this.products = []
        this.idProduct = 1
        this.path = filePath
    }

    saveProduct = async (products) => {
        try{
            const productData = JSON.stringify(products, null , '\t');
            await fs.promises.writeFile(this.path, productData) //guardo los productos
        } catch(error){
            console.log(error)
        }
    }

    getProducts = async() => {
        if(fs.existsSync(this.path)){
            const productData =  await fs.promises.readFile(this.path, "utf-8"); //lee y devuelve los datos
            const prod = JSON.parse(productData);
            console.log(prod)
            return prod
        }else{
            console.log('[]')
            return []
        }
    }


    addProduct = async(title, description, price, thumbnail, code, stock, category, status) =>{
        try{
            const productos = await this.getProducts();
            if(!title || !description || !price || !code || !stock || !category){
                //console.log('No ha llenado los datos (titulo-descripcion-precio-ruta-codigo-stock)')
                return { status: "error", message: "No ha llenado los datos" }
            }
            const codProduct = productos.find(product => product.code === code )
            if(codProduct){
                //console.log(`El codigo ${code} del producto ${title} ya esta registrado`)
                return { status: "error", message: "codigo repetido!" }
            }
            if(status === undefined){
                status = true
            }
            const product = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                status: status,
                stock: stock,
                category: category,
                id: this.idProduct ++
            }
            
            productos.push(product);
            
            //guardado
            const productData = JSON.stringify(productos, null , '\t');
            await fs.promises.writeFile(this.path, productData)
            return `Se agrego el producto ${title} `
            //console.log(`El producto ${title} agregado correctamente`)
        }catch(error){
            return error
        }
    }

    getProductsById= async(id) =>{
        try{
            //const productData = await fs.promises.readFile(this.path, "utf-8");
            //const prod = JSON.parse(productData);
            prod = await this.getProducts();
            const productoId = prod.find(product => product.id == id)
            return productoId

        }catch (error){
            return error
        }
    }


    updateProduct= async(id, campo) =>{
        const data = await fs.promises.readFile(this.path, "utf-8");
        const productos = JSON.parse(data);

        //obtengo el producto con el ID solicitado
        let producto = productos.find(producto => producto.id == id)

        //obtengo las keys del objeto con los values que queremos modificar del producto obtenido por el ID
        let keysProducto = Object.keys(campo);

        //Si el ID del producto no existe devuelvo un error 
        if(!producto){
            return null
        }
        for (const key of keysProducto){

            //si el producto a modificar tiene la/las keys a modificar le asigno los valores nuevos del objeto que le pasamos por parametro
            if(producto.hasOwnProperty(key)){
                producto[key] = campo[key]
            }
        }

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
        return "El producto se actualizo correctamente"  
    }  

    deleteProduct = async(id)=>{
        const prod = await this.getProducts()
        const producto = prod.find(producto => producto.id == id)
        if(!producto){
            console.log(`El producto con id ${id} no existe`  )
            return
        }
        const indice = prod.indexOf(producto);
        prod.splice(indice,1)  
        const productData = JSON.stringify(prod, null , '\t');
        await fs.promises.writeFile(this.path, productData)  
        //this.saveProduct(prod)
    }
}