const colorBox = document.querySelector("#colorBox");
const colorOptions = document.querySelectorAll(".colorOption");
const gameStatus = document.querySelector("#gameStatus");
const scoreDisplay = document.querySelector("#score");
const newGameButton = document.querySelector("#newGameButton");

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

let correctColor;
let score = 0;
let hasAnswered = false;

const startGame = (resetScore = false) => {
  correctColor = getRandomColor();
  colorBox.style.backgroundColor = correctColor;
  hasAnswered = false;

  if (resetScore) {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
  }

  let colors = [correctColor];
  while (colors.length < 6) {
    let randomColor = getRandomColor();
    if (!colors.includes(randomColor)) {
      colors.push(randomColor);
    }
  }

  colors.sort(() => Math.random() - 0.5);

  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = colors[index];
    button.dataset.color = colors[index];

    button.classList.remove("correct-animation", "incorrect-animation");
  });

};

colorOptions.forEach((button) => {
  button.addEventListener("click", () => {
    if (hasAnswered) return;

    const selectedColor = button.dataset.color;

    if (selectedColor === correctColor) {
      gameStatus.textContent = "✅ Correct!";
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      button.classList.add("correct-animation");
      hasAnswered = true;

      startGame();
    } else {
      gameStatus.textContent = "❌ Wrong! Try again.";
      button.classList.add("incorrect-animation");
    }
  });
});

newGameButton.addEventListener("click", () => startGame(true));


startGame();
