const log = require('../utils/logger');
const fetch = require("node-fetch");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        log.discord(`Ready! Logged in as ${client.user.tag}.`);
        client.user.setStatus('online');
		
		async function setPresence(){
			const presences = [
				`Listening to some epic music`,
				`There are more doors than wheels`,
				`What even is the meaning of life?`,
				`/help for help!`,
				`${client.users.cache.size} people can use me lol`
			];
			
			const randomNumber = Math.floor(Math.random()*presences.length);
			
			client.user.setPresence({
				activities: [{
					name: `${presences[randomNumber]}`,
				}]
			});

			setTimeout(setPresence, 30000);
		}

		setPresence();
    },
};