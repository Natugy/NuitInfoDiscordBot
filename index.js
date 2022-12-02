const { Client, GatewayIntentBits,SlashCommandBuilder, TimestampStyles } = require('discord.js');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, getDoc, addDoc, collection, Timestamp, query,orderBy,limit, getDocs } = require("firebase/firestore"); 
require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.APP_KEY,
    authDomain: process.env.AUTH_DOM,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING,
    appId: process.env.APP_ID
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
       
    ]
});


const addMessage = new SlashCommandBuilder()
.setName("chat")
.setDescription("Ajoute un message au chat")
.addStringOption(option =>
    option
    .setName("message")
    .setDescription("Texte à envoyer")
    .setRequired(true));
    
    
const readLastMessage = new SlashCommandBuilder()
.setName("readchat")
.setDescription("Lit les message du chat")
.addIntegerOption(option => 
    option
        .setName("nbmessage")
        .setDescription("Nombre de message que vous voulez afficher")
        .setRequired(false)
);
client.on('ready', async () => {
    
    client.application.commands.create(addMessage);
    client.application.commands.create(readLastMessage);
    console.log(`Logged succesfully!`);
    
});

client.on("interactionCreate", async interraction =>  {
    if(interraction.isCommand()){
        

        if(interraction.commandName ==="chat"){
            let author = interraction.user.tag
            let message = interraction.options.getString("message");
            
            try {
                const docRef = await addDoc(collection(db, "chat"), {
                userTag: author,
                content: message,
                date : Timestamp.now()
                });
            
                interraction.reply("Message envoyé : " + message);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            
        }

        if(interraction.commandName === "readchat"){
            let response = "";
            let lim=10;
            
            if(interraction.options.getInteger("nbmessage") != undefined){
                lim = interraction.options.getInteger("nbmessage");

            }
            const chatCol = collection(db,"chat");
            const q = query(chatCol,orderBy("date","desc"),limit(lim));
           const querySnap = await getDocs(q);
           querySnap.forEach((doc) => {
            response = doc.data().userTag + ": \"" + doc.data().content+"\" \n" + response;
           });
           interraction.reply(response);
            

        }
    }
});



client.login(process.env.BOT_TOKEN);