const { readdirSync } = require('fs');
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const log = require('./utils/logger');
const config = require('./config.json');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.commands = new Collection();
client.config = config;
const commandFolders = readdirSync('./slash-commands');

const functions = readdirSync('./functions')
    .filter((file) => file.endsWith('.js'));

const eventFiles = readdirSync('./events')
    .filter((file) => file.endsWith('.js'));

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./commands/${file}`);

    log.discord(`Loading ${commandName}`);
    client.commands.set(commandName, command);
    log.discord(`Loaded ${commandName}`)
}

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, './events');
    client.handleCommands(commandFolders, './slash-commands');
    client.login(config.token);
})();