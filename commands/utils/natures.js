const fetch = require('node-fetch')
const base_url = 'https://pokeapi.co/api/v2/nature'

async function getNature(nature) {
    let response = await fetch(`${base_url}/${nature}`)
    return await response.json()
}

module.exports = { getNature }