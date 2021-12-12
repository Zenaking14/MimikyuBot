const fetch = require('node-fetch')
const base_url = 'https://pokeapi.co/api/v2/pokemon'

async function getPokemon(pokemon) {
    let response = await fetch(`${base_url}/${pokemon}`)
    return await response.json()
}

module.exports = { getPokemon }