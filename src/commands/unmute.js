/*
    Developed by SushiiDev
    Copyright (C) 2017 - SushiiDev
*/

const utils = require('../utils');

exports.run = (bot, msg) => {

    const roleModerator = msg.guild.roles.find("name", "Moderator");

    const target = msg.mentions.members.first();

    const roleMuted = msg.guild.roles.find("name", "Muted");

    msg.delete();

    // Permission check
    if (!msg.member.roles.has(roleModerator.id))
        return msg.channel.send(":x: This requires Permission Role **Moderator** or higher.").then(m => m.delete(3000));

    // No user provided
    if (msg.mentions.members.size === 0)
        return msg.channel.send(":x: Please provide a user to unmute.").then(m => m.delete(3000));

    // Removing role / unmuting mentioned user
    target.removeRole(roleMuted);

    msg.channel.send(`:white_check_mark: The user **${target.user.tag}** has successfully been unmuted.`).then(m => m.delete(3000));
};

exports.info = {
    name: 'unmute',
    usage: 'unmute [mention]',
    description: 'Unmute a muted user.'
};