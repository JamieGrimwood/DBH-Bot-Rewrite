const log = require('../utils/logger');

module.exports = {
    name: 'messageCreate',
    once: true,
    async execute(message, client) {
        console.log(message.content)

        if (message.author.bot) return;

        if (message.content.indexOf(client.config.prefix) !== 0) return;

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        console.log(cmd)

        if (!cmd) return;

        cmd.run(client, message, args);
    },
};