import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
//import multer from 'multer';

// config Ruta absoluta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Configuracion bcrypt - hash generation
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// validamos la contraseña con la que esta en la DB como hash
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

//JSON Web Tokens JWT functinos:
export const PRIVATE_KEY = "coderSecret";

export const generateJWToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '120s'});
};

export const authToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if(token==='null'){
        return res.status(401).send({status:"error", error: "Error en el token."})
    }
    jwt.verify(token, PRIVATE_KEY,(error, credentials)=>{
        if(error) return res.status(401).send({status:"error", error:'Error en el token.'})
        req.user = credentials.user;
        next();
    })
}

export default __dirname;