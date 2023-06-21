import {postRegister, postLogin, postFailRegister, getCurrent} from '../controllers/login.controller.js'
import { Router } from 'express';
import { authToken } from '../utils.js';

const router = Router();

router.post('/register',  postRegister)

router.post('failregister',postFailRegister)

router.post('/login',postLogin)

router.get('/current', authToken, getCurrent)

export default router