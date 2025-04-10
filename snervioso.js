document.addEventListener('DOMContentLoaded', () => {
    const levels = [
        {
            image: 'img/cerebro.jpg' ,  // Asegúrate de poner las rutas correctas
            hint: 'Organo mas voluminoso del encéfalo.',
            word: 'cerebro'
        },
        {
            image: 'img/mesenfalo.jpg',
            hint: 'Parte del tronco del encéfalo que se encuentra entre el puente y el diencéfalo',
            word: 'mesencefalo'
        },
        {
            image: 'img/puentedevarolio.jpg',
            hint: 'Es una parte del tronco encefálico que conecta el bulbo raquídeo y el mesencéfalo',
            word: 'puentedevarolio'
        },
        {
            image: 'img/bulbo_raquideo.jpg',
            hint: 'Estación de cambio entre el cerebro y la médula espinal y contiene los centros para la regulación de las actividades respiratoria, vasomotora, cardiaca y reflejas',
            word: 'bulboraquideo'
        },
        {
            image: 'img/cerebelo.jpg',
            hint: 'Porción del encéfalo ubicada en la región posterior de la cabeza entre el cerebro y el tronco encefálico.',
            word: 'cerebelo'
        },
        {
            image: 'img/Sistema_nervioso.jpg',
            hint: 'Se refiere a lo relativo al cuello, ya sea del cuerpo humano o de algún órgano. ',
            word: 'cervical'
        },
        // Agregar más niveles según sea necesario

    ];

    let currentLevel = 0;
    let word = '';
    let guessedWord = [];
    let isWordGuessed = false;

    const wordContainer = document.getElementById('word-container');
    const inputField = document.getElementById('letter-input');
    const submitButton = document.getElementById('submit-letter');
    const messageDiv = document.getElementById('message');
    const nextLevelButton = document.getElementById('next-level');
    const gameImage = document.getElementById('game-image');
    const hintText = document.getElementById('hint');

    // Mostrar los recuadros de letras
    function renderWord() {
        wordContainer.innerHTML = '';
        guessedWord.forEach(letter => {
            const box = document.createElement('div');
            box.classList.add('word-box');
            box.textContent = letter;
            wordContainer.appendChild(box);
        });
    }

    // Verificar la letra ingresada
    function checkLetter(letter) {
        let correctGuess = false;

        word.split('').forEach((char, index) => {
            if (char === letter && guessedWord[index] === '_') {
                guessedWord[index] = letter;
                correctGuess = true;
            }
        });

        if (!correctGuess) {
            messageDiv.textContent = 'Letra incorrecta. Intenta de nuevo.';
        } else {
            messageDiv.textContent = '';
        }

        renderWord();
        checkWin();
    }

    // Verificar si se adivinó toda la palabra
    function checkWin() {
        if (!guessedWord.includes('_')) {
            isWordGuessed = true;
            messageDiv.textContent = '¡Felicidades! Has adivinado la palabra.';
            gameImage.src = levels[currentLevel].image;
            gameImage.style.display = 'block';
            nextLevelButton.style.display = 'block';
        }
    }

    // Cargar el nivel actual
    function loadLevel() {
        const level = levels[currentLevel];

        word = level.word.toLowerCase();
        guessedWord = Array(word.length).fill('_');
        isWordGuessed = false;

        gameImage.style.display = 'none';
        nextLevelButton.style.display = 'none';
        messageDiv.textContent = '';
        inputField.value = '';
        hintText.textContent = `Pista: ${level.hint}`;

        renderWord();
    }

    // Evento para enviar letra
    submitButton.addEventListener('click', () => {
        const letter = inputField.value.toLowerCase();
        if (letter && letter.length === 1 && !isWordGuessed) {
            checkLetter(letter);
            inputField.value = '';
        }
    });

    // Evento para pasar al siguiente nivel
    nextLevelButton.addEventListener('click', () => {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            loadLevel();
        } else {
            messageDiv.textContent = '¡Has completado todos los niveles!';
            nextLevelButton.style.display = 'none';
        }
    });

    // Iniciar juego
    loadLevel();
});
