const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod

// Event listener som ska anropa startTimer när Start-knappen clickas.
document.getElementById("startButton").addEventListener("click", function () {
  startTimer();
});

// Function för att starta timern när spelet börjar.
function startTimer() {
  oGameData.startTimeInMilliseconds();
  console.log("Game timer has started.");
  console.log("Start time (ms):", oGameData.startTime);
}
