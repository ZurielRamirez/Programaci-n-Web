const inputElemento = document.getElementById('nuevoElemento');
const botonAgregar = document.getElementById('agregarBtn');
const listaContenedor = document.getElementById('lista');


function agregarElemento() {
    const texto = inputElemento.value.trim(); 


    if (texto === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor, escribe algo para agregar a la lista.',
            confirmButtonColor: '#007bff'
        });
        inputElemento.focus();
        return;
    }

    const li = document.createElement('li');

    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'animate__animated', 'animate__fadeIn');


    const textoNodo = document.createTextNode(texto);
    li.appendChild(textoNodo); 

    
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    
    
    botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-sm-custom', 'fw-semibold');

   
    botonEliminar.addEventListener('click', function() {
        
        li.remove();
    });

    
    li.appendChild(botonEliminar);
    listaContenedor.appendChild(li);

    
    inputElemento.value = '';
    inputElemento.focus();
}


botonAgregar.addEventListener('click', agregarElemento);


inputElemento.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarElemento();
    }
});