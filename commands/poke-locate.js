const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getPokemon, getPokeLocation } = require('./utils/pokemon')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke-locate')
		.setDescription('Displays locations of a given Pokemon.')
		.addStringOption(option => option.setName('pokemon').setDescription('The Pokemon you want to search for. Use (pokemon-region) for different forms.'))
        .addStringOption(option => option.setName('game').setDescription('The version you want to search.')),
	async execute(interaction) {
		await interaction.deferReply()
		const pokemon = interaction.options.getString('pokemon')
        const game = interaction.options.getString('game')
        try {
            const pokeData = await getPokemon(pokemon)
            const { name, sprites, id } = pokeData
            const pokeLocationData = await getPokeLocation(pokemon)
            var spritesContent = ''
            var versionNameContent = 'Version: ' + game + '\n'
            versionNameContent += 'Locations:\n'

            if (sprites.front_shiny != null) {
                spritesContent += sprites.front_shiny
            } else {
                spritesContent += sprites.front_default
            }

            pokeLocationData.forEach(location => {
                location.version_details.forEach(encounter => {
                    if (game == encounter.version.name) {
                        versionNameContent += '\n' + 'Area: ' + location.location_area.name + '\n'
                        encounter.encounter_details.forEach(method => {
                            if (method.condition_values[0] != undefined && method.condition_values[0] != null) {
                                versionNameContent += 'Method: ' + method.method.name + ', Chance: ' + method.chance.toString() + ', Conditions: ' + method.condition_values[0].name + ' \n'
                            } else {
                                versionNameContent += 'Method: ' + method.method.name + ', Chance:' + method.chance.toString() + ' \n'
                            }
                        })
                    }
                })
            })

            var embed = new MessageEmbed()
            var embed2 = new MessageEmbed()

            embed.setThumbnail(spritesContent)
            embed.setTitle(`${name} #${id}`)
			embed.setColor('#893EB2')

            var VNContent = versionNameContent.substring(0, 3800)
            for (var i = 3800; i > 0; i -= 1) {
                if (VNContent.charAt(i) === ' ' && VNContent.charAt(i + 1) === '\n') {
                    var embedStart = i
                    VNContent = versionNameContent.substring(0, i)
                    break
                }
            }
            embed.setDescription('```' + VNContent + '```')
            await interaction.editReply({ embeds: [embed] })

            var VNContent2 = versionNameContent.substring(embedStart, 7600)
            if (versionNameContent.length >= 3800) {
                for (var i = 7600; i > 3800; i -= 1) {
                    if (VNContent2.charAt(i) === ' ' && VNContent2.charAt(i + 1) === '\n') {
                        VNContent2 = versionNameContent.substring(embedStart, i)
                        break
                    }
                }
                embed2.setThumbnail(spritesContent)
                embed2.setTitle(`${name} #${id}`)
			    embed2.setColor('#893EB2')
                embed2.setDescription('```' + VNContent2 + '```')
                await interaction.followUp({ embeds: [embed2] })
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('This pokemon could not be found!')
        }
	},
};