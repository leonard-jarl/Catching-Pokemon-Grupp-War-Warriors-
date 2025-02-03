const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod

randomPokemons();

function randomPokemons () {
    const allPokemons = [];    

    for (let i = 1; i < 152; i++){
        let pokemon = i  
        allPokemons.push(pokemon);
    }

    for (let i = 1; i < 10 + 1; i++) {
        let random = i;
        random = Math.floor(Math.random() * allPokemons.length + 1);
        let pokemon = random.toString().padStart(3,"0");
        oGameData.pokemonNumbers.push(`assets/pokemons/${pokemon}.png`);
    }
}

console.log(oGameData.pokemonNumbers);

// let mainRef = document.querySelector('main');
// let pokemonRef = oGameData.pokemonNumbers.forEach(src => {
//     let img = document.createElement('img');
//     img.src = src;
//     mainRef.appendChild(img)
// })











