const { Client, GatewayIntentBits,SlashCommandBuilder, TimestampStyles } = require('discord.js');

require("dotenv").config();

const addMessage = require("./commands/addMessage");
const readMessage =require("./commands/readMessage");
const help = require("./commands/help");
const play =require("./commands/play")

  
const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});

client.on('ready', async () => {
    
    client.application.commands.create(addMessage.builder);
    client.application.commands.create(readMessage.builder);
    client.application.commands.create(help.builder);
    client.application.commands.create(play.builder);

    console.log(`Logged succesfully!`);
    
});

client.on("interactionCreate", async interaction =>  {
    if(interaction.isCommand()){
        switch(interaction.commandName){
            case "readchat":
                readMessage.command(interaction);
                break;
            case "chat":
                addMessage.command(interaction);
                break;
            case "help":
                help.command(interaction);
                break;
            case "play":
                play.command(interaction);
                break;

            
        }
    }
});

client.login(process.env.BOT_TOKEN);