// Elementos
const inputEdad = document.getElementById('edad');
const inputResultado = document.getElementById('resultado');
const btnConvertir = document.getElementById('btnConvertir');
const txtError = document.getElementById('error');

inputEdad.addEventListener('input', function() {
    // Para bloquear las letras y solo usar números
    this.value = this.value.replace(/[^0-9]/g, ''); 

    // Para no agregar más de un punto decimal
    const puntos = this.value.split('.').length - 1; 
    if (puntos > 1) {
        this.value = this.value.slice(0, -1); // Para eliminar los puntos de más
    }
});

// El botón de convertir 
btnConvertir.addEventListener('click', function() {
    const valorOriginal = inputEdad.value.trim();
    const edad = parseFloat(valorOriginal);

    // En caso de que no se escriba bien da error 
    if (valorOriginal === "" || isNaN(edad)) {
        txtError.style.display = "block"; 
        inputResultado.value = "";       
        inputEdad.focus();             
        return;                           
    }

    // Oculta el error en caso de que pasen las validaciones anteriores
    txtError.style.display = "none";

    // Cálculos 
    let resultado = "";
    if (edad >= 18) {
        resultado = "Puedes votar";
    } else {
        resultado = "No puedes votar";
    }

    // Resultado 
    inputResultado.value = resultado;
});