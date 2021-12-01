const discord = require("discord.js");
const express = require("express");

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_MEMBERS" ]});

client.on("messageCreate", message => {
    const content = message.content;
    const guild = message.guild;

    if (message.author.id === process.env.annoyee) {
        if (content === "") content = "⠀";
        message.channel.send(message);
        message.delete();
    }

    guild.members.cache.get(client.user.id)
        .setNickname(guild.members.cache.get(process.env.annoyee).nickname);
    return;
});

client.on("guildMemberUpdate", (old, updated) => {
    if (updated.user.id === process.env.annoyee) {
        const guild = client.guilds.cache.get(updated.guild.id);
        const self = guild.members.cache.get(client.user.id);
        self.setNickname(updated.nickname);
    }
    return;
});

client.on("ready", () => {
    console.log("Ready to begin annoying the heck outta people");
    client.user.setStatus("invisible");
})

client.login(process.env.token);

const app = express();
app.all("*", (req, res) => res.sendStatus(200));
app.listen(8080);
