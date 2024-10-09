const agregarProductos = () => {
    let nombreArticulo = document.getElementById('input-articulo').value
    let cantidad = Number(document.getElementById('input-cantidad').value)
    let precioUnitario = Number(document.getElementById('input-precio').value)
    let alicuota = document.getElementById('alicuota').value
    console.log(typeof(nombreArticulo));
    console.log(typeof(cantidad));
    console.log(typeof(precioUnitario));
    console.log(typeof(alicuota));

    if (cantidad <= 0 || isNan(cantidad)) {
        generarTextoDebajo('input-cantidad','Error en la carga de cantidad' )
    }


}


const generarTextoDebajo = (idElement, errorMessage) => {
    let errorElement = document.getElementById(idElement + '-error');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = idElement + '-error';
        errorElement.style.color = 'red';
        errorElement.style.textAlign = 'center'
        errorElement.style.paddingTop = '5px'
        document.getElementById(idElement).insertAdjacentElement('afterend', errorElement);
    }

    errorElement.textContent = errorMessage;
};


// const limpiarCarro = () => {
    
// }
