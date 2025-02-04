"use strict";

let oGameData = {};

window.addEventListener("load", () => {
  init();
  prepGame();
});

function init() {
  oGameData.pokemonNumbers = [];
  oGameData.nmbrOfCaughtPokemons = 0;
  oGameData.startTime = 0;
  oGameData.endTime = 0;
  oGameData.timerId = null;
  oGameData.nmbrOfSeconds = 0;
  oGameData.trainerName = "";
  oGameData.trainerAge = 0;
  oGameData.trainerGender = "";
}

function prepGame() {
  let startButton = document.getElementById("startButton");
  // randomPokemons();
  startButton.addEventListener("click", validateForm);
}

function validateForm() {
  oGameData.trainerName = document.querySelector("#nameInput").value;
  const age = document.querySelector("#ageInput").value;
  const gender = document.querySelector("#genderInput").value;

  try {
    if (oGameData.trainerName.length < 5 || oGameData.trainerName.length > 10) {
      throw new Error("namn måste vara mellan 5 och 10 tecken långt");
    }
    if (age < 10 || age > 15) {
      throw new Error("Ålder måste vara mellan 10 och 15 år gammal");
    }
    if (gender !== "Boy" && gender !== "Girl") {
      throw new Error("Kön måste vara pojke eller flicka");
    }

    gameStart();
    return true;
  } catch (error) {
    document.querySelector("#errorMsg").textContent = "Error: " + error.message;
  }
  return false;
}

document.querySelector("#startButton").addEventListener("click", function (e) {
  e.preventDefault();
});

// function randomPokemons() {
//   const allPokemons = [];

//   for (let i = 1; i < 152; i++) {
//     let pokemon = i;
//     allPokemons.push(pokemon);
//   }

//   for (let i = 1; i < 10 + 1; i++) {
//     let random = i;
//     random = Math.floor(Math.random() * allPokemons.length + 1);
//     let pokemon = random.toString().padStart(3, "0");
//     oGameData.pokemonNumbers.push(`assets/pokemons/${pokemon}.png`);
//   }
// }

function startTimer() {
  oGameData.startTime = Date.now();
  console.log("Game timer has started.");
  console.log("Start time (ms):", oGameData.startTime);
}

function gameStart() {
  let form = document.getElementById("gameStartSection");
  form.classList.add("d-none");
  let backgroundImage = document.querySelector("body");
  backgroundImage.style.backgroundImage = "url('/assets/arena.webp')";
  let audio = document.querySelector("audio");
  audio.play();
  startTimer();
  spawnPokemon();
  movePokemon();
  catchPokemon();
}

function stopTimer() {
  oGameData.endTime = Date.now();
  let totalMilliseconds = oGameData.endTime - oGameData.startTime;

  console.log("Game timer has stopped.");
  console.log("End time (ms):", oGameData.endTime);
  console.log("Total time (ms):", totalMilliseconds);
}

function gameOver() {
  stopTimer();
  getHighscores();
  saveHighscore();
  let scoreboard = document.getElementById("highScore");
  scoreboard.classList.remove("d-none");
  let restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", resetGame);
}

function resetGame() {
  init();
  let audio = document.querySelector("audio");
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
  let backgroundImage = document.querySelector("body");
  backgroundImage.style.backgroundImage = "url('/assets/background.jpg')";
  let scoreBoard = document.getElementById("highScore");
  scoreBoard.classList.add("d-none");
  let form = document.getElementById("gameStartSection");
  form.classList.remove("d-none");
  prepGame();
}
function spawnPokemon() {
  const gameField = document.querySelector("#gameField");
  if (!gameField) return;

  for (let i = 0; i < 10; i++) {
  const allPokemons = [];

  for (let i = 1; i < 152; i++) {
    let pokemon = i;
    allPokemons.push(pokemon);
  }

  for (let i = 1; i < 10 + 1; i++) {
    let random = i;
    random = Math.floor(Math.random() * allPokemons.length + 1);
    let pokemon = random.toString().padStart(3, "0");
    oGameData.pokemonNumbers.push(`assets/pokemons/${pokemon}.png`);
  }

  let pokemonRef = oGameData.pokemonNumbers.forEach(src => {
      let img = document.createElement('img');
      img.src = src;
      gameField.appendChild(img)
  })
  
    setInterval(() => movePokemon(pokemonRef), 3000);
  }
}

