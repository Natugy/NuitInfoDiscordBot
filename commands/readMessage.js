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
module.exports.builder = new SlashCommandBuilder()
    .setName("readchat")
    .setDescription("Lit les message du chat")
    .addIntegerOption(option => 
        option
            .setName("nbmessage")
            .setDescription("Nombre de message que vous voulez afficher")
            .setRequired(false)
);

module.exports.command = async function (interaction) {
    let response = "";
    let lim=10;
    
    if(interaction.options.getInteger("nbmessage") != undefined){
        lim = interaction.options.getInteger("nbmessage");

    }
    const chatCol = collection(db,"chat");
    const q = query(chatCol,orderBy("date","desc"),limit(lim));
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
    response = doc.data().userTag + ": \"" + doc.data().content+"\" \n" + response;
    });
    interaction.reply(response);
            
}