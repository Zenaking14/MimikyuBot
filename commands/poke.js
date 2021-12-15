const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const { getPokemon, getPokeSpecies } = require('./utils/pokemon')

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
            const { name, sprites, stats, abilities, types, id, species } = pokeData
            const pokeSpeciesData = await getPokeSpecies(`${species.name}`)
            const { capture_rate, evolution_chain } = pokeSpeciesData
            var statsContent = ''
            var abilitiesContent = ''
            var typesContent = ''
            var evoContent = ''
            var evoDetails = 'earliest stage\n'
            evo_chain_url = evolution_chain.url

            async function getEvoChain() {
                let response2 = await fetch(`${evo_chain_url}`)
                return await response2.json()
            }
            const evoData = await getEvoChain()
            const { chain } = evoData
        
            const embed = new MessageEmbed()
                evoContent += chain.species.name + '\n'
                chain.evolves_to.forEach(evolution => {
                    evoContent += evolution.species.name + '\n'
                    evolution.evolution_details.forEach(detail => {
                        evoDetails += detail.trigger.name + ' - '
                        if (detail.gender != null) {
                            evoDetails += detail.gender.name + '\n'
                        } else if (detail.held_item != null) {
                            evoDetails += detail.held_item.name + '\n'
                        } else if (detail.item != null) {
                            evoDetails += detail.item.name + '\n'
                        } else if (detail.known_move != null) {
                            evoDetails += 'level up with ' + detail.known_move.name + '\n'
                        } else if (detail.known_move_type != null) {
                            evoDetails += 'know ' + detail.known_move_type.name + ' move' + '\n'
                        } else if (detail.location != null) {
                            evoDetails += detail.location.name + '\n'
                        } else if (detail.min_affection != null) {
                            evoDetails += 'min affection - ' + detail.min_affection.toString() + '\n'
                        } else if (detail.min_beauty != null) {
                            evoDetails += 'min beauty - ' + detail.min_beauty.toString() + '\n'
                        } else if (detail.min_happiness != null) {
                            evoDetails += 'min happiness - ' + detail.min_happiness.toString() + '\n'
                        } else if (detail.min_level != null) {
                            evoDetails += 'min level - ' + detail.min_level.toString() + '\n'
                        } else if (detail.needs_overworld_rain !== false) {
                            evoDetails += detail.needs_overworld_rain.toString() + '\n'
                        } else if (detail.party_species != null) {
                            evoDetails += detail.party_species.name + '\n'
                        } else if (detail.party_type != null) {
                            evoDetails += detail.party_type.name + '\n'
                        } else if (detail.relative_physical_stats != null) {
                            evoDetails += detail.relative_physical_stats.toString() + '\n'
                        } else if (detail.time_of_day === "day" || detail.time_of_day === "night") {
                            evoDetails += detail.time_of_day + '\n'
                        } else if (detail.trade_species != null) {
                            evoDetails += detail.trade_species.name + '\n'
                        } else if (detail.turn_upside_down !== false) {
                            evoDetails += detail.turn_upside_down + '\n'
                        }
                    })
                    evolution.evolves_to.forEach(evo => {
                        evoContent += evo.species.name + '\n'
                        evo.evolution_details.forEach(detail => {
                            evoDetails += detail.trigger.name + ' - '
                            if (detail.gender != null) {
                                evoDetails += detail.gender.name + '\n'
                            } else if (detail.held_item != null) {
                                evoDetails += detail.held_item.name + '\n'
                            } else if (detail.item != null) {
                                evoDetails += detail.item.name + '\n'
                            } else if (detail.known_move != null) {
                                evoDetails += 'level up with ' + detail.known_move.name + '\n'
                            } else if (detail.known_move_type != null) {
                                evoDetails += 'know ' + detail.known_move_type.name + ' move' + '\n'
                            } else if (detail.location != null) {
                                evoDetails += detail.location.name + '\n'
                            } else if (detail.min_affection != null) {
                                evoDetails += 'min affection - ' + detail.min_affection.toString() + '\n'
                            } else if (detail.min_beauty != null) {
                                evoDetails += 'min beauty - ' + detail.min_beauty.toString() + '\n'
                            } else if (detail.min_happiness != null) {
                                evoDetails += 'min happiness - ' + detail.min_happiness.toString() + '\n'
                            } else if (detail.min_level != null) {
                                evoDetails += 'min level - ' + detail.min_level.toString() + '\n'
                            } else if (detail.needs_overworld_rain !== false) {
                                evoDetails += detail.needs_overworld_rain.toString() + '\n'
                            } else if (detail.party_species != null) {
                                evoDetails += detail.party_species.name + '\n'
                            } else if (detail.party_type != null) {
                                evoDetails += detail.party_type.name + '\n'
                            } else if (detail.relative_physical_stats != null) {
                                evoDetails += detail.relative_physical_stats.toString() + '\n'
                            } else if (detail.time_of_day === "day" || detail.time_of_day === "night") {
                                evoDetails += detail.time_of_day + '\n'
                            } else if (detail.trade_species != null) {
                                evoDetails += detail.trade_species.name + '\n'
                            } else if (detail.turn_upside_down !== false) {
                                evoDetails += detail.turn_upside_down + '\n'
                            }
                        })
                    })
                })
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
                    { name: 'Type:', value: typesContent, inline: true },
                    { name: 'Catch Rate:', value: `${capture_rate.toString()}`, inline: true },
                    { name: 'Abilities:', value: abilitiesContent },
                    { name: 'Base Stats:', value: statsContent, inline: true },
                    { name: 'Species:', value: evoContent, inline: true },
                    { name: 'Evo Method:', value: evoDetails, inline: true }
                )
		    interaction.editReply({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            interaction.editReply('This pokemon does not exist!')
        }
	},
};