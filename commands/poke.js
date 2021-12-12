const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const { getPokemon } = require('./utils/pokemon')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke')
		.setDescription('Displays info about a given Pokemon.')
		.addStringOption(option => option.setName('pokemon').setDescription('The Pokemon you want to search for. Use (pokemon-region) for different forms.')),
	async execute(interaction) {
		await interaction.deferReply()
		const pokemon = interaction.options.getString('pokemon')

        const pokeData = await getPokemon(pokemon)
        const { name, sprites, stats, abilities, types, id } = pokeData
        var statsContent = ''
        var abilitiesContent = ''
        var typesContent = ''
        
        const embed = new MessageEmbed()
            embed.setThumbnail(`${sprites.front_shiny}`)
            embed.setTitle(`${name} #${id}`)
			embed.setColor('#893EB2')
            types.forEach(type => {
                typesContent += (type.type.name + ' ')
            })
            embed.addField('Type:', typesContent)
            abilities.forEach(ability => {
                if (ability.is_hidden == true) {
                    abilitiesContent += ('__' + ability.ability.name + '__')
                } else {
                    abilitiesContent += (ability.ability.name + '\n')
                }
            })
            embed.addField('Abilities:', abilitiesContent)
			stats.forEach(stat => {
                statsContent += (stat.stat.name + ': ' + stat.base_stat.toString() + '\n')
            })
            embed.addField('Base Stats:', statsContent)
		interaction.editReply({ embeds: [embed] })
	},
};