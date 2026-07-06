// Arreglo global para almacenar los objetos de los estudiantes
const listaEstudiantes = [];

// Elementos del DOM
const inputNombre = document.getElementById('nombre');
const inputCalificacion = document.getElementById('calificacion');
const inputPromedio = document.getElementById('promedio');
const inputMayor = document.getElementById('mayor');
const inputMenor = document.getElementById('menor');

const btnAgregar = document.getElementById('btnAgregar');
const btnConvertir = document.getElementById('btnConvertir'); 
const txtError = document.getElementById('error');

inputCalificacion.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, ''); 
});

// Agregar estudiante
btnAgregar.addEventListener('click', function() {
    const nombre = inputNombre.value.trim();
    const califTexto = inputCalificacion.value.trim();
    const calificacion = parseFloat(califTexto);

    // Validacion de campos vacíos o calificación inválida
    if (nombre === "" || califTexto === "" || isNaN(calificacion)) {
        txtError.textContent = "Por favor, ingresa un nombre y una calificación válida.";
        txtError.style.display = "block";
        return;
    }

    // Ocultar error si todo está correcto
    txtError.style.display = "none";

    // rear el objeto estudiante y agregarlo al arreglo
    const nuevoEstudiante = {
        nombre: nombre,
        calificacion: calificacion
    };
    listaEstudiantes.push(nuevoEstudiante);

    // Limpiar los cuadros
    inputNombre.value = "";
    inputCalificacion.value = "";
    inputNombre.focus();
});

// Calcular operaciones
btnConvertir.addEventListener('click', function() {
    // Verificar que al menos haya un estudiante registrado
    if (listaEstudiantes.length === 0) {
        txtError.textContent = "Primero debes agregar al menos un estudiante.";
        txtError.style.display = "block";
        limpiarResultados();
        return;
    }

    txtError.style.display = "none";

    // alcular el promedio usando reduce()
    const sumaTotal = listaEstudiantes.reduce((total, estudiante) => total + estudiante.calificacion, 0);
    const promedio = sumaTotal / listaEstudiantes.length;

    //  Encontrar la calificación más alta y más baja
    const califMaxima = Math.max(...listaEstudiantes.map(e => e.calificacion));
    const califMinima = Math.min(...listaEstudiantes.map(e => e.calificacion));

    // Buscar los nombres de los estudiantes que corresponden a esas calificaciones
    const estudianteMasAlto = listaEstudiantes.find(e => e.calificacion === califMaxima);
    const estudianteMasBajo = listaEstudiantes.find(e => e.calificacion === califMinima);

    // resultados 
    inputPromedio.value = promedio % 1 === 0 ? promedio : promedio.toFixed(2);
    inputMayor.value = `${estudianteMasAlto.nombre} (${califMaxima})`;
    inputMenor.value = `${estudianteMasBajo.nombre} (${califMinima})`;
});

// Función auxiliar para limpiar las salidas si falla algo
function limpiarResultados() {
    inputPromedio.value = "";
    inputMayor.value = "";
    inputMenor.value = "";
}