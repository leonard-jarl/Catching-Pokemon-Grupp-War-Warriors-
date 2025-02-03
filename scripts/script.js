"use strict";

let oGameData = {};

window.addEventListener('load', () => {
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
    oGameData.trainerName = '';
    oGameData.trainerAge = 0;
    oGameData.trainerGender = '';
}

function prepGame() {
    let startButton = document.getElementById('startButton');
    randomPokemon();
    startButton.addEventListener('click', validateForm);
}

function validateForm() {
  const name = document.querySelector("#nameInput").value;
  const age = document.querySelector("#ageInput").value;
  const gender = document.querySelector("#genderInput").value;

  try {
    if (name.length <= 5 || name.length >= 10) {
      throw new Error("namn måste vara mellan 5 och 10 tecken långt");
    }
    if (age <= 10 || age > 15) {
      throw new Error("Ålder måste vara mellan 10 och 15 år gammal");
    }
    if (gender !== "Boy" || gender !== "Girl") {
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