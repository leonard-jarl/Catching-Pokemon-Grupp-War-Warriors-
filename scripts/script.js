const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod

function formValidation() {
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
    if (gender !== "pojke" || gender !== "flicka") {
      throw new Error("Kön måste vara pojke eller flicka");
    }

    gameStart();
    return true;
  } catch (error) {
    document.querySelector("#errorMsg").textContent = "Error: " + error.message;
  }
  return false;
}
