const { Client, GatewayIntentBits,SlashCommandBuilder, TimestampStyles } = require('discord.js');

require("dotenv").config();

const addMessage = require("./commands/addMessage.js");
const readMessage =require("./commands/readMessage");

  
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
    console.log(`Logged succesfully!`);
    
});

client.on("interactionCreate", async interaction =>  {
    if(interaction.isCommand()){
        if(interaction.commandName ==="chat") addMessage.commande(interaction);

        if(interaction.commandName === "readchat") readMessage.command(interaction);
    }
});

client.login(process.env.BOT_TOKEN);