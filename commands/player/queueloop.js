const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("queueloop")
    .setDescription("Loops current queue"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.setRepeatMode(2);
    await interaction.reply("Looping the queue!");
  },
};
