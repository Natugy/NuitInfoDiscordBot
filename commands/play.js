const { SlashCommandBuilder } = require('discord.js');

module.exports.builder = new SlashCommandBuilder()
    .setName('jouer')
    .setDescription("Permet de lancer le jeu sur navigateur")

module.exports.command = function (interaction) {
    interaction.reply("Link");

}