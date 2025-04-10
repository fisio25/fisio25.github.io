// Seleccionar los elementos
const image = document.getElementById('interactive-image');
const infoContainer = document.getElementById('info-container');

// Función para mostrar u ocultar la información
image.addEventListener('click', () => {
    if (infoContainer.style.display === 'block') {
        infoContainer.style.display = 'none';
    } else {
        infoContainer.style.display = 'block';
    }
});
