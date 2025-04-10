function mostrarInformacion(infoId) {
    // Ocultar todas las secciones de información
    const allInfoContainers = document.querySelectorAll('.info-container');
    allInfoContainers.forEach(container => {
        container.style.display = 'none';
    });

    // Mostrar solo la información seleccionada
    const infoElement = document.getElementById(infoId);
    if (infoElement) {
        infoElement.style.display = 'block';
    }
}
