const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the queue"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.tracks.shuffle();
    await interaction.reply("Queue shuffled!");
  },
};
