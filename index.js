const { Client, GatewayIntentBits,SlashCommandBuilder, TimestampStyles } = require('discord.js');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, getDoc, addDoc, collection, Timestamp, query,orderBy,limit, getDocs } = require("firebase/firestore"); 
require("dotenv").config();

const firebaseConfig = {
    apiKey: "AIzaSyCKGc0AICoewmGR1n-cnbUBxcY660O2-BM",
    authDomain: "ndi-game-d9b14.firebaseapp.com",
    projectId: "ndi-game-d9b14",
    storageBucket: "ndi-game-d9b14.appspot.com",
    messagingSenderId: "34549845840",
    appId: "1:34549845840:web:d019c3556207d0ee926655"
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
            console.log(author);
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