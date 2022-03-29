const config = require('../config.json');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction, client);
			// console.log(interaction.member.voice.channel)
		}
		catch (error) {
			console.error(error);
			try {
				return await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
			catch (error) {
				return await interaction.followUp({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		}
	},
};