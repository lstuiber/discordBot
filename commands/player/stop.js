const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops music player"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.delete();
    await interaction.reply(
      "Playback stopped. You killed me. Goodbye cruel worl..."
    );
  },
};
