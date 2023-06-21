import { Router } from 'express';
import passport from 'passport';

import {register, registerFail, login, faillogin, logout, githubcallback, current} from '../controllers/sessions.controller.js'
const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect:'/failregister'}), register)

router.post('failregister', registerFail)

router.post('/login', passport.authenticate('login',{failureRedirect:'/faillogin'}), login)

router.get('/faillogin',faillogin)

router.get('/logout', logout)

router.get('/github', passport.authenticate('github'))

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), githubcallback)

router.get('/current', current)

export default router;