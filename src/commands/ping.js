/*
    Developed by SushiiDev
    Copyright (C) 2017 - SushiiDev
*/

exports.run = (bot, msg) => {
    msg.channel.send(`:ping_pong: Pong!`).then(m => {
        m.edit(`:ping_pong: Pong! \`${m.createdTimestamp - msg.createdTimestamp}ms\``).then(m => m.delete(3000));
    });
};

exports.info = {
    name: 'ping',
    usage: 'ping',
    description: 'Pings the bot'
};
