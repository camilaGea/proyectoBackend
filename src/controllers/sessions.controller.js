import userModel from '../dao/models/user.model.js';

export const register = async (req,res) => {
    res.send({status:"succes", message:"User registered"});
}

export const registerFail = async (req,res) => {
    console.log('Fallo en el ingreso');
    res.send({error: 'Error en el ingreso'})
}

export const login = async (req,res) => {
    if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});

    req.session.user = {
        nombre: req.user.nombre,
        email: req.user.email,
        edad: req.user.edad,
        rol: req.user.rol,
    }
    res.send({status:"success", payload:req.user, message:"Primer logueo!!"})
}

export const faillogin = async (req,res) => {
    console.log('Fallo en el ingreso');
    res.send({error: 'Error en el ingreso'})
}

export const logout = async (req,res) => {
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
        res.redirect('/login');
    })
}

export const githubcallback = async (req,res) => {
    req.session.user = req.user;
    res.redirect('http://localhost:8080/products')
}

export const current = async (req,res) => {
    try {
        let user = await userModel.findOne(req.session.email)
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}