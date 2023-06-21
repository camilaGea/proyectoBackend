import CartMongo from '../dao/managerMongo/cartMongo.js'
import userModel from '../dao/models/user.model.js'

const cart = new CartMongo()

export const getUsuario = async (email ) => {
    const user = await userModel.findOne({email}); 
    return user
}

export const newCart = async () => {
    let cartUser = await cart.addCart();
    return cartUser
}

export const newUsuario = async (newUser) => {
    const user = await userModel.create(newUser);
    return user
}