// Elementos
const inputKilometros = document.getElementById('kilometros');
const inputMillas = document.getElementById('millas');
const btnConvertir = document.getElementById('btnConvertir');
const txtError = document.getElementById('error');


inputKilometros.addEventListener('input', function() {
    
    this.value = this.value.replace(/[^0-9.]/g, ''); //Para bloquear las letras y solo usar numeros

    const puntos = this.value.split('.').length - 1; //Para no agregar mas de un punto decimal
    if (puntos > 1) {
        
        this.value = this.value.slice(0, -1); //Para eliminar los puntos de mas
    }
  
});

// El boton de convertir 
btnConvertir.addEventListener('click', function() {
    const valorOriginal = inputKilometros.value.trim();
    const kilometros = parseFloat(valorOriginal);

    // En caso de que no se escriba bien de error
    if (valorOriginal === "" || isNaN(kilometros)) {
        txtError.style.display = "block"; 
        inputMillas.value = "";       
        inputKilometros.focus();             
        return;                           
    }

    // Oculta el error en caso de que pasen las validaciones anteriores
    txtError.style.display = "none";

    // Calculos
    const millas = (kilometros * 0.621371);

    // Resultado
    inputMillas.value = `${millas.toFixed(5)} Millas`;
});