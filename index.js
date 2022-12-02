const { Client, GatewayIntentBits,SlashCommandBuilder, TimestampStyles } = require('discord.js');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, getDoc, addDoc, collection, Timestamp } = require("firebase/firestore"); 
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


client.on('ready', async () => {
    client.application.commands.create(data);
    client.application.commands.create(addMessage);
   // client.guilds.cache.get("1046876578803630131").commands.create(data);
    console.log(`Logged succesfully!`);
  /*  const docRef = doc(db,"test", "client");
    const docSnap = await getDoc(docRef);
    const dataDoc = docSnap.data();
    console.log(dataDoc);*/
});

const data = new SlashCommandBuilder()
    .setName("baste")
    .setDescription("invoque notre dieu a tous")
    .addUserOption(option =>
         option
         .setName("utilisateur")
         .setDescription("fgfgfgf")
         .setRequired(false)
         );

const addMessage = new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Ajoute un message au chat")
        .addStringOption(option =>
            option
            .setName("message")
            .setDescription("Message a ajouté")
            .setRequired(true));



client.on("interactionCreate", async interraction =>  {
    if(interraction.isCommand()){
        if(interraction.commandName === "baste"){
            let user =interraction.options.getUser("utilisateur");
            if(user != undefined){
                interraction.reply("pong <@"+user.id+">");
            }
            interraction.reply("tu pense pouvoir invoquer notre dieu ? tu n'as pas ce genre de pouvoir");
        }

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
    }
});



client.login(process.env.BOT_TOKEN);