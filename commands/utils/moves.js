const fetch = require('node-fetch')
const base_url = 'https://pokeapi.co/api/v2/move'

async function getMove(move) {
    let response = await fetch(`${base_url}/${move}`)
    return await response.json()
}

module.exports = { getMove }