const Discord = require('discord.js');
const exec = require('child_process').exec;
exports.run = (client, message, args) => {
    if (message.member.roles.cache.find(r => r.id === "788856610310455316")) {

        exec(`${args.join(" ")}`, (error, stdout) => {

            let response = (error || stdout);

            if (response.length > 5000) console.log(response), response = 'Output too long.';

            const embed = new Discord.MessageEmbed()
                .setAuthor({ name: "Output:" })
                .setDescription("```" + response.toString() + "```")
                .setTimestamp()
                .setColor("RANDOM")
            
            message.channel.send({ embeds: [embed] })
        });
    }
}