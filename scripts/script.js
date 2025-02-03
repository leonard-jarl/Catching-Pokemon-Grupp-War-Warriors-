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