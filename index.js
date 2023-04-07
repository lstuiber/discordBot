const fs = require("node:fs");
const path = require("node:path");
const { Player } = require("discord-player");
const { Client, Events, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const { useTimeline } = require("discord-player");

/* OVERALL IDEA OF WHAT TO DO
    Need to first set up client instance to be able to 


*/
const client = new Client({
  // Make sure you have 'GuildVoiceStates' intent enabled
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages /* Other intents */,
  ],
});
//adding commands property on the instance lets us access commands in other files
client.commands = new Collection();
let powerFlag = {
  value: false,
};
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// this is the entrypoint for discord-player based application
// singleton will only create one instance of the player
// use the following code to reference this player in other files
// const { useMasterPlayer } = require("discord-player");
// const player = useMasterPlayer();
const player = new Player(client);

// this event is emitted whenever discord-player starts to play a track
player.events.on("playerStart", async (queue, track) => {
  const { timestamp, volume, paused, pause, resume, setVolume, setPosition } =
    useTimeline(queue.metadata.guildId);
  await pause();
  // we will later define queue.metadata object while creating the queue
  await queue.metadata.channel.send(`Started playing **${track.title}**!`);
  if (powerFlag.value) {
    console.log("Power Flag plays");

    let powerStart =
      Math.floor(Math.random() * (timestamp.total.value - 60000)) + 1;
    console.log(timestamp);
    await setPosition(powerStart);
    await resume();
    let powerEnd = powerStart + 60000;
    console.log("Guild ID " + queue.node);
    console.log("PowerHour Start: " + powerStart);
    console.log("PowerHour end: " + powerEnd);
    console.log("Song Length: " + timestamp.total.value);
  } else {
    await resume();
  }
});

//logs the bot in
client.login(token);
exports.powerFlag = powerFlag;
