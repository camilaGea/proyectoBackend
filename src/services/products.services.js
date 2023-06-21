import ProductManagerMongo from '../dao/managerMongo/productMongo.js'
const productManager = new ProductManagerMongo()

export const getAllProducts = async (limit,page,category,disp,sort) => {
    let products = await productManager.getProducts(limit,page,category,disp,sort);
    return products
}

export const getAllProductsById = async (id) => {
    const product = await productManager.getProductsId(id);
    return product
}

export const newProduct = async (title,description,price,thumbnail,code,stock, category, status) => {
    const product = await productManager.addProduct(title,description,price,thumbnail,code,stock, category, status);
    return product
}

export const updateProductById = async (id, body) => {
    const product = await productManager.updateProduct(id, body);
    return product
}

export const deleteProduct = async (id) => {
    const product = await productManager.deleteProduct(id)
    return product
}