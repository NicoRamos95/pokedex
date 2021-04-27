const pokemons = []
var pokemon = {}

fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
.then(data => data.json())
.then(data => pokemons.push(...data.results))

function findMatches(wordToMatch, pokemons) {
    return pokemons.filter(pokemon => {
        const regex = new RegExp(wordToMatch, 'gi')
        return pokemon.name.match(regex)
    });
}
function displayMatches(e) {
    const matchedArray = findMatches(e.target.value, pokemons)
    console.log(matchedArray)
    const table = matchedArray.map((props, index) => {
        const regex = new RegExp(e.target.value, 'gi')
        console.log(props.url)
        const name = props.name.replace(regex,
            `<span>${e.target.value}</span>`)
        console.log(name)
        return `
            <tr class="">
                <th scope="row">${index}</th>
                <td>${name}</td>
                <td>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" 
                onClick="modal('${props.url}')" id="${props.url}"
                class="btn btn-danger">Consultar</button>
                </td>
            </tr>
            `
        }).join('')
    tBody.innerHTML = table
}
async function modal(url){
    const response = await fetch(url);
    pokemon = await response.json()

    const body = document.querySelector('.card-body')
    const img = document.querySelector('.pokeImg')
    
    body.innerHTML = `
    <h1 class="card-title text-center">${pokemon.name}</h1>
    <p class="card-text">Experience base: ${pokemon.base_experience}</p>
    <p class="card-text">Height: ${pokemon.height}</p>
    <p class="card-text">Weight: ${pokemon.weight}</p>
    <div class="card-header">
        Type:
    </div>
    <ul class="list-group list-group-flush">
        ${pokemon.types.map(prop => 
            `<li class="list-group-item">${prop.type.name}</li>`).flat().join('')}
    </ul>
    <div class="card-header">
        Abilities: 
    </div>
    <ul class="list-group list-group-flush">
        ${pokemon.abilities.map(prop => 
            `<li class="list-group-item">${prop.ability.name}</li>`).flat().join('')}
    </ul>
    `
    img.setAttribute("src", pokemon.sprites.other.dream_world.front_default)
}
const search = document.querySelector('.search')
const tBody = document.querySelector('.tBody')

search.addEventListener('change', displayMatches)
search.addEventListener('keyup', displayMatches)