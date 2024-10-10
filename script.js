let modalConfirmado = false;
let arrayArticulos = []

const agregarProductos = () => {
    let nombreArticulo = document.getElementById('input-articulo').value;
    let cantidad = Number(document.getElementById('input-cantidad').value);
    let precioUnitario = Number(document.getElementById('input-precio').value);
    let alicuota = document.getElementById('alicuota').value;
    let completado = true;

    /// Validacion de campos
    completado = validarCampo('input-articulo', 'artículo', !nombreArticulo || nombreArticulo.length <= 1, completado);
    completado = validarCampo('input-cantidad', 'cantidad', cantidad <= 0 || isNaN(cantidad) || !cantidad, completado);
    completado = validarCampo('input-precio', 'precio unitario', precioUnitario <= 0 || isNaN(precioUnitario) || !precioUnitario, completado);
    completado = validarCampo('alicuota', 'alicuota', !alicuota, completado);

    if (completado) {
        document.getElementById('myModal').style.display = 'block';
        generarTextoDebajo('info-modal', `Nombre: ${nombreArticulo} - Cantidad: ${cantidad} - Precio unitario ${precioUnitario} - Alicuota ${alicuota}`, false)
       
        if (modalConfirmado) {
            modalConfirmado = false;
            document.getElementById('myModal').style.display = 'none';
            let articulo = {
                nombreArticulo: nombreArticulo,
                cantidad: cantidad,
                precioUnitario: precioUnitario,
                alicuota: alicuota,
            }
            arrayArticulos.push(articulo)
            limpiarCampos()
            actualizarTabla()    
        }
    }
};

const validarCampo = (id, mensajeError, condicion, completado) => {
    let errorElement = document.getElementById(`${id}-error`);

    if (condicion) {
        generarTextoDebajo(id, mensajeError);
        return false;
    } else if (errorElement) { 
        document.getElementById(`${id}-error`).style.display = 'none';
    }
    return completado;
};

const generarTextoDebajo = (idElement, errorMessage, esError = true) => {
    let errorElement = document.getElementById(idElement + '-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = idElement + '-error';
        errorElement.style.textAlign = 'center';
        errorElement.style.paddingTop = '5px';
        document.getElementById(idElement).insertAdjacentElement('afterend', errorElement);
    }
    if(esError){
        errorElement.style.color = 'red';
        errorElement.textContent = 'Error en la carga de ' + errorMessage;
    } else {
        errorElement.style.color = 'black';
        errorElement.style.borderRadius = '2rem'
        errorElement.style.border = '2px solid black';
        errorElement.textContent =  errorMessage;
    }
};

const limpiarCampos = () => {    
    document.getElementById('input-articulo').value = ''
    document.getElementById('input-cantidad').value = ''
    document.getElementById('input-precio').value = ''
    document.getElementById('alicuota').value = ''
}

const actualizarTabla = () => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido de la tabla antes de renderizar de nuevo

    arrayArticulos.forEach(articulo => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${articulo.nombreArticulo}</td>
            <td>${articulo.cantidad}</td>
            <td>$${articulo.precioUnitario.toFixed(2)}</td>
            <td>${articulo.alicuota}</td>
        `;
        
        tbody.appendChild(row);
    });
};

const confirmModal = () => {
    modalConfirmado = true;  // Actualizar el estado
    document.getElementById('myModal').style.display = 'none';
    agregarProductos();  // Llama a agregarProductos después de confirmar
};
// Función para cerrar el modal
const closeModal = () => {
    document.getElementById('myModal').style.display = 'none';
};


// const limpiarCarro = () => {
//     // Implementa la lógica para limpiar el carrito
// }
