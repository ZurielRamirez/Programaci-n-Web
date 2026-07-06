// Elementos
const inputPesos = document.getElementById('pesos');
const inputDolares = document.getElementById('dolares');
const btnConvertir = document.getElementById('btnConvertir');
const txtError = document.getElementById('error');


inputPesos.addEventListener('input', function() {
    
    this.value = this.value.replace(/[^0-9.]/g, ''); //Para bloquear las letras y solo usar numeros

    const puntos = this.value.split('.').length - 1; //Para no agregar mas de un punto decimal
    if (puntos > 1) {
        
        this.value = this.value.slice(0, -1); //Para eliminar los puntos de mas
    }
  
});

// El boton de convertir 
btnConvertir.addEventListener('click', function() {
    const valorOriginal = inputPesos.value.trim();
    const pesos = parseFloat(valorOriginal);

    // En caso de que no se escriba bien de error
    if (valorOriginal === "" || isNaN(pesos)) {
        txtError.style.display = "block"; 
        inputDolares.value = "";       
        inputPesos.focus();             
        return;                           
    }

    // Oculta el error en caso de que pasen las validaciones anteriores
    txtError.style.display = "none";

    // Calculos
    const dolares = (pesos * 0.055);

    // Resultado
    inputDolares.value = `${dolares.toFixed(2)} USD`;
});