/*
    Developed by SushiiDev
    Copyright (C) 2017 - SushiiDev
*/

const utils = require('../utils');

exports.run = function (bot, msg) {
    msg.delete();
    msg.channel.send("I don't think my owner would like that").then(m => m.delete(3000));
}

exports.info = {
    name: 'invite',
    usage: 'invite',
    description: 'Gives you an invite link for Yui'
};
