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

const sprite = document.getElementById("sprite");
const pokeName = document.getElementById("name");
const type = document.getElementById("types");

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

const description = document.getElementById("description");

const info = document.getElementById("info");
const moves = document.getElementById("moves");



async function update(data) {
    actName = await fetchName(pokeNum)
    pokeName.textContent = actName.names.find(item => item.language.name === 'en').name;
    sprite.src = data.sprites.front_default;
    description.textContent = data;
};

leftButton.addEventListener("click", async () => {
    pokeNum -= 1;
    if (pokeNum <= 0) {
        pokeNum = 1025;
    }
    const data = await fetchData(pokeNum);
    if (!data) {
        data = "error"
    }
    update(data);
});

rightButton.addEventListener("click", async () => {
    pokeNum += 1;
    if (pokeNum > 1025) {
        pokeNum = 1;
    }
    const data = await fetchData(pokeNum);
    if (!data) {
        data = "error"
    }
    update(data);
});

