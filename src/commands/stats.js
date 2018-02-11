/*
    Developed by SushiiDev
    Copyright (C) 2017 - SushiiDev
*/

const utils = require('../utils');

exports.run = function (bot, msg) {
    msg.channel.send({
        embed: utils.embed('Yui Stats', `
Servers: ${bot.guilds.size}

Users: ${bot.users.size}

RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
        )
    });
};

exports.info = {
    name: 'stats',
    usage: 'stats',
    description: 'Shows you stats about Yui'
};
