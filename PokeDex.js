async function fetchData(id) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + id;

    try {
        const response = await fetch (url);

        if (!response.ok) {
            throw new Error("status: " + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
} 

const data = await fetchData(1);

if (data) {
    console.log(data.name);
    console.log(data.stats[0].base_stat);
}