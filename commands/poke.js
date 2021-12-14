const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getPokemon } = require('./utils/pokemon')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke')
		.setDescription('Displays info about a given Pokemon.')
		.addStringOption(option => option.setName('pokemon').setDescription('The Pokemon you want to search for. Use (pokemon-region) for different forms.')),
	async execute(interaction) {
		await interaction.deferReply()
		const pokemon = interaction.options.getString('pokemon')
        try {
            const pokeData = await getPokemon(pokemon)
            const { name, sprites, stats, abilities, types, id } = pokeData
            var statsContent = ''
            var abilitiesContent = ''
            var typesContent = ''
        
            const embed = new MessageEmbed()
                types.forEach(type => {
                    typesContent += (type.type.name + ' ')
                })
                abilities.forEach(ability => {
                    if (ability.is_hidden == true) {
                        abilitiesContent += ('__' + ability.ability.name + '__')
                    } else {
                        abilitiesContent += (ability.ability.name + '\n')
                    }
                })
			    stats.forEach(stat => {
                    statsContent += (stat.stat.name + ': ' + stat.base_stat.toString() + '\n')
                })
                embed.setThumbnail(`${sprites.front_shiny}`)
                embed.setTitle(`${name} #${id}`)
			    embed.setColor('#893EB2')
                embed.addFields(
                    { name: 'Type:', value: typesContent },
                    { name: 'Abilities:', value: abilitiesContent },
                    { name: 'Base Stats:', value: statsContent }
                )
		    interaction.editReply({ embeds: [embed] })
        } catch (error) {
            interaction.editReply('This pokemon does not exist!')
        }
	},
};