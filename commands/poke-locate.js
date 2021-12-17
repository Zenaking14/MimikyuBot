const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getPokemon, getPokeLocation } = require('./utils/pokemon')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke-locate')
		.setDescription('Displays locations of a given Pokemon.')
		.addStringOption(option => option.setName('pokemon').setDescription('The Pokemon you want to search for. Use (pokemon-region) for different forms.')),
	async execute(interaction) {
		await interaction.deferReply()
		const pokemon = interaction.options.getString('pokemon')
        try {
            const pokeData = await getPokemon(pokemon)
            const { name, sprites, id } = pokeData
            const pokeLocationData = await getPokeLocation(pokemon)
            var spritesContent = ''
            var versionNameContent = ''
        
            const embed = new MessageEmbed()
                if (sprites.front_shiny != null) {
                    spritesContent += sprites.front_shiny
                }
                pokeLocationData.forEach(location => {
                    location.version_details.forEach(encounter => {
                        versionNameContent += encounter.version.name + ', '
                    })
                    versionNameContent = versionNameContent.slice(0, versionNameContent.lastIndexOf(','))
                    versionNameContent += ': ' + '```' + location.location_area.name + '```' + '\n'
                })
                embed.setThumbnail(spritesContent)
                embed.setTitle(`${name} #${id}`)
			    embed.setColor('#893EB2')
                embed.addFields(
                    { name: 'Locations: ', value: versionNameContent }
                )
		    interaction.editReply({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            interaction.editReply('This pokemon could not be found!')
        }
	},
};