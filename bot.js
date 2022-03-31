const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const log = require('./utils/logger');
const config = require('./config.json');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.messageCommands = new Collection();
client.slashCommands = new Collection();
client.config = config;

const slashCommands = fs.readdirSync('./slash-commands');

const functions = fs.readdirSync('./functions').filter((file) => file.endsWith('.js'));

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

(async () => {
    log.discord(`----- Started loading commands -----`);
    commands.forEach((file) => {
        let props = require(__dirname + `/commands/${file}`);
        let commandName = file.split(".")[0];
        client.messageCommands.set(commandName, props);
        log.discord('Loaded the "' + commandName + '" command.');
    });
    log.success(`----- Loaded all commands -----`);
})();

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, './events');
    client.handleCommands(slashCommands, './slash-commands');
    client.login(config.token);
    console.log(client.messageCommands)
})();