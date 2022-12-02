const { SlashCommandBuilder } = require('discord.js');


module.exports.builder = new SlashCommandBuilder()
    .setName('help')
    .setDescription("Renvoie toutes les aides et différentes informations les IST et MST ")

module.exports.command = function(interaction){
    interaction.reply("Voici une liste de lien utile pour vous intéresser sur le sujet : \n https://www.sida-info-service.org/ \n https://www.sexualites-info-sante.fr/ \n https://www.hepatites-info-service.org/ \n");
 
}