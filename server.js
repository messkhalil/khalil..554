const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const admin = require("firebase-admin");
const app = express();
const PORT = process.env.PORT||3000;

// Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
  databaseURL: "discord-5d5dd.firebaseapp.com"
});
const db = admin.database();

// Discord Bot
const client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
  ]
});

// Online members tracking
client.on("ready", async()=>{
  console.log("Bot Online!");
  const guild = client.guilds.cache.first();
  await guild.members.fetch();
  updateMembers(guild);
});

async function updateMembers(guild){
  const members = guild.members.cache;
  const onlineMembers = members.filter(m=>m.presence?.status==="online");
  db.ref("members").set({total:members.size,online:onlineMembers.size});
}

// Commands
client.on("messageCreate",async message=>{
  if(message.content==="!uno"){
    const gameRef = db.ref("games").push();
    await gameRef.set({
      players:{[message.author.id]:{cards:[]}},
      currentTurn:message.author.id,
      deck:[],
      discardPile:[]
    });
    message.reply("🎮 تم إنشاء لعبة UNO!");
  }
});

client.login(process.env.TOKEN);

// Express
app.use(express.static(__dirname));
app.listen(PORT,()=>console.log("Server running on "+PORT));