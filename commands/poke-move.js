const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getMove } = require('./utils/moves.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke-move')
		.setDescription('Displays info about a given move.')
		.addStringOption(option => option.setName('move').setDescription('The move you want to search for. Use "-" in place of spaces.')),
	async execute(interaction) {
		await interaction.deferReply()
		const move = interaction.options.getString('move')
        try {
			const moveData = await getMove(move)
			const { id, name, accuracy, effect_chance, pp, priority, power, damage_class, effect_entries, type } = moveData
			var effectContent = '\n'
            var powerContent = '\n'
            var accuracyContent = '\n'
            var damageContent = '\n'
            var ppContent = '\n'
            var entriesContent = '\n'

            if(effect_chance != null) {
                effectContent += effect_chance.toString()
            } else {
                effectContent += 'none'
            }
            if(power != null) {
                powerContent += power.toString()
            } else {
                powerContent += 'none'
            }
            if(accuracy != null) {
                accuracyContent += accuracy.toString()
            } else {
                accuracyContent += 'none'
            }
            if(damage_class != null) {
                damageContent += damage_class.name
            } else {
                damageContent += 'none'
            }
            if(pp != null) {
                ppContent += pp.toString()
            } else {
                ppContent += 'none'
            }
            if(effect_entries.length != 0) {
                entriesContent += effect_entries[0].short_effect.replace('$effect_chance', effect_chance.toString())
            } else {
                entriesContent += 'none'
            }

			const embed = new MessageEmbed()
				embed.setTitle(`${name} #${id}`)
				embed.setColor('#893EB2')
				embed.addFields(
                    { name: 'Type:', value: '```' + `${type.name}` + '```' },
					{ name: 'Power:', value: '```' + powerContent + '```', inline: true },
                    { name: 'Accuracy:', value: '```' + accuracyContent + '```', inline: true},
                    { name: 'PP:', value: '```' + ppContent + '```', inline: true },
                    { name: 'Effect Chance:', value: '```' + effectContent + '```' },
                    { name: 'Damage Type:', value: '```' + damageContent + '```', inline: true },
                    { name: 'Priority:', value: '```' + `${priority.toString()}` + '```', inline: true },
					{ name: 'Effect:', value: '```' + entriesContent + '```' }
				)
			interaction.editReply({ embeds: [embed] })
		} catch (error) {
			interaction.editReply('This move does not exist!')
		}
	},
};