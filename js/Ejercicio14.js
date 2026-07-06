// Elementos
const inputNumeros = document.getElementById('numeros');
const inputMayor = document.getElementById('mayor');
const inputMenor = document.getElementById('menor');
const inputPromedio = document.getElementById('promedio');
const btnCalcular = document.getElementById('btnCalcular');
const txtError = document.getElementById('error');

inputNumeros.addEventListener('input', function() {
    // Para bloquear letras y caracteres raros, solo permitimos números y comas
    this.value = this.value.replace(/[^0-9,]/g, ''); 
});

// El botón de calcular 
btnCalcular.addEventListener('click', function() {
    const valorOriginal = inputNumeros.value.trim();

    
    if (valorOriginal === "") {
        txtError.style.display = "block"; 
        limpiarResultados();      
        inputNumeros.focus();             
        return;                           
    }

    //  Convertir la cadena en un arreglo separando por las comas
    const arregloCadenas = valorOriginal.split(',');

    // Convertir cada elemento de texto a tipo Número
    const arregloNumeros = arregloCadenas.map(Number);

    // Validación verificar si hay un NaN (por ejemplo si el usuario puso "10,,30" o letras)
    const tieneErrores = arregloNumeros.some(isNaN);

    if (tieneErrores) {
        txtError.style.display = "block"; 
        limpiarResultados();      
        inputNumeros.focus();             
        return; 
    }

    // Oculta el error si pasa las validaciones anteriores
    txtError.style.display = "none";

    // Obtener el número mayor y menor usando el operador spread 
    const mayor = Math.max(...arregloNumeros);
    const menor = Math.min(...arregloNumeros);

    // Calcular el promedio usando el método reduce()
    const sumaTotal = arregloNumeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    const promedio = sumaTotal / arregloNumeros.length;

    // Asignar los resultados a las cajas 
    inputMayor.value = mayor;
    inputMenor.value = menor;
    
    //Resultado
    inputPromedio.value = promedio % 1 === 0 ? promedio : promedio.toFixed(2);
});

// Función auxiliar para limpiar las cajas si hay error
function limpiarResultados() {
    inputMayor.value = "";
    inputMenor.value = "";
    inputPromedio.value = "";
}