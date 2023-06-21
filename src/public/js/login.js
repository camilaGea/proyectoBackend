const form = document.getElementById("loginForm");

form.addEventListener('submit', e =>{
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key) => obj[key]=value)

    fetch('/api/jw/login',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=> result.json()).then(json =>{
        if(json.status === 'success'){
            localStorage.setItem('token',json.access_token)
            window.location.replace("http://localhost:3000/products");
        }else{
            alert(json.error)
        }
    })
})