// Seleccionamos todos los botones
const buttons = document.querySelectorAll('button');

// Seleccionamos el contenedor de información
const infoContainer = document.getElementById('info-container');

// Añadimos el evento 'mouseenter' a cada botón
buttons.forEach(button => {
  button.addEventListener('mouseenter', (event) => {
    // Obtenemos el texto de información desde el atributo 'data-info'
    const infoText = event.target.getAttribute('data-info');
    
    // Colocamos el texto en el contenedor
    infoContainer.textContent = infoText;

    // Mostramos el contenedor de información
    infoContainer.style.display = 'block';
  });

  // Añadimos el evento 'mouseleave' para ocultar la información cuando el ratón sale
  button.addEventListener('mouseleave', () => {
    // Ocultamos el contenedor de información
    infoContainer.style.display = 'none';
  });
});
