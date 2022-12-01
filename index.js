const { Client, GatewayIntentBits,SlashCommandBuilder } = require('discord.js');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, getDoc } = require("firebase/firestore"); 
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
    client.guilds.cache.get("1046876578803630131").commands.create(data);
    console.log(`Logged succesfully!`);
    const docRef = doc(db,"test", "client");
    const docSnap = await getDoc(docRef);
    const dataDoc = docSnap.data();
    console.log(dataDoc);
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

client.on("interactionCreate", interraction => {
    if(interraction.isCommand()){
        if(interraction.commandName === "baste"){
            let user =interraction.options.getUser("utilisateur");
            if(user != undefined){
                interraction.reply("pong <@"+user.id+">");
            }
            interraction.reply("tu pense pouvoir invoquer notre dieu ? tu n'as pas ce genre de pouvoir");
        }
    }
});



client.login(process.env.BOT_TOKEN);