/*
    Developed by SushiiDev
    Copyright (C) 2017 - SushiiDev
*/

const utils = require('../utils');

exports.run = (bot, msg) => {

    const roleModerator = msg.guild.roles.find("name", "Moderator");

    var target = msg.mentions.members.first();

    var reason = msg.content.split(' ').slice(2).join(' ');

    msg.delete();

    // Permission check
    if (!msg.member.roles.has(roleModerator.id))
        return msg.channel.send(":x: This requires Permission Role **Moderator** or higher.").then(m => m.delete(3000));

    // No user provided
    if(msg.mentions.members.size === 0)
        return msg.channel.send(":x: Please provide a user to kick.").then(m => m.delete(3000));

    // No reason provided  
    if (!reason)
        return msg.channel.send(":x: Please provide a reason.").then(m => m.delete(3000));

    // Mentioned user not kickable
    if (target.highestRole.position >= msg.member.highestRole.position) 
        return msg.channel.send(`:x: You may not kick the user ${target.user.tag}.`).then(m => m.delete(3000));

    // Mentioned user kicked
    target.kick(`**Responsible User:** ${message.author}\n**Reason:** ${reason}`);

    msg.channel.send(`:white_check_mark: The user **${target.user.tag}** has successfully been kicked.`).then(m => m.delete(3000));
};

exports.info = {
    name: 'kick',
    usage: 'kick [mention] [reason]',
    description: 'Kick a user'
};
