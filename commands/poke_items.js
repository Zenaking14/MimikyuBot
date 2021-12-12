const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getItem } = require('./utils/items.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke-item')
		.setDescription('Displays info about a given item.')
		.addStringOption(option => option.setName('item').setDescription('The item you want to search for. Use "-" in place of spaces.')),
	async execute(interaction) {
		await interaction.deferReply()
		const item = interaction.options.getString('item')

        const itemData = await getItem(item)
        const { name, sprites, category, effect_entries } = itemData
        
        const embed = new MessageEmbed()
            embed.setThumbnail(`${sprites.default}`)
            embed.setTitle(`${name}`)
			embed.setColor('#893EB2')
            embed.addFields(
                { name: 'Category:', value: `${category.name}` },
                { name: 'Effect:', value: `${effect_entries[0].short_effect}` },
            )
		interaction.editReply({ embeds: [embed] })
	},
};