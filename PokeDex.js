async function fetchData(id) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + id;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Result: " + response.statusText)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

async function fetchName(id) {
    let url = "https://pokeapi.co/api/v2/pokemon-species/" + id;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Results: " + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

let pokeNum = 1;

let showInfo = true;

const sprite = document.getElementById("sprite");
const pokeName = document.getElementById("name");
const type = document.getElementById("types");

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

const header = document.getElementById("header");
const description = document.getElementById("description");

const info = document.getElementById("info");
const move = document.getElementById("moves");

const color = {
    normal: "#A8A77A",
    fighting: "#C22E28", 
    flying: "#A98FF3", 
    poison: "#A33EA1",
    ground: "#E2BF65",  
    rock: "#B6A136", 
    bug: "#A6B91A",  
    ghost: "#735797",  
    steel: "#B7B7CE",  
    fire: "#EE8130", 
    water: "#6390F0", 
    grass: "#7AC74C", 
    electric: "#F7D02C", 
    psychic: "#F95587", 
    ice: "#96D9D6", 
    dragon: "#6F35FC", 
    dark: "#705746", 
    fairy: "#D685AD", 
}

async function update(num) {
    const data = await fetchData(num);
    let actName = await fetchName(num);
    pokeName.textContent = actName.names.find(item => item.language.name === 'en').name;
    
    sprite.src = data.sprites.front_default;

    type.replaceChildren();

    let types = data.types; 

    let type1 = document.createElement("div");
    let name1 = types[0].type.name;
    let type2;
    let name2; 

    type1.className = "type"
    type1.textContent = name1
    type1.style.backgroundColor = color[name1];
   
    type.appendChild(type1);
    if (types.length == 2) {
        type2 = document.createElement("div");

        type2.className = "type";
        name2 = types[1].type.name;

        type2.textContent = name2;
        type2.style.backgroundColor = color[name2];

        type.appendChild(type2);
    }

    if (showInfo) {
        header.textContent = "Info"

        let stats = data.stats;

        let height = data.height / 10;
        let weight = data.weight / 10;
        let hp = stats[0]["base_stat"];
        let att = stats[1]["base_stat"];
        let def = stats[2]["base_stat"];
        let spA = stats[3]["base_stat"];
        let spD = stats[4]["base_stat"];
        let speed = stats[5]["base_stat"];

        desc = "Height: " + height + "m \n" + 
                "Weight: " + weight + "kg \n" +
                "HP: " + hp +
                "\nAttack: " + att +
                "\nDefense: " + def +
                "\n Special Attack: " + spA + 
                "\n Special Defense: " + spD +
                "\nSpeed: " + speed;  
        
        description.textContent = desc;
    } else {
        header.textContent = "Moves"

        let text = ""
        let arr = data.moves;

        text += arr[0].move.name
        for( let i=1; i < arr.length; i++) {
            text += ",\n" +  arr[i].move.name 
        }

        description.textContent = text;
    }
};

update(1);

leftButton.addEventListener("click", () => {
    pokeNum -= 1;
    if (pokeNum <= 0) {
        pokeNum = 1025;
    }

    leftButton.style.backgroundColor = "rgba(156, 156, 156, 1)";

    setTimeout(() => {
        leftButton.style.backgroundColor = "rgb(210, 210, 210)";
    }, 100);
   
    update(pokeNum);
});

rightButton.addEventListener("click", () => {
    pokeNum += 1;
    if (pokeNum > 1025) {
        pokeNum = 1;
    }
   
    update(pokeNum);

    rightButton.style.backgroundColor = "rgba(156, 156, 156, 1)";

    setTimeout(() => {
        rightButton.style.backgroundColor = "rgb(210, 210, 210)";
    }, 100);
});

move.addEventListener("click", () => {
    setTimeout(() => {
        move.style.backgroundColor = "rgb(127, 254, 125)";
    }, 100);
    move.style.backgroundColor = "rgba(98, 201, 97, 1)";
    info.style.backgroundColor = "rgb(210, 210, 210)";

    showInfo = false;
    update(pokeNum);
});

info.addEventListener("click", () => {
    setTimeout(() => {
        info.style.backgroundColor = "rgb(127, 254, 125)";
    }, 100);
    info.style.backgroundColor = "rgba(98, 201, 97, 1)";
    move.style.backgroundColor = "rgb(210, 210, 210)";

    showInfo = true;
    update(pokeNum);
});

