export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

if(input.validity.valid){
    input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = "";
}else{
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMissing',
    'patterMismatch',
    'customError',
]

const mensajesDeError = {
    nombre: {
        valueMissing: 'Debe ingresar un nombre'
    },
    email: {
        valueMissing: 'Este campo no puede estar vacio, ingrese un correo',
        typeMismatch: 'El correo no es Valido'
    },
    password: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
        valueMissing: 'Este campo no puede estar vacio',
        customError: 'Debes tener al menos 18 años de edad',
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: 'El formato requerido es XXXXXXXXXXX 10 numeros'
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
    },
    provincia:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La provincia debe contener entre 10 a 40 caracteres",
    },

}


const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError (tipoDeInput,input){
    let mensaje = '';
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
         console.log(tipoDeInput,error);
         console.log(input.validity[error]);
         console.log(mensajesDeError[tipoDeInput][error])  
         mensaje = mensajesDeError[tipoDeInput][error];     
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 años de edad'
    };

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate());
    return diferenciaFechas < fechaActual;
}