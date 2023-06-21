import { Router } from "express";
import {getCartById, postCart, postProductByCart, deleteProductByCart, updateProductByCart, updateCantProductByCart, deleteProductsByCart} from '../controllers/cart.controller.js'

const router = Router()

router.post('/', postCart)

router.get("/:cid", getCartById)

router.post('/:cid/product/:pid', postProductByCart)

router.delete('/:cid/products/:pid', deleteProductByCart)

router.put('/:cid', updateProductByCart)

router.put('/:cid/products/:pid', updateCantProductByCart)

router.delete('/:cid', deleteProductsByCart)

export default router