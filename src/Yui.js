/*
    Developed by SushiiDev
    Copyright (C) 2017 - SushiiDev  
*/

const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const config = require("./config.json");

const bot = new Discord.Client({ disableEveryone: true });

let commands = bot.commands = {};

// Getting command content
const getCommandContent = content => {
    let output = '';

    if (content.startsWith(config.prefix)) {
        output = content.substr(config.prefix.length);
    } else if (content.startsWith(bot.user.toString())) {
        output = content.substr(bot.user.toString().length);
    }

    // Get rid of trailing spaces/tabs/newlines
    return output.replace(/^\s+/, '');
}

// Trigggers every time the bot sees a message
bot.on("message", msg => {
    if (bot.user.id === msg.author.id) return;

    const content = getCommandContent(msg.content);
    if (!content) return;

    const label = content.split(' ')[0];
    const args = content.split(' ').splice(1);

    if (commands[label]) {
        commands[label].run(bot, msg, args);
    }
});

// Bot started
bot.on("ready", () => {
    loadCommands();
    loadDisplay();

    console.log(`Client loaded as '${bot.user.tag}' (ID: ${bot.user.id})`);
});

// Loading commands
const loadCommands = () => {
    commands = bot.commands = {};

    let commandsLoaded = 0;
    let commandsFailed = 0;

    fs.readdirSync(path.join(__dirname, 'commands')).forEach(file => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;

        let command = require('./commands/' + file);
        if (typeof command.run !== 'function' || typeof command.info !== 'object') {
            console.log(`Attempted to load invalid command file: ${file}`);
            commandsFailed++;
            return;
        }

        commands[command.info.name] = command;
        commandsLoaded++;
    });

    if (commandsLoaded === 0) console.log('Failed to load any commands.');
    else console.log(`[Loaded ${commandsLoaded} commands.`);
    console.log(`${commandsFailed} commands failed to load.`);
};

// Load display
const loadDisplay = () => {
    bot.user.setStatus("dnd");
    bot.user.setAvatar("./avatar.png")
    bot.user.setActivity(`${config.prefix}help | ${bot.users.size} members`);
}

module.exports = bot;

bot.login(config.token);