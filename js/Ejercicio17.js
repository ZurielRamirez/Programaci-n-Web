const crearManejadorTareas = () => {
    
    let tareas = JSON.parse(localStorage.getItem('mis_tareas_web')) || [];

   
    const guardarEnStorage = () => {
        localStorage.setItem('mis_tareas_web', JSON.stringify(tareas));
    };

    
    return {
        obtenerTareas: () => tareas,
        
        agregarTarea: (textoTarea) => {
            tareas.push(textoTarea);
            guardarEnStorage();
        },
        
        eliminarTarea: (indice) => {
            tareas.splice(indice, 1); 
            guardarEnStorage();
        }
    };
};


const gestor = crearManejadorTareas();


const inputTarea = document.getElementById('nuevaTarea');
const btnAgregar = document.getElementById('btnAgregar');
const contenedorLista = document.getElementById('listaTareasContainer');
const txtError = document.getElementById('error');

const renderizarTareas = () => {
    
    contenedorLista.innerHTML = "";
    
    const listaActual = gestor.obtenerTareas();

    
    if (listaActual.length === 0) {
        contenedorLista.innerHTML = "<li class='tarea-vacia'>No hay tareas pendientes </li>";
        return;
    }

    
    listaActual.forEach((tarea, indice) => {
        const li = document.createElement('li');
        li.className = 'item-tarea';
        
        li.innerHTML = `
            <span>${tarea}</span>
            <button class="btn-eliminar-tarea" onclick="confirmarEliminacion(${indice})">Eliminar</button>
        `;
        
        contenedorLista.appendChild(li);
    });
};


btnAgregar.addEventListener('click', () => {
    const texto = inputTarea.value.trim();

    if (texto === "") {
        txtError.style.display = "block";
        inputTarea.focus();
        return;
    }

    txtError.style.display = "none";
    
    
    gestor.agregarTarea(texto);
    
    
    inputTarea.value = "";
    renderizarTareas();
});


window.confirmarEliminacion = (indice) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta tarea se borrará permanentemente de tu lista!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545', 
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            
            gestor.eliminarTarea(indice);
            renderizarTareas();
            
           
            Swal.fire({
                title: '¡Eliminada!',
                text: 'La tarea ha sido borrada.',
                icon: 'success',
                confirmButtonColor: '#007bff'
            });
        }
    });
};


renderizarTareas();