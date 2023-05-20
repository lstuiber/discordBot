const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("trackloop")
    .setDescription("Loops current track"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
      queue.setRepeatMode(1);
      await interaction.reply("Looping current track!");
  },
};
