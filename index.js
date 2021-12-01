const discord = require("discord.js");
const express = require("express");

const client = new discord.Client({ intents: [ "GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS" ]});

client.on("messageCreate", message => {
    const author = message.author;
    const guild = message.guild;
    const content = message.content;

    if (author.id === "708040197228724296") {
        if (content === "") content = "⠀";
        return message.delete();
    }

    guild.members.cache.get("913958285110050847")
        .setNickname(guild.members.cache.get("708040197228724296").nickname);
});

client.on("guildMemberUpdate", (old, updated) => {
    if (updated.user.id === "708040197228724296") {
        const guild = client.guilds.cache.get(updated.guild.id);
        const self = guild.members.cache.get("913958285110050847");
        self.setNickname(updated.nickname);
    }
    return;
});

client.on("ready", () => {
    console.log("Ready to begin annoying the heck outta people");
    client.user.setStatus("invisible");
})

/* client.on("userUpdate", (old, updated) => {
    console.log(updated.displayAvatarURL())
    client.user.setAvatar(updated.displayAvatarURL());
}); */

client.login(process.env.token);

const app = express();
app.all("*", (req, res) => res.sendStatus(200));
app.listen(8080);
