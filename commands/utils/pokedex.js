const fetch = require('node-fetch')
const base_url = 'https://pokeapi.co/api/v2/pokedex'

async function getPokedex(gen) {
    let response = await fetch(`${base_url}/${gen}`)
    return await response.json()
}

module.exports = { getPokedex }