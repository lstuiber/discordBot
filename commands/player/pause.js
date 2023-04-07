const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses current track"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.node.setPaused(!queue.node.isPaused()); //isPaused() returns true if that player is already paused
    if (queue.node.isPaused()) {
      await interaction.reply("Pausing the tunes!");
    } else {
      await interaction.reply("Resuming the tunes!");
    }
  },
};
