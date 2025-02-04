// Function to generate a random RGB color
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

// Variables
let correctColor;
let score = 0;

// DOM Elements
const colorBox = document.querySelector("#colorBox");
const colorOptions = document.querySelectorAll(".colorOption");
const gameStatus = document.querySelector("#gameStatus");
const scoreDisplay = document.querySelector("#score");
const newGameButton = document.querySelector("#newGameButton");

// Function to start a new game
const startGame = () => {
    // Generate the correct color
    correctColor = getRandomColor();
    colorBox.style.backgroundColor = correctColor;

    // Generate five random colors + correct color
    let colors = [correctColor];
    while (colors.length < 6) {
        let randomColor = getRandomColor();
        if (!colors.includes(randomColor)) {
            colors.push(randomColor);
        }
    }

    // Shuffle colors randomly
    colors.sort(() => Math.random() - 0.5);

    // Assign colors to buttons
    colorOptions.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.dataset.color = colors[index];

        // Reset animation
        button.classList.remove("correct-animation", "incorrect-animation");
    });

    // Reset game status message
    gameStatus.textContent = "Guess the correct color!";
};

// Event listeners for color options
colorOptions.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedColor = button.dataset.color;
        
        if (selectedColor === correctColor) {
            gameStatus.textContent = "✅ Correct!";
            score++;
            scoreDisplay.textContent = `Score: ${score}`;

            // Add animation for correct answer
            button.classList.add("correct-animation");
        } else {
            gameStatus.textContent = "❌ Wrong! Try again.";

            // Add animation for incorrect answer
            button.classList.add("incorrect-animation");
        }
    });
});

// New Game Button
newGameButton.addEventListener("click", startGame);

// Start the game on page load
startGame();
