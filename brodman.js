document.addEventListener('DOMContentLoaded', () => {
    // Definir las áreas de Brodmann por color y número
    const areas = [
        { color: '#f5ef86', nombre: 'Amarillo', area: 4, pregunta: '¿Qué color corresponde a las funciones ejecutivas?' },
        { color: '#f1bff1', nombre: 'Rosa', area: 6, pregunta: '¿Qué color corresponde a las funciones motoras?' },
        { color: '#f3ae55', nombre: 'Naranja', area: 9, pregunta: '¿Qué color corresponde a las regulaciones emocionales?' },
        { color: '#87edf1', nombre: 'Azul', area: 10, pregunta: '¿Qué color corresponde a las funciones visuales?' },
        { color: '#e593f4', nombre: 'Morado', area: 8, pregunta: '¿Qué color corresponde a la parte somatosensorial?' },
        { color: '#1bcaa8', nombre: 'Verde menta', area: 7, pregunta: '¿Qué color corresponde a la parte de la atención?' },
        { color: '#5fed77', nombre: 'Verde', area: 3, pregunta: '¿Qué color corresponde a la parte de la memoria?' },
        { color: '#42a0ee', nombre: 'Azul fuerte', area: 5, pregunta: '¿Qué color corresponde a la parte del sonido?' }
    ];

    // Variables de estado del juego
    let currentQuestionIndex = 0;  // Empezamos con la primera pregunta
    let currentQuestion = areas[currentQuestionIndex];

    // Mostrar la primera pregunta
    const questionText = document.getElementById('question-text');
    const resultMessage = document.getElementById('result-message');
    const finalMessage = document.getElementById('final-message');
    const optionsContainer = document.getElementById('options-container');

    // Función para generar las opciones de respuesta
    function generateOptions() {
        optionsContainer.innerHTML = ''; // Limpiar las opciones previas

        // Lista de colores y nombres
        const colorOptions = areas.map(area => ({ color: area.color, nombre: area.nombre }));

        // Mezclar las opciones para hacerlas aleatorias
        const shuffledColors = colorOptions.sort(() => Math.random() - 0.5);

        // Crear botones con colores y mostrar el nombre del color en el texto
        shuffledColors.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.nombre;  // Mostrar el nombre del color en el botón
            button.classList.add('option-button');
            button.style.backgroundColor = option.color;  // Establecer el color de fondo según el valor del color
            button.style.color = getContrastingTextColor(option.color);  // Asegurarse de que el texto sea legible
            button.setAttribute('data-color', option.color);
            button.addEventListener('click', () => checkAnswer(option.nombre));
            optionsContainer.appendChild(button);
        });
    }

    // Función para obtener el color de texto contrastante (blanco o negro)
    function getContrastingTextColor(color) {
        const rgb = hexToRgb(color);  // Convertir el color hexadecimal a RGB
        const brightness = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b); // Cálculo de luminosidad
        return brightness > 128 ? 'black' : 'white';  // Si la luminosidad es mayor a 128, usa texto negro, de lo contrario blanco
    }

    // Función para convertir color hexadecimal a RGB
    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    // Función para verificar la respuesta
    function checkAnswer(selectedColorName) {
        if (selectedColorName === currentQuestion.nombre) {
            resultMessage.textContent = '¡Correcto! Has relacionado la área correctamente.';
            resultMessage.style.color = 'green';

            // Cambiar a la siguiente pregunta después de 1 segundo
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < areas.length) {
                    nextQuestion();
                } else {
                    resultMessage.textContent = '';
                    finalMessage.textContent = '¡Felicidades! Ahora conoces las áreas de Brodmann';
                }
            }, 1000); // Esperamos 1 segundo antes de pasar a la siguiente pregunta
        } else {
            resultMessage.textContent = 'Incorrecto, intenta nuevamente.';
            resultMessage.style.color = 'red';
        }
    }

    // Función para cambiar a la siguiente pregunta
    function nextQuestion() {
        currentQuestion = areas[currentQuestionIndex];

        // Actualizar la pregunta
        questionText.textContent = currentQuestion.pregunta;
        resultMessage.textContent = '';  // Limpiar el mensaje de resultado

        // Generar las opciones para la nueva pregunta
        generateOptions();
    }

    // Inicializar la primera pregunta
    nextQuestion();
});
