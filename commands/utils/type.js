const fetch = require('node-fetch')
const base_url = 'https://pokeapi.co/api/v2/type'

async function getType(type) {
    let response = await fetch(`${base_url}/${type}`)
    return await response.json()
}

module.exports = { getType }