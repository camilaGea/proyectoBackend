const socket = io();
let user;

const chatbox = document.getElementById('chatbox');

Swal.fire({
    title: "Identificate",
    input: "text",
    inputValidator: (value) => {
        return !value && "NECESITA ESCRIBIR EL NOMBRE DE USUARIO PARA INICIAR!"
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value;
    socket.emit("authenticated", user)
})

chatbox.addEventListener('keyup', evt =>{
    if(evt.key === "Enter"){
        if(chatbox.value.trim().length>0){
            socket.emit("message", {user , message:chatbox.value})
            chatbox.value = "";
        }
    }
})

socket.on("messageLogs", data=>{
    if(!user) return;

    let log = document.getElementById("messageLogs")
    let messages = "";
    data.forEach(({ user, message }) => {
        messages += `${user} dice: ${message} <br/>`
    });
    log.innerHTML = messages
})

socket.on("newUserConnected", data =>{
    if(!user){
        return;
    } 
      
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer:3000,
        title: `${data} se ha unido al chat`,
        icon: "success"
    })
})