const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { getType } = require('./utils/type.js')
const bug = new MessageAttachment('./commands/type_images/Bug.jpg')
const dark = new MessageAttachment('./commands/type_images/Dark.jpg')
const dragon = new MessageAttachment('./commands/type_images/Dragon.jpg')
const electric = new MessageAttachment('./commands/type_images/Electric.jpg')
const fairy = new MessageAttachment('./commands/type_images/Fairy.jpg')
const fire = new MessageAttachment('./commands/type_images/Fire.jpg')
const flying = new MessageAttachment('./commands/type_images/Flying.jpg')
const ghost = new MessageAttachment('./commands/type_images/Ghost.jpg')
const grass = new MessageAttachment('./commands/type_images/Grass.jpg')
const ground = new MessageAttachment('./commands/type_images/Ground.jpg')
const ice = new MessageAttachment('./commands/type_images/Ice.jpg')
const normal = new MessageAttachment('./commands/type_images/Normal.jpg')
const poison = new MessageAttachment('./commands/type_images/Poison.jpg')
const psychic = new MessageAttachment('./commands/type_images/Psychic.jpg')
const rock = new MessageAttachment('./commands/type_images/Rock.jpg')
const steel = new MessageAttachment('./commands/type_images/Steel.jpg')
const water = new MessageAttachment('./commands/type_images/Water.jpg')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke-type')
		.setDescription('Displays info about type effectiveness.')
		.addStringOption(option => option.setName('type').setDescription('The type you want to search for.')),
	async execute(interaction) {
		await interaction.deferReply()
		const type = interaction.options.getString('type')
        try {
			const typeData = await getType(type)
			const { name, id, damage_relations, past_damage_relations } = typeData
            var doubleDamageTo = '\n'
            var doubleDamageFrom = '\n'
            var halfDamageTo = '\n'
            var halfDamageFrom = '\n'
            var noDamageTo = '\n'
            var noDamageFrom = '\n'
            var doubleDamageToPast = '\n'
            var doubleDamageFromPast = '\n'
            var halfDamageToPast = '\n'
            var halfDamageFromPast = '\n'
            var noDamageToPast = '\n'
            var noDamageFromPast = '\n'

			//current damage relations -----------------------------------------------------------
			if (damage_relations.double_damage_to.length !== 0) {
				damage_relations.double_damage_to.forEach(SETypeOff => {
					doubleDamageTo += SETypeOff.name + '\n'
				})
			} else {
				doubleDamageTo += 'none'
			}
			if (damage_relations.double_damage_from.length !== 0) {
				damage_relations.double_damage_from.forEach(SETypeDef => {
					doubleDamageFrom += SETypeDef.name + '\n'
				})
			} else {
				doubleDamageFrom += 'none'
			}
			if (damage_relations.half_damage_to.length !== 0) {
				damage_relations.half_damage_to.forEach(NVETypeOff => {
					halfDamageTo += NVETypeOff.name + '\n'
				})
			} else {
				halfDamageTo += 'none'
			}
			if (damage_relations.half_damage_from.length !== 0) {
				damage_relations.half_damage_from.forEach(NVETypeDef => {
					halfDamageFrom += NVETypeDef.name + '\n'
				})
			} else {
				halfDamageFrom += 'none'
			}
			if (damage_relations.no_damage_to.length !== 0) {
				damage_relations.no_damage_to.forEach(NETypeOff => {
					noDamageTo += NETypeOff.name + '\n'
				})
			} else {
				noDamageTo += 'none'
			}
			if (damage_relations.no_damage_from.length !== 0) {
				damage_relations.no_damage_from.forEach(NETypeDef => {
					noDamageFrom += NETypeDef.name + '\n'
				})
			} else {
				noDamageFrom += 'none'
			}

			//past damage relations -----------------------------------------------------------
			if (past_damage_relations[0] != null) {
				if (past_damage_relations[0].damage_relations.double_damage_to.length !== 0) {
					past_damage_relations[0].damage_relations.double_damage_to.forEach(SETypeOffPast => {
						doubleDamageToPast += SETypeOffPast.name + '\n'
					})
				} else {
					doubleDamageToPast += 'none'
				}
				if (past_damage_relations[0].damage_relations.double_damage_from.length !== 0) {
					past_damage_relations[0].damage_relations.double_damage_from.forEach(SETypeDefPast => {
						doubleDamageFromPast += SETypeDefPast.name + '\n'
					})
				} else {
					doubleDamageFromPast += 'none'
				}
				if (past_damage_relations[0].damage_relations.half_damage_to.length !== 0) {
					past_damage_relations[0].damage_relations.half_damage_to.forEach(NVETypeOffPast => {
						halfDamageToPast += NVETypeOffPast.name + '\n'
					})
				} else {
					halfDamageToPast += 'none'
				}
				if (past_damage_relations[0].damage_relations.half_damage_from.length !== 0) {
					past_damage_relations[0].damage_relations.half_damage_from.forEach(NVETypeDefPast => {
						halfDamageFromPast += NVETypeDefPast.name + '\n'
					})
				} else {
					halfDamageFromPast += 'none'
				}
				if (past_damage_relations[0].damage_relations.no_damage_to.length !== 0) {
					past_damage_relations[0].damage_relations.no_damage_to.forEach(NETypeOffPast => {
						noDamageToPast += NETypeOffPast.name + '\n'
					})
				} else {
					noDamageToPast += 'none'
				}
				if (past_damage_relations[0].damage_relations.no_damage_from.length !== 0) {
					past_damage_relations[0].damage_relations.no_damage_from.forEach(NETypeDefPast => {
						noDamageFromPast += NETypeDefPast.name + '\n'
					})
				} else {
					noDamageFromPast += 'none'
				}
			} else {
				doubleDamageToPast += 'no change'
            	doubleDamageFromPast += 'no change'
            	halfDamageToPast += 'no change'
            	halfDamageFromPast += 'no change'
            	noDamageToPast += 'no change'
            	noDamageFromPast += 'no change'
			}

			const embed = new MessageEmbed()
				embed.setTitle(`${name} #${id}`)
				embed.setColor('#893EB2')
                embed.setDescription('**Damage Relations**')
				embed.addFields(
					{ name: 'Attacking:', value: '--------------------------------------------------------------------------------------', inline: false },
					{ name: 'Double Damage To:', value: '```' + doubleDamageTo + '```', inline: true },
					{ name: 'Half Damage To:', value: '```' + halfDamageTo + '```', inline: true },
                    { name: 'No Damage To:', value: '```' + noDamageTo + '```', inline: true },
					{ name: 'Defending:', value: '--------------------------------------------------------------------------------------', inline: false },
					{ name: 'Double Damage From:', value: '```' + doubleDamageFrom + '```', inline: true },
					{ name: 'Half Damage From:', value: '```' + halfDamageFrom + '```', inline: true },
					{ name: 'No Damage From:', value: '```' + noDamageFrom + '```', inline: true },
					{ name: 'Past Attacking:', value: '--------------------------------------------------------------------------------------', inline: false },
					{ name: 'Old Double Damage To:', value: '```' + doubleDamageToPast + '```', inline: true },
					{ name: 'Old Half Damage To:', value: '```' + halfDamageToPast + '```', inline: true },
                    { name: 'Old No Damage To:', value: '```' + noDamageToPast + '```', inline: true },
					{ name: 'Past Defending:', value: '--------------------------------------------------------------------------------------', inline: false },
					{ name: 'Old Double Damage From:', value: '```' + doubleDamageFromPast + '```', inline: true },
					{ name: 'Old Half Damage From:', value: '```' + halfDamageFromPast + '```', inline: true },
					{ name: 'Old No Damage From:', value: '```' + noDamageFromPast + '```', inline: true }
				)
				if (type == 'bug') {
					embed.setThumbnail('attachment://Bug.jpg')
					interaction.editReply({ embeds: [embed], files: [bug] })
				} else if (type == 'dark') {
					embed.setThumbnail('attachment://Dark.jpg')
					interaction.editReply({ embeds: [embed], files: [dark] })
				} else if (type == 'dragon') {
					embed.setThumbnail('attachment://Dragon.jpg')
					interaction.editReply({ embeds: [embed], files: [dragon] })
				} else if (type == 'electric') {
					embed.setThumbnail('attachment://Electric.jpg')
					interaction.editReply({ embeds: [embed], files: [electric] })
				} else if (type == 'fairy') {
					embed.setThumbnail('attachment://Fairy.jpg')
					interaction.editReply({ embeds: [embed], files: [fairy] })
				} else if (type == 'fire') {
					embed.setThumbnail('attachment://Fire.jpg')
					interaction.editReply({ embeds: [embed], files: [fire] })
				} else if (type == 'flying') {
					embed.setThumbnail('attachment://Flying.jpg')
					interaction.editReply({ embeds: [embed], files: [flying] })
				} else if (type == 'ghost') {
					embed.setThumbnail('attachment://Ghost.jpg')
					interaction.editReply({ embeds: [embed], files: [ghost] })
				} else if (type == 'grass') {
					embed.setThumbnail('attachment://Grass.jpg')
					interaction.editReply({ embeds: [embed], files: [grass] })
				} else if (type == 'ground') {
					embed.setThumbnail('attachment://Ground.jpg')
					interaction.editReply({ embeds: [embed], files: [ground] })
				} else if (type == 'ice') {
					embed.setThumbnail('attachment://Ice.jpg')
					interaction.editReply({ embeds: [embed], files: [ice] })
				} else if (type == 'normal') {
					embed.setThumbnail('attachment://Normal.jpg')
					interaction.editReply({ embeds: [embed], files: [normal] })
				} else if (type == 'poison') {
					embed.setThumbnail('attachment://Poison.jpg')
					interaction.editReply({ embeds: [embed], files: [poison] })
				} else if (type == 'psychic') {
					embed.setThumbnail('attachment://Psychic.jpg')
					interaction.editReply({ embeds: [embed], files: [psychic] })
				} else if (type == 'rock') {
					embed.setThumbnail('attachment://Rock.jpg')
					interaction.editReply({ embeds: [embed], files: [rock] })
				} else if (type == 'steel') {
					embed.setThumbnail('attachment://Steel.jpg')
					interaction.editReply({ embeds: [embed], files: [steel] })
				} else if (type == 'water') {
					embed.setThumbnail('attachment://Water.jpg')
					interaction.editReply({ embeds: [embed], files: [water] })
				} else {
					interaction.editReply('This type does not exist!')
				}
		} catch (error) {
			interaction.editReply('This type does not exist!')
		}
	},
};