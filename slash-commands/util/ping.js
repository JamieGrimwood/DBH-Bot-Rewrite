const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
		let embed = new Discord.MessageEmbed()
		  .setColor('RED') 
		  .setTitle('DanBot Hosting - Ping') 
		  .setDescription(`API Latency: ${Math.round(client.ws.ping)}ms`)
		  .setTimestamp()
	       await interaction.reply({ embeds: [embed] });
	},
};
