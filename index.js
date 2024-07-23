
const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});


const statusMessages = ["Çayhane 💙2acd.","Yetkilileri Kontrol Ediyor✨"];


let currentIndex = 0;
const channelId = '';

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom}],
    status: 'dnd',
  });

  
  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
   
    textChannel.send(`Bot status is: ${currentStatus}`);
  } else {

  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

login();
const { joinVoiceChannel } = require('@discordjs/voice');

client.once('ready', () => {

    const sesKanaliId = '1265428206673203322';

    const sesKanali = client.channels.cache.get(sesKanaliId);

    if (sesKanali) {
        if (sesKanali.type === 2) {

            const botSesKanali = sesKanali.guild.members.me.voice.channel;

            if (botSesKanali && botSesKanali.id === sesKanaliId) {
                console.log('Bot zaten ses kanalına bağlı!');
            } else {
                joinVoiceChannel({
                    channelId: sesKanali.id,
                    guildId: sesKanali.guild.id,
                    adapterCreator: sesKanali.guild.voiceAdapterCreator,
                });
                console.log('Ses kanalına katılındı!');
            }
        } else {
            console.error('Belirtilen kanal bir ses kanalı değil!');
        }
    } else {
        console.error('Belirtilen ses kanalı bulunamadı!');
    }
});
