const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const express = require("express");

// Express server to keep Replit alive
const server = express();
server.all("/", (req, res) => {
  res.send("Bot Discord opérationnel !");
});
server.listen(3000, () => {
  console.log("Serveur web actif sur Replit !");
});

// Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.once('ready', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === "welcome");
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(0xFFC0CB)
    .setTitle(`🎉 Bienvenue ${member.user.username} !`)
    .setDescription(`On est content de t’accueillir sur **${member.guild.name}** 🎂\nN’oublie pas de lire les règles !`)
    .setThumbnail(member.user.displayAvatarURL())
    .setImage("https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif")
    .setFooter({ text: `Nous sommes maintenant ${member.guild.memberCount} !` });

  channel.send({ content: `Salut <@${member.id}> ! 👋`, embeds: [embed] });
});

client.login(process.env.TOKEN);
