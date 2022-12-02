const { Client, GatewayIntentBits,SlashCommandBuilder, TimestampStyles } = require('discord.js');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { addDoc, collection, Timestamp, query,orderBy,limit, getDocs } = require("firebase/firestore"); 
const firebaseConfig = {
    apiKey: process.env.APP_KEY,
    authDomain: process.env.AUTH_DOM,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING,
    appId: process.env.APP_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addMessage = new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Ajoute un message au chat")
    .addStringOption(option =>
        option
        .setName("message")
        .setDescription("Texte à envoyer")
        .setRequired(true));


module.exports.command = async function (interaction){
     let author = interaction.user.tag;
     let message = interaction.options.getString("message");
     
     try {
         const docRef = await addDoc(collection(db, "chat"), {
         userTag: author,
         content: message,
         date : Timestamp.now()
         });
     
         interaction.reply("Message envoyé : " + message);
     } catch (e) {
         console.error("Error adding document: ", e);
     }
 };
module.exports.builder = addMessage;