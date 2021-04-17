const registerForm = document.querySelector("#registerForm");


const username= document.querySelector("#username");
const password= document.querySelector("#password");
const repassword= document.querySelector("#repassword");
const uName = document.querySelector("#name");


registerForm.addEventListener("submit", function(e){
    // e.preventDefault();
    
    checkInputs()
    if(Object.keys (errors).length>0){
        e.preventDefault();
        // console.log(errors)
    }
});

function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let errors={};

function checkInputs(){
    
    if(username.value== ""){
        setErrors(username,"Ingresá un email como nombre de usuario")
    }
    else if(!isEmail(username.value)){
        setErrors(username,"Ingresá un email valido")   
    }
    else{
        setSuccess(username)
    }

    if(uName.value== ""){
        setErrors(uName,"Ingresá un nombre")
        
    }else{
        setSuccess(uName)
    }
           
    if(password.value== ""){
        setErrors(password,"Ingresá una contraseña")
    }
    else if(password.value!== repassword.value ){
        setErrors(password,"Las contraseñas deben coincidir")
    }else{
        setSuccess(password);
    }
    if(repassword.value== ""){
        setErrors(repassword,"Volve a ingresar la contraseña")
    }
    else if(repassword.value!== password.value ){
        setErrors(repassword,"Las contraseñas deben coincidir")
    }else{
        setSuccess(repassword);
    }
    
    if (cv.value && !(/\.(pdf|doc|docx)$/i).test(cv.value)) {
        setErrors(cv,"El formato de archivo debe ser PDF, DOC o DOCX")
    } else {
        setSuccess(cv);
    }
 
}

function setErrors(input, mensaje){
    let formControl = input
    formControl.className = 'form-control border-danger'
    let smallDiv=input.parentElement.querySelector("p")
    
    smallDiv.innerText=mensaje;
    
    errors[input.name]=mensaje;
    
}

function setSuccess(input){
    let formControl = input
    formControl.className = 'form-control border-success'
    let smallDiv=input.parentElement.querySelector("p")
    smallDiv.innerText="";
    delete errors[input.name];
}



