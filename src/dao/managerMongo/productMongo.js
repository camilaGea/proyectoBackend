import productosModel from '../models/product.model.js'


export default class ProductManagerMongo {

    async getProducts(limit,page,category,disp,sort){    
        try{
            if(!limit) {limit = 10}
            if(!sort) { sort = 1}
            const filtro = {}

            if(category){
                filtro.category = category
            }
            if(disp){
                filtro.stock = disp
            }
            let products = await productosModel.paginate(filtro,{page:page ,limit:limit,sort:{price:sort},lean:true})
            if(!disp && !category){
                products.prevLink =products.hasPrevPage?`http://localhost:3000/products?page=${products.prevPage}&sort=${sort}&limit=${limit}`:'';
			    products.nextLink = products.hasNextPage?`http://localhost:3000/products?page=${products.nextPage}&sort=${sort}&limit=${limit}`:'';
            
            }
            if(!disp && category){
                products.prevLink =products.hasPrevPage?`http://localhost:3000/products?page=${products.prevPage}&category=${category}&sort=${sort}&limit=${limit}`:'';
			    products.nextLink = products.hasNextPage?`http://localhost:3000/products?page=${products.nextPage}&category=${category}&sort=${sort}&limit=${limit}`:'';
            }
            if(!category && disp){
                products.prevLink =products.hasPrevPage?`http://localhost:3000/products?page=${products.prevPage}&sort=${sort}&limit=${limit}&disp=${disp}`:'';
			    products.nextLink = products.hasNextPage?`http://localhost:3000/products?page=${products.nextPage}&sort=${sort}&limit=${limit}&disp=${disp}`:'';
            }
        
            return products
        }catch (error){
            return { status: "error", error: error };
        }
    }

    async getP(){    
        try{
            let products = await productosModel.find().lean()
            return products
        }catch (error){
            return { status: "error", error: error };
        }
    }

    async getProductsId(pid){
        try{
            return await productosModel.findOne({ _id: pid })
        }catch (error){
            return { status: "error", error: error };
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock, category, status){
        try{
            if(!title || !description || !price || !code || !stock || !category){
                return { status: "error", message: "No ha llenado los datos" }
            }
            const codProduct = await productosModel.findOne({code: code})
            console.log( codProduct)
            if(codProduct){
                return { status: "error", message: "codigo repetido!" }
            }

            if(status === undefined){
                status = true
            }

            const newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                status: status,
                stock: stock,
                category: category,
            }
            return await productosModel.create(newProduct)
        
        }catch (error){
            return { status: "error", error: error };
        }
    }

    async updateProduct(pid, cambio){
        try{
            return await  productosModel.updateOne({_id: pid} , cambio)
        }catch(error){
            return { status: "error", error: error };
        }
    }

    async deleteProduct(pid){
        try{
            return await productosModel.deleteOne({ _id: pid })
        }catch(error){
            return { status: "error", error: error };
        }
    }
}