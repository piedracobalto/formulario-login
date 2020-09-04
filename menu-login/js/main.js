const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // la configuracion para que deba ser un mail.
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};

// el objeto de campos sirve para poder validar cada input en el caso de que se haya escrito de manera correcta segun las expresiones regulares.
const campos = {

    usuario: false,
    nombre: false,
    apellido:false,
    contrasenia:false,
    email: false,
    telefono:false
};


const validarFormulario = (e) =>{

    // se emplea el switch para que la funcion sepa cuando validar cada input correspondientemente. e.target.name lo que hace es mostrar en que input esta ejerciendo la funcion.
    
    switch(e.target.name){
        
        case "usuario":
            validarCampo(expresiones.usuario,e.target,'usuario');   
        break;
        case "nombre":
            validarCampo(expresiones.nombre,e.target,'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.apellido,e.target,'apellido');
        break;
        case "contrasenia1":
            validarCampo(expresiones.password,e.target,'contrasenia1');
            // se pone esta funcion para que se active cuando alguna de las contrasenias es modificada
            validarContrasenia2();
        break;
        case "contrasenia2":
            validarContrasenia2();
        break;
        case "email":
            validarCampo(expresiones.correo,e.target,'email');
        break;
        case "telefono":
            validarCampo(expresiones.telefono,e.target,'telefono');
        break;

    }
}





const validarCampo = (expresion,input,campo)=>{
    // accedo al objeto expresiones y pongo la expresion regular correspondiente a cada input y lo comparo a traves del metodo test el valor de lo que se ingresa el input mediante input.value
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;

    
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    };
};


const validarContrasenia2 = () =>{
    const inputContrasenia1 = document.getElementById("contrasenia1");
    const inputContrasenia2 = document.getElementById("contrasenia2");

    if (inputContrasenia1.value !== inputContrasenia2.value) {
        document.getElementById(`grupo__contrasenia2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__contrasenia2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasenia2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__contrasenia2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__contrasenia2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['contrasenia'] = false;
    
    } else{
        document.getElementById(`grupo__contrasenia2`).classList.add('formulario__grupo-correcto');
        document.getElementById(`grupo__contrasenia2`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__contrasenia2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__contrasenia2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__contrasenia2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['contrasenia'] = true;
    }
};


// el forEach recorre a todos los id de inputs y activa la funcion
inputs.forEach((input) =>{
    // el key up se activa cuando se deja de pulsar una tecla.
    input.addEventListener('keyup',validarFormulario);
    // el blur es lo puesto al focus, es decir, activa cuando se deja de hacer focus en algun input o elemento.
    input.addEventListener('blur',validarFormulario);
});


formulario.addEventListener('submit',(e)=>{
    e.preventDefault();

    // vamos a utilizar el id de terminos y condiciones para ser unas de lsa condiciones para activar el envio de los datos
    const terminos = document.getElementById("terminos");

    
    if (campos.usuario && campos.nombre && campos.apellido && campos.contrasenia && campos.email && campos.telefono && terminos.checked) {
        
        // una vez que se hayan validado todos los campos y se  haya chequeado el checkbox, se resetea la funcion del boton submit.
        formulario.reset();

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        
        // esto sirve para que una vez que se haya enviado correctamente el formulario, desaparezca el mensaje despues de 5 segundos.
        setTimeout(() =>{
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo")
        },5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono)=>{
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }

});

