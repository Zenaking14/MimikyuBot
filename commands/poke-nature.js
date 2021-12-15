const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getNature } = require('./utils/natures.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke-nature')
		.setDescription('Displays info about a given nature.')
		.addStringOption(option => option.setName('nature').setDescription('The nature you want to search for. Use "-" in place of spaces.')),
	async execute(interaction) {
		await interaction.deferReply()
		const nature = interaction.options.getString('nature')
        try {
			const natureData = await getNature(nature)
			const { name, decreased_stat, increased_stat, id } = natureData
			
			const embed = new MessageEmbed()
				embed.setTitle(`${name} #${id}`)
				embed.setColor('#893EB2')
				embed.addFields(
					{ name: 'Increases:', value: `${increased_stat.name}` },
					{ name: 'Decreases:', value: `${decreased_stat.name}` },
				)
			interaction.editReply({ embeds: [embed] })
		} catch (error) {
			interaction.editReply('This nature does not exist!')
		}
	},
};