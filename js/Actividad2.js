// elementos
const showRegistroLink = document.getElementById('showRegistro');
const showLoginLink = document.getElementById('showLogin');
const registroForm = document.getElementById('registroForm');
const loginForm = document.getElementById('loginForm');

const registroInputs = registroForm.querySelectorAll('input');
const loginInputs = loginForm.querySelectorAll('input');

// Función para cambiar de formulario
function switchForm(activeForm, inactiveForm, activeLink, inactiveLink) {
    activeForm.classList.add('active');
    inactiveForm.classList.remove('active');
    activeLink.classList.add('active');
    inactiveLink.classList.remove('active');
    
    // Limpiar campos y errores al cambiar
    resetForm(inactiveForm);
}

function resetForm(form) {
    form.reset();
    form.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}

// Eventos de la navegación
showRegistroLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(registroForm, loginForm, showRegistroLink, showLoginLink);
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(loginForm, registroForm, showLoginLink, showRegistroLink);
});

//Integración con la librería utileria.js 

// FORMULARIO DE REGISTRO
registroForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Resetear mensajes de error
    this.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const fechaNac = document.getElementById('fechaNac').value;
    
    let valido = true;

    if (!utileria.soloLetras(nombre)) {
        document.getElementById('err-nombre').textContent = 'El nombre solo debe contener letras.';
        valido = false;
    }
    if (!utileria.validarCorreo(correo)) {
        document.getElementById('err-correo').textContent = 'Formato de correo inválido.';
        valido = false;
    }
    if (!utileria.validarLongitud(telefono, 10)) {
        document.getElementById('err-telefono').textContent = 'El teléfono debe tener exactamente 10 dígitos.';
        valido = false;
    }
    if (!utileria.esMayorDeEdad(fechaNac)) {
        document.getElementById('err-fecha').textContent = 'Debes ser mayor de edad para registrarte.';
        valido = false;
    }

    if (valido) {
        // Función libre: Capitalizamos el nombre antes de mostrarlo
        const nombreLimpio = utileria.capitalizarTexto(nombre);
        const edadCalculada = utileria.calcularEdad(fechaNac);

        // Configurar y mostrar Modal
        document.getElementById('modalTxtEdad').textContent = `¡Hola ${nombreLimpio}! Hemos calculado tu edad: tienes ${edadCalculada} años.`;
        document.getElementById('modalTxtExtra').textContent = `Estado de validaciones: 100% Correcto.`;
        
        document.getElementById('modalEdad').showModal();
    }
});

// FORMULARIO DE LOGIN
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    this.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    const correo = document.getElementById('loginCorreo').value;
    const pass = document.getElementById('loginPass').value;
    let valido = true;

    if (!utileria.validarCorreo(correo)) {
        document.getElementById('err-login-correo').textContent = 'El formato de correo no es válido.';
        valido = false;
    }

    if (!utileria.validarPassword(pass)) {
        document.getElementById('err-login-pass').textContent = 'La contraseña no cumple con los requisitos de seguridad.';
        valido = false;
    }

    if (valido) {
        alert('¡Acceso concedido! Credenciales validadas perfectamente.');
    }
});

// Cerrar Modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modalEdad').close();
    resetForm(registroForm); // Limpiar formulario de registro tras éxito
});