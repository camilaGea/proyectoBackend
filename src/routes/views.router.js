import { Router } from "express";
import {realtimeproducts, chat, register, login, products, cart} from '../controllers/views.controller.js'

const router = Router();

router.get('/products', products )

router.get('/carts/:cid', cart)

router.get('/', login )

router.get('/login', login)

router.get('/register', register)

router.get('/chat', chat)

router.get('/realtimeproducts' , realtimeproducts)

export default router;