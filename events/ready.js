const log = require('../utils/logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        log.discord(`Ready! Logged in as ${client.user.tag}.`);
      
    const activities = [{
        "name": "over DanBot Hosting",
        "type": "WATCHING"
      }, {
        "name": "DanBot FM",
        "type": "LISTENING"
    }];
      
    client.user.setStatus('online');
      
    setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.name, {
            type: activity.type
        });
     }, 30000);
      
    },
};
