/*
    Developed by SushiiDev
    Copyright (C) 2017 - SushiiDev
*/

const utils = require('../utils');

exports.run = (bot, msg) => {

    const roleModerator = msg.guild.roles.find("name", "Moderator");

    const target = msg.mentions.members.first();

    const roleMuted = msg.guild.roles.find("name", "Muted");

    // Overwriting channel permissions
    try {
        msg.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(roleMuted, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    } catch (err) {
        console.log(err.stack);
    }

    msg.delete();

    // Permission check
    if (!msg.member.roles.has(roleModerator.id))
        return msg.channel.send(":x: This requires Permission Role **Moderator** or higher.").then(m => m.delete(3000));

    // No user provided
    if (msg.mentions.members.size === 0)
        return msg.channel.send(":x: Please provide a user to mute.").then(m => m.delete(3000));

    // Mentioned user not muteable
    if (target.highestRole.position >= msg.member.highestRole.position)
        return msg.channel.send(`:x: You may not mute the user ${target.user.tag}.`).then(m => m.delete(3000));

    // Adding role / Muting mentioned user
    target.addRole(roleMuted);

    msg.channel.send(`:white_check_mark: The user **${target.user.tag}** has successfully been muted.`).then(m => m.delete(3000));
};

exports.info = {
    name: 'mute',
    usage: 'mute [mention]',
    description: 'Mute a user'
};

