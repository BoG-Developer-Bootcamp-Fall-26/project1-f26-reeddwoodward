async function fetchData(id) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + id;

    try {
        const response = await fetch (url);

        if (!response.ok) {
            throw new Error("Result: " + response.statusText)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
let pokeNum = 1;

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

const info = document.getElementById("description");


function update(data) {
    info.textContent = data;
};

leftButton.addEventListener("click", async () => {
    pokeNum -= 1;
    if (pokeNum <= 0) {
        pokeNum = 1025;
    }
    let data = await fetchData(pokeNum);
    if (!data) {
        data = "error"
    }
    update(data.name);
});

rightButton.addEventListener("click", async () => {
    pokeNum += 1;
    if (pokeNum > 1025) {
        pokeNum = 1;
    }
    let data = await fetchData(pokeNum);
    if (!data) {
        data = "error"
    }
    update(data.name);
});

