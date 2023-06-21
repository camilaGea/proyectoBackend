import {getUsuario, newCart, newUsuario} from '../services/login.services.js'
import { generateJWToken, validatePassword, createHash} from '../utils.js';
import  {config}  from "../config/config.js";

export const postRegister = async (req, res) => {
    const { nombre, apellido, email, edad, password } = req.body;
    try {
        const user = await getUsuario(email); 
        if(user){
            console.log('El usuario existe');
            return res.status(401);
        }
            //creo el cart id
        let cartUser = await newCart()
        console.log('cart'+ cartUser)

        let rol = email === config.auth.account && password === config.auth.pass ? "admin" : "user";
        /*
        if (email == config.auth.account && password == config.auth.pass ) {
            const newUser = {
                nombre, apellido, email, edad, password: createHash(password) , rol: 'admin'
            }
            const result = await newUsuario(newUser);
            let access_token  = generateJWToken(result);
            res.send({status:"success", access_token })
            return
        }
        */
        const newUser = { nombre, apellido, email, edad, rol, cart: cartUser._id, password: createHash(password)
        }

        const result = await newUsuario(newUser);
        let access_token  = generateJWToken(result);
  
        res.send({status:"success", access_token })
    }catch (error) {
        return res.send({mensaje:"Error al registrar el usuario: " + error});
    }
}

export const postLogin = async (req, res) => {
    let { email, password } = req.body;
    
    if (!email || !password) return res.status(401).send({menssage: "credenciales incorrectas"});
  
    let usuario = await getUsuario(email);
    
    if (!usuario) return res.status(401).send({menssage: "usuario no existe"});
    if (!validatePassword(password, usuario)) return res.status(401).send({menssage: "cedenciales incorrectas"});
  
    let { nombre, apellido, edad, cart} = usuario;
    let rol = email === config.auth.account && password === config.auth.pass ? "admin" : "user";
    
    let user = {nombre, apellido, email, edad, rol, cart: cart};

    console.log(user)
    let access_token  = generateJWToken(user);    
    res.send({status:'success', access_token})

    /*
    // Con Cookies
    res.cookie('jwtCookieToken', access_token , {
    maxAge: 3600000, //una hora
    httpOnly: false // expone la cookie
    //httpOnly: true // No expone la cookie
    })
    */

}

export const postFailRegister = async () => {
    console.log('Fallo en el ingreso'); 
    res.send({error: 'Error en el ingreso'})
}

export const getCurrent = async (req, res) => {
    console.log(req.user);
    res.send({status:"success", payload:req.user})
}