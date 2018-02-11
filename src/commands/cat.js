/*
    Developed by SushiiDev
    Copyright (C) 2017 - SushiiDev
*/

const snekfetch = require('snekfetch');

exports.run = (bot, msg) => {
    msg.delete();
    snekfetch.get("http://www.random.cat/meow").then(res => {
        msg.channel.send(res.body.file);
    })
};

exports.info = {
    name: 'cat',
    usage: 'cat',
    description: 'Shows you cute cat pictures'
};
