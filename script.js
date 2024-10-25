let modalConfirmado = false;
let arrayArticulos = JSON.parse(localStorage.getItem('carrito')) || []

// Llamar a actualizarTabla cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    if (arrayArticulos.length > 0) {
        actualizarTabla();  // Solo actualiza si hay artículos en el carrito
    }
});

const agregarProductos = () => {
    let nombreArticulo = document.getElementById('input-articulo').value;
    let cantidad = parseInt(Number(document.getElementById('input-cantidad').value));
    let precioUnitario = Number(document.getElementById('input-precio').value);
    let alicuota = Number(document.getElementById('alicuota').value);
    let completado = true;

    /// Validacion de campos
    completado = validarCampo('input-articulo', 'artículo', !nombreArticulo || nombreArticulo.length <= 1, completado);
    completado = validarCampo('input-cantidad', 'cantidad', cantidad <= 0 || isNaN(cantidad) || !cantidad , completado);
    completado = validarCampo('input-precio', 'precio unitario', precioUnitario <= 0 || isNaN(precioUnitario) || !precioUnitario, completado);
    completado = validarCampo('alicuota', 'alicuota', !alicuota, completado);

    if (completado) {
        document.getElementById('myModal').style.display = 'block';
        generarTextoDebajo('info-modal', `Nombre: ${nombreArticulo} - Cantidad: ${cantidad} - Precio unitario ${precioUnitario} - Alicuota ${alicuota} %`, false)
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
            guardarCarrito();
            actualizarTabla()
        }
    }
};

const limpiarCarro = () => {
    // Implementa la lógica para limpiar el carrito
    arrayArticulos = []
    const table = document.getElementById('tabla-articulos')
    table.style.display = "none"
    localStorage.removeItem('carrito')
}


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
    const table = document.getElementById('tabla-articulos')
    table.style.display = "table"

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar el contenido de la tabla antes de renderizar de nuevo

    let total = 0

    arrayArticulos.forEach(articulo => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${articulo.nombreArticulo}</td>
            <td>${articulo.cantidad}</td>
            <td>$${articulo.precioUnitario.toFixed(2)}</td>
            <td>$${articulo.precioUnitario * articulo.cantidad}</td>
            <td>$${(articulo.cantidad* articulo.precioUnitario) * articulo.alicuota /100 }</td>
        `;
        tbody.appendChild(row);
        total += articulo.cantidad * articulo.precioUnitario + ((articulo.cantidad* articulo.precioUnitario) * articulo.alicuota /100)
    });
    generarTotal(total)
  
};

const generarTotal = (total) => {
    const rowTotal = document.createElement('tr');
    const tbody = document.querySelector('tbody');
    rowTotal.innerHTML = `
    <td colspan="4" style="text-align: right;"><strong>Total:</strong></td>
    <td><strong>$${total.toFixed(2)}</strong></td>`;
    tbody.appendChild(rowTotal)

}

const confirmModal = () => {
    modalConfirmado = true;  // Actualizar el estado
    document.getElementById('myModal').style.display = 'none';
    agregarProductos();  // Llama a agregarProductos después de confirmar
};

// Función para cerrar el modal
const closeModal = () => {
    document.getElementById('myModal').style.display = 'none';
};


const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(arrayArticulos));
};