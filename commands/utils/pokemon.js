const fetch = require('node-fetch')
const base_url = 'https://pokeapi.co/api/v2/pokemon'
const poke_species_url = 'https://pokeapi.co/api/v2/pokemon-species'

async function getPokemon(pokemon) {
    let response = await fetch(`${base_url}/${pokemon}`)
    return await response.json()
}

async function getPokeSpecies(name) {
    let response2 = await fetch(`${poke_species_url}/${name}`)
    return await response2.json()
}

async function getPokeLocation(pokemon) {
    let response3 = await fetch(`${base_url}/${pokemon}/encounters`)
    return await response3.json()
}

module.exports = { getPokemon, getPokeSpecies, getPokeLocation }