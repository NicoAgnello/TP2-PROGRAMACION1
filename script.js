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

    if (!completado) {
        document.getElementById('myModal').style.display = 'block';
    }
};

const validarCampo = (id, mensajeError, condicion, completado) => {
    if (condicion) {
        generarTextoDebajo(id, mensajeError);
        return false;
    } else {
        document.getElementById(`${id}-error`).style.display = 'none';
        return completado;
    }
};

const generarTextoDebajo = (idElement, errorMessage) => {
    let errorElement = document.getElementById(idElement + '-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = idElement + '-error';
        errorElement.style.color = 'red';
        errorElement.style.textAlign = 'center';
        errorElement.style.paddingTop = '5px';
        document.getElementById(idElement).insertAdjacentElement('afterend', errorElement);
    }
    errorElement.textContent = 'Error en la carga de ' + errorMessage;
};

// Función para cerrar el modal
const closeModal = () => {
    document.getElementById('myModal').style.display = 'none';
};
// Event listeners para cerrar el modal
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeModalSecondary').addEventListener('click', closeModal);




// const limpiarCarro = () => {
//     // Implementa la lógica para limpiar el carrito
// }
