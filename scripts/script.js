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
  randomPokemons();
  startButton.addEventListener("click", validateForm);
}

function validateForm() {
  const name = document.querySelector("#nameInput").value;
  const age = document.querySelector("#ageInput").value;
  const gender = document.querySelector("#genderInput").value;

  try {
    if (name.length >= 5 && name.length >= 10) {
      throw new Error("namn måste vara mellan 5 och 10 tecken långt");
    }
    if (age < 9 || age > 15) {
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

function randomPokemons() {
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
}

function startTimer() {
  let gameStartTime = Date.now();
  console.log("Game timer has started.");
  console.log("Start time (ms):", gameStartTime);
}

function gameStart() {
    let form = document.getElementById('gameStartSection');
    form.classList.add('d-none');
    let backgroundImage = document.querySelector('body');
    backgroundImage.style.backgroundImage = "url('/assets/arena-background.png')";
    let audio = document.querySelector('audio');
    audio.play();
    startTimer();
    movePokemon();
    catchPokemon();
}

stopTimer()

function stopTimer() {
  let gameStopTime = Date.now();
  console.log("Game timer has started.");
  console.log("Start time (ms):", gameStopTime);
}

function saveScore () {
  let highScores = getHighScores();
  let player = {
    name: oGameData.trainerName,
    time: oGameData.endTime
  }

  highScores.push(player);

  highScores.sort((a, b) => a.time - b.time);
  if(highScores.length > 10){
    highScores = highScores.slice(0, 10);
  }

  localStorage.setItem('highscores', JSON.stringify(highScores));

}