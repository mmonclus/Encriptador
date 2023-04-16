/***********************************
 * 14/04/2023 Maria Elisa Monclus  *
 * Primer desafio  Alura           *
 /**********************************/

/*************
 * VARIABLES *
 *************/

// Reglas de encriptación
const code = [
    {
        key: 'e',
        value: 'enter'
    },
    {
        key: 'i',
        value: 'imes'
    },
    {
        key: 'a',
        value: 'ai'
    },
    {
        key: 'o',
        value: 'ober'
    },
    {
        key: 'u',
        value: 'ufat'
    }
];

// Disparadores de eventos
let btn_help = document.querySelector(".btn-help");
btn_help.onclick = showHelp;

let btn_close = document.querySelector(".close");
btn_close.onclick = closeHelp;

let btn_on = document.querySelector(".btn-on");
btn_on.onclick = encryptMessage;

let btn_off = document.querySelector(".btn-off");
btn_off.onclick = decryptMessage;

let btn_cls = document.querySelector(".btn-cls");
btn_cls.onclick = cleanMessage;

let btn_copy = document.querySelector(".btn-copy");
btn_copy.onclick = copyMessage;


/**************
 * FUNCIONES: *
 *************/

/* Función para validar el mensaje de entrada 
 * no deje pasar los carateres no permitidos 
 * y retorne el foco  al textarea
*/

function validateMessage(textarea) {
    const value = textarea.value;

    // Validar que no haya caracteres especiales ni acentos
    const pattern = /^[a-z0-9\s]*$/;
    const isValid = pattern.test(value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  
    // Si el valor no es válido, mostrar mensaje de alerta y corregir el valor
    if (!isValid) 
     {
      alert(String.fromCharCode(9888) + "  ¡Caracter inválido! Por favor, solo usar letras minúsculas, no deben ser utilizados letras con acentos ni caracteres especiales.");  
        
      
      const newValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '');

      const match = value.match(/[A-Z]/);
      const newValue2 = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').replace(/[A-Z]/g, '');


      textarea.value = newValue2;
      
      textarea.setSelectionRange(newValue2.length, newValue2.length);
      textarea.focus();
    }
  }

  
  
// Función para leer mensaje de entrada

function readMessage() {
    const input = document.querySelector(".input");
    return input.value;
}



// Función para mostrar mensaje de salida
function showMessage(msg) {
    document.querySelector(".msg-default").style.display = "none";
    document.querySelector(".msg-result").style.display = "block";

    const output = document.querySelector(".output");
    output.value = msg;
}

// Función para limpiar los datos
function cleanMessage() {
    document.querySelector(".msg-default").style.display = "flex";
    document.querySelector(".msg-result").style.display = "none";

    const input = document.querySelector(".input");
    input.value = "";
    const output = document.querySelector(".output");
    output.value = "";
}

// Función para copiar el mensaje resultado
function copyMessage() {
    const output = document.querySelector(".output");
    navigator.clipboard.writeText(output.value).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}

// Función para mostrar las instrucciones
function showHelp() {
    document.querySelector(".help").style.display = "block";
    document.querySelector(".back").style.display = "block";
}

// Función para cerrar las instrucciones
function closeHelp() {
    document.querySelector(".help").style.display = "none";
    document.querySelector(".back").style.display = "none";
}

// Función para encriptar el mensaje
function encryptMessage() {
    // Lee el texto ingresado
    let msg = readMessage();

    code.forEach(element => {
        // Remplaza las coincidencias de clave con su valor encriptado respectivo
        msg = msg.replaceAll(element.key, element.value);
    });
    
    // Muestra el texto encriptado
    showMessage(msg);
}

// Función para desencriptar el mensaje
function decryptMessage() {
    // Lee el texto ingresado
    let msg = readMessage();

    code.forEach(element => {
        // Remplaza las coincidencias de valor encriptado con su clave respectiva
        msg = msg.replaceAll(element.value, element.key);
    });

    // Muestra el texto desencriptado
    showMessage(msg);
}