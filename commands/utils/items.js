const fetch = require('node-fetch')
const base_url = 'https://pokeapi.co/api/v2/item'

async function getItem(item) {
    let response = await fetch(`${base_url}/${item}`)
    return await response.json()
}

module.exports = { getItem }