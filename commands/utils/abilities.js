const fetch = require('node-fetch')
const base_url = 'https://pokeapi.co/api/v2/ability'

async function getAbility(ability) {
    let response = await fetch(`${base_url}/${ability}`)
    return await response.json()
}

module.exports = { getAbility }