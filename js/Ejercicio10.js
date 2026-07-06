// Elementos
const inputCelsius = document.getElementById('celsius');
const inputFahrenheit = document.getElementById('fahrenheit');
const btnConvertir = document.getElementById('btnConvertir');
const txtError = document.getElementById('error');


inputCelsius.addEventListener('input', function() {
    
    this.value = this.value.replace(/[^0-9.-]/g, ''); //Para bloquear las letras y solo usar numeros

    const puntos = this.value.split('.').length - 1; //Para no agregar mas de un punto decimal
    if (puntos > 1) {
        
        this.value = this.value.slice(0, -1); //Para eliminar los puntos de mas
    }

    //Para que el signo - solo se pueda poner al principio
    if (this.value.includes('-') && this.value.indexOf('-') !== 0) {
        this.value = this.value.replace('-', '');
    }
});

// El boton de convertir 
btnConvertir.addEventListener('click', function() {
    const valorOriginal = inputCelsius.value.trim();
    const celsius = parseFloat(valorOriginal);

    // En caso de que no se escriba bien de error
    if (valorOriginal === "" || isNaN(celsius)) {
        txtError.style.display = "block"; 
        inputFahrenheit.value = "";       
        inputCelsius.focus();             
        return;                           
    }

    // Oculta el error en caso de que pasen las validaciones anteriores
    txtError.style.display = "none";

    // Calculos
    const fahrenheit = (celsius * 9 / 5) + 32;

    // Resultado
    inputFahrenheit.value = `${fahrenheit.toFixed(1)}°F`;
});