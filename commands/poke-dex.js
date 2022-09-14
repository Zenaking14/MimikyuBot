const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { version } = require('os');
const { getPokedex } = require('./utils/pokedex.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke-dex')
		.setDescription('Displays a given regional Pokedex.')
		.addStringOption(option => option.setName('region').setDescription('The regional Pokedex you want to search for. (10 does not work)')),
	async execute(interaction) {
		await interaction.deferReply()
		const gen = interaction.options.getString('region')
        try {
			const dexData = await getPokedex(gen)
			const { id, pokemon_entries, version_groups, region, name } = dexData
            var pokeContent = '\n'

            if (gen == 1 || gen == 'national') {
                pokeContent += 'national dex, too long for discord embeds, try other regional dexes.'

                const embed = new MessageEmbed()
                embed.setTitle(`${name} #${id}`)
			    embed.setColor('#893EB2')
                embed.setDescription('```' + pokeContent + '```')
                await interaction.editReply({ embeds: [embed] })
            } else {
                if (version_groups.length != 0) {
                    pokeContent += '**' + 'Dex Name: ' + name + '**\n\n'
                    pokeContent += '**' + 'Games in the ' + region.name + ' region:' + '**'
                } else {
                    var pokeContent = '**' + 'Games included the ' + name + ' dex:' + '**'
                }
                
                pokeContent += '```'
                if (version_groups.length != 0) {
                    version_groups.forEach(gameRelease => {
                        pokeContent += '\n' + gameRelease.name
                    })
                } else {
                    pokeContent += 'not main series'
                }
                pokeContent += '```'
    
                pokeContent += '\n' + '**' + 'Pokemon:' + '**\n' + '```'
                pokemon_entries.forEach(pokemon => {
                    pokeContent += '#' + pokemon.entry_number.toString() + ' ' + pokemon.pokemon_species.name + ' \n'
                })
                const embed = new MessageEmbed()
                const embed2 = new MessageEmbed() /////////// add poke-learn command that shows what moves a pokemon can learn

                var pContent = pokeContent.substring(0, 4000)
                for (var i = 4000; i > 0; i -= 1) {
                    if (pContent.charAt(i) === ' ' && pContent.charAt(i + 1) === '\n') {
                        var embedStart = i
                        pContent = pokeContent.substring(0, i)
                        break
                    }
                }
                if (region != null) {
                    embed.setTitle(`${region.name} #${id}`)
                } else {
                    embed.setTitle(`${name} #${id}`)
                }
                embed.setColor('#893EB2')
                embed.setDescription(pContent + '```')
                await interaction.editReply({ embeds: [embed] })

                var pContent2 = pokeContent.substring(embedStart, 8000)
                if (pokeContent.length >= 4000) {
                    for (var i = 8000; i > 4000; i -= 1) {
                        if (pContent2.charAt(i) === ' ' && pContent2.charAt(i + 1) === '\n') {
                            pContent2 = pokeContent.substring(embedStart, i)
                            break
                        }
                    }
                    if (region != null) {
                        embed2.setTitle(`${region.name} #${id}`)
                    } else {
                        embed2.setTitle(`${name} #${id}`)
                    }
                    embed2.setColor('#893EB2')
                    embed2.setDescription('```' + pContent2 + '```')
                    await interaction.followUp({ embeds: [embed2] })
                }
            }
		} catch (error) {
			interaction.editReply('This Pokedex does not exist!')
		}
	},
};