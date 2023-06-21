fetch('/api/jw/current', {
    method:'GET',
    headers:{
        'authorization':`Bearer ${localStorage.getItem('token')}`
    }
}).then(response=>{
    if(response.status===401){
        window.location.replace('/login')
        return
    }else{
        return response.json();
    }
}).then(json =>{
    const p = document.getElementById('datosEnProducts');
    p.innerHTML = `Bienvenido ${json.payload.nombre}, tu rol es ${json.payload.rol}`
})