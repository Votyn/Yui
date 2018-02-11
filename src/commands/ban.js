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
        return msg.channel.send(":x: Please provide a user to ban.").then(m => m.delete(3000));

    // No reason provided  
    if (!reason)
        return msg.channel.send(":x: Please provide a reason.").then(m => m.delete(3000));

    // Mentioned user not bannable
    if (target.highestRole.position >= msg.member.highestRole.position) 
        return msg.channel.send(`:x: You may not ban the user ${target.user.tag}.`).then(m => m.delete(3000));


    // Mentioned user banned
    target.ban(`**Responsible User:** ${msg.author.username} **Reason:** ${reason}`);

    msg.channel.send(`:white_check_mark: The user **${target.user.tag}** has successfully been banned.`).then(m => m.delete(3000));
};

exports.info = {
    name: 'ban',
    usage: 'ban [mention] [reason]',
    description: 'Ban a user'
};
