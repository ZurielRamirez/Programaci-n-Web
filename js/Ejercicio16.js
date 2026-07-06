
const inputNum1 = document.getElementById('numero1');
const inputNum2 = document.getElementById('numero2');
const inputResultado = document.getElementById('resultado');


const filtrarInput = function() {
    this.value = this.value.replace(/[^0-9.-]/g, '');
  
    const puntos = this.value.split('.').length - 1;
    if (puntos > 1) this.value = this.value.slice(0, -1);
};

inputNum1.addEventListener('input', filtrarInput);
inputNum2.addEventListener('input', filtrarInput);



const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => b !== 0 ? a / b : 'Error';


function calcularOperacion(operacion) {
    const val1 = inputNum1.value.trim();
    const val2 = inputNum2.value.trim();
    
    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);


    if (val1 === "" || val2 === "" || isNaN(n1) || isNaN(n2)) {
        inputResultado.value = "";
        Swal.fire({
            icon: 'error',
            title: '¡Oops!',
            text: 'Por favor, ingresa números válidos en ambos campos.',
            confirmButtonColor: '#007bff'
        });
        return;
    }

    let res = 0;

    switch (operacion) {
        case 'suma':
            res = sumar(n1, n2);
            break;
        case 'resta':
            res = restar(n1, n2);
            break;
        case 'multiplicacion':
            res = multiplicar(n1, n2);
            break;
        case 'division':
            res = dividir(n1, n2);
            
            if (res === 'Error') {
                inputResultado.value = "";
                Swal.fire({
                    icon: 'warning',
                    title: 'Operación Inválida',
                    text: 'No se puede dividir entre cero.',
                    confirmButtonColor: '#007bff'
                });
                return;
            }
            break;
    }


    inputResultado.value = res % 1 === 0 ? res : res.toFixed(2);
}