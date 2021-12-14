const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getAbility } = require('./utils/abilities.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke-ability')
		.setDescription('Displays info about a given ability')
		.addStringOption(option => option.setName('ability').setDescription('The ability you want to search for. Use "-" in place of spaces.')),
	async execute(interaction) {
		await interaction.deferReply()
		const ability = interaction.options.getString('ability')
        try {
            const abilityData = await getAbility(ability)
            const { name, effect_entries, pokemon } = abilityData
            var pokeContent = ''
            
            const embed = new MessageEmbed()
                pokemon.forEach(poke => {
                    if (poke.is_hidden == true) {
                        pokeContent += ('__' + poke.pokemon.name + '__\n')
                    } else {
                        pokeContent += (poke.pokemon.name + '\n')
                    }
                })
                embed.setTitle(`${name}`)
                embed.setColor('#893EB2')
                embed.addFields(
                    { name: 'Effect:', value: `${effect_entries[1].effect}` },
                    { name: 'Pokemon with ' + `${name}` + ':', value: pokeContent }
                )
            interaction.editReply({ embeds: [embed] })
        } catch (error) {
            interaction.editReply('This ability does not exist!')
        }
	},
};