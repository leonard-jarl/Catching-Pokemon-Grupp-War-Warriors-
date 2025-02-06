window.addEventListener("load", () =>
  document.getElementById("startButton").addEventListener("click", validateForm)
);
function validateForm(e) {
  e.preventDefault();
  oGameData.trainerName = document.querySelector("#nameInput").value;
  oGameData.trainerAge = document.querySelector("#ageInput").value;
  oGameData.trainerGender = document.querySelector("#genderInput").value;
  try {
    if (oGameData.trainerName.length < 5 || oGameData.trainerName.length > 10) throw new Error("namn måste vara mellan 5 och 10 tecken långt");
    if (oGameData.trainerAge < 10 || oGameData.trainerAge > 15) throw new Error("Ålder måste vara mellan 10 och 15 år gammal");
    if (oGameData.trainerGender !== "Boy" && oGameData.trainerGender !== "Girl") throw new Error("Kön måste vara pojke eller flicka");
    gameStart();
  } catch (error) {
    document.querySelector("#errorMsg").textContent = "Error: " + error.message;
  }
}
function gameStart() {
  document.getElementById("gameStartSection").classList.add("d-none");
  document.querySelector("body").style.backgroundImage = "url('/assets/arena.webp')";
  document.getElementById('gameField').classList.remove("d-none");
  document.querySelector("audio").play();
  oGameData.startTime = Date.now();
  spawnPokemon();
}
function gameOver() {
  oGameData.endTime = Date.now() - oGameData.startTime;
  saveScore();
  document.getElementById("highScore").classList.remove("d-none");
  document.getElementById("restartButton").addEventListener("click", resetGame);
}
function resetGame() {
  oGameData.init();
  let audio = document.querySelector("audio");
  if (!audio.paused) audio.pause(), (audio.currentTime = 0);
  document.querySelector("body").style.backgroundImage = "url('/assets/background.jpg')";
  document.getElementById("highScore").classList.add("d-none");
  document.getElementById("StartForm").reset();
  document.getElementById("gameStartSection").classList.remove("d-none");
  document.querySelectorAll('#gameField img').forEach(img => img.remove());
  document.getElementById('errorMsg').textContent = '';
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
    const imgRef = document.createElement("img");
    if (pokemonObj.released.active == true){
      imgRef.src = pokemonObj.released.src
    } else if (pokemonObj.caught.active == true){
      imgRef.src = pokemonObj.caught.src
    }
    imgRef.addEventListener("mouseover", () => catchPokemon(imgRef, pokemonObj))
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
  img.style.top = oGameData.getTopPosition() + "px";
  img.style.left = oGameData.getLeftPosition() + "px";
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