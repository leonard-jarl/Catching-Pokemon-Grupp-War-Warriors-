"use strict";

window.addEventListener("load", () => {
  prepGame();
});

function prepGame() {
  let startButton = document.getElementById("startButton");
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
  gameField.classList.remove("d-none");
  let audio = document.querySelector("audio");
  audio.play();
  startTimer();
  spawnPokemon();
  movePokemon();
  catchPokemon();
}

function stopTimer() {
  oGameData.endTime = Date.now();
  oGameData.endTime = oGameData.endTime - oGameData.startTime;
}

function gameOver() {
  stopTimer();
  getHighScores();
  saveScore();
  let scoreboard = document.getElementById("highScore");
  scoreboard.classList.remove("d-none");
  let restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", resetGame);
}

function resetGame() {
  oGameData.init();

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
  document.getElementById("StartForm").reset();
  form.classList.remove("d-none");
  let pokemonImages = document.querySelectorAll('#gameField img');
  pokemonImages.forEach(img => img.remove());

  prepGame();

console.log(oGameData.pokemonNumbers); // Check if it's an array
console.log(oGameData.pokemonNumbers.length); // Check length of the array

}

function spawnPokemon() {
  const gameField = document.querySelector("#gameField");
  if (!gameField) return;

  const pokemonElements = [];

  const allPokemons = [];
  for (let i = 1; i < 152; i++) {
    allPokemons.push(i);
  }

  for (let i = 0; i < 10; i++) {
    let random = Math.floor(Math.random() * allPokemons.length) + 1;
    let pokemonNumber = random.toString().padStart(3, "0");

    const pokemonObj = {
      released: {
        src: `assets/pokemons/${pokemonNumber}.png`,
        active: true },
      caught: {
        src: 'assets/ball.webp',
        active: false }
    };

    oGameData.pokemonNumbers.push(pokemonObj);
    console.log(pokemonObj)

    const imgRef = document.createElement("img");
    if (pokemonObj.released.active == true){
      imgRef.src = pokemonObj.released.src
    } else if (pokemonObj.caught.active == true){
      imgRef.src = pokemonObj.caught.src
    }

    imgRef.addEventListener("mouseover", () => {
      catchPokemon(imgRef, pokemonObj)
    })

    gameField.appendChild(imgRef);

    movePokemon([imgRef]);

    pokemonElements.push(imgRef);
  }
  setInterval(() => movePokemon(pokemonElements), 3000);
}

function catchPokemon(imgRef, pokemonObj) {
  if (pokemonObj.released.active == true){
    pokemonObj.caught.active = true
    pokemonObj.released.active = false
  } else if (pokemonObj.released.active == false){
    pokemonObj.caught.active = false
    pokemonObj.released.active = true
  }

  if (pokemonObj.released.active) {
    imgRef.src = pokemonObj.released.src;
  } else {
    imgRef.src = pokemonObj.caught.src;
  }
  if (oGameData.pokemonNumbers.every(obj => obj.caught.active == true)){
    gameField.classList.add('d-none')
    gameOver()
  }
} 

function movePokemon(pokemonElements) {
  pokemonElements.forEach((img) => {
    const topPosition = oGameData.getTopPosition();
    const leftPosition = oGameData.getLeftPosition();
    img.style.top = topPosition + "px";
    img.style.left = leftPosition + "px";
  });
}

function getHighScores() {
  let highScoresData = localStorage.getItem("highscores");
  let highScores;
  if (highScoresData == null) {
    highScores = [];
  } else {
    highScores = JSON.parse(highScoresData);
  }

  return highScores;
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

  insertHighScore(highScores);
}

function insertHighScore (highScores) {
  let highScoresList = document.querySelector('#highscoreList')

  highScoresList.textContent = ""
  
  for (let i = 0; i < highScores.length; i++){
    let listItem = i
    listItem = document.createElement('li')
    listItem.classList.add('high-score__list-item')
    listItem.textContent = `Player: ${highScores[i].name} Time: ${highScores[i].time}`
    highScoresList.appendChild(listItem)
  }
}
  


  




