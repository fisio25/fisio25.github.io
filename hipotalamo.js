document.addEventListener('DOMContentLoaded', () => {
    const levels = [
        {
 // Asegúrate de poner las rutas correctas
            word: 'areahipotalamicadorsal'
        },
        {

            word: 'nucleodorsomedial'
        },
        {

            word: 'nhipotalamicaposterior'
        },
        {

            word: 'nucleoventromedial'
        },
        {

            word: 'cuerpomamilar'
        },
        {

            word: 'lobuloposterior'
        },
        {

            word: 'lobuloanterior'
        },
        {

            word: 'quiasmaoptico'
        },
        {

            word: 'nucleosupraquiasmatico'
        },
        {

            word: 'nucleoarqueado'
        },
        {

            word: 'nucleosupraoptica'
        },
        {

            word: 'areapreoptica'
        },
        {

            word: 'areahipotalamicaanterior'
        },
        {

            word: 'nucleoparaventricu'
        },
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

        // Ajustar el tamaño de la caja de las letras dinámicamente
        const wordLength = word.length;
        const boxSize = wordLength <= 6 ? '50px' : wordLength <= 10 ? '40px' : '30px';
        const wordBoxes = document.querySelectorAll('.word-box');
        wordBoxes.forEach(box => {
            box.style.width = boxSize;
            box.style.height = boxSize;
            box.style.fontSize = boxSize === '50px' ? '20px' : boxSize === '40px' ? '18px' : '16px';
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
            nextLevelButton.style.display = 'block';
        }
    }

    // Cargar el nivel actual
    function loadLevel() {
        const level = levels[currentLevel];

        word = level.word.toLowerCase();
        guessedWord = Array(word.length).fill('_');
        isWordGuessed = false;

        // Mostrar solo la primera imagen
        gameImage.style.display = 'block';
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
