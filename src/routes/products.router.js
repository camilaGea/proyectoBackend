import { Router, json } from 'express';
import {getProducts, getProductsById, postProduct, putProductById, deleteProductById} from '../controllers/products.controller.js'

const router = Router();

router.get('/', getProducts)

router.get('/:id', getProductsById)

router.post('/', postProduct)

router.put('/:id', putProductById)

router.delete("/:id", deleteProductById)

export default router;